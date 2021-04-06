/**商店界面 */
class ShopScene extends BaseScene
{
    private bg_img:eui.Image;
    private randomIdArr:number[] = [];      //卡牌随机id组
    private cardArr:Card[] = [];            //卡牌组
    private relicArr:BaseRelic[] = [];      //遗物组
    private img_removeCard:eui.Image;       //删除卡牌图片按钮
    private btn_cancel:eui.Button;          //返回按钮
    private btn_ok:eui.Button;              //确认按钮
    private bg_rect:eui.Rect;               //背景方块
    private posArr:egret.Point[] = [];      //卡牌位置数组
    private selectCard:Card = null;        //选择卡牌
    private relicDataArr:any[] = [];
    private relicClsNameArr:any[] = [];
    private relicImgArr:eui.Image[] = [];
    private coinLabelArr:eui.Label[] = [];
    private label_removeCardCoin:eui.Label;
    private isRemoveOver:boolean = false;
    private main_group:eui.Group;
    private btn_jump:eui.Button;

    public constructor()
    {
        super();
        this.skinName = "ShopSceneSkin";
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.setShopCard();
        this.setShopRelic();
        this.setIndex();
        this.addEvent();
    }

    public removeCard()
    {
        if(this.isRemoveOver)
        {
            return;
        }
        if(GameManager.Instance.curCoin<parseInt(this.label_removeCardCoin.text))
        {
            TipsManager.Instance.createTips("金钱不足");
        }
        else
        {
            UiManager.Instance.addUiToUiLayer(CardShowUi,false,true,999);
        }
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            case MsgCMD.RELIC_SELECT_OVER:
            if(data)
            {
                for(var i=0;i<this.relicImgArr.length;i++)
                {
                    if("l_"+this.relicImgArr[i].source == data.img)
                    {
                        this.removeListener(this.relicImgArr[i],egret.TouchEvent.TOUCH_TAP,this.selectRelic,this);
                        this.coinLabelArr[i+6].visible = false;
                        this.relicImgArr[i].visible = false;
                        break;
                    }
                }
            }
            break;
            case MsgCMD.PLAYER_REMOVECARD_OVER:
            GameManager.Instance.curCoin-=100;
            this.isRemoveOver = true;
            break;
        }
    }

    public addEvent()
    {
        this.addMessage(MsgCMD.RELIC_SELECT_OVER,this);
        this.addMessage(MsgCMD.PLAYER_REMOVECARD_OVER,this);
        this.addListener(this.img_removeCard,egret.TouchEvent.TOUCH_TAP,this.removeCard,this);
        this.addListener(this.btn_ok,egret.TouchEvent.TOUCH_TAP,this.buyCard,this);
        this.addListener(this.btn_cancel,egret.TouchEvent.TOUCH_TAP,this.cancel,this);
        this.addListener(this.btn_jump,egret.TouchEvent.TOUCH_TAP,this.removeSelf,this);
        egret.Tween.get(this.main_group).to({y:0},800,egret.Ease.backOut);
    }

    public setIndex()
    {
        this.main_group.setChildIndex(this.bg_rect,999);
        this.main_group.setChildIndex(this.btn_ok,999);
        this.main_group.setChildIndex(this.btn_cancel,999);
    }

    public createCoinLabel(x:number,y:number,text:string)
    {
        var coinLabel = new eui.Label();
        this.main_group.addChild(coinLabel);
        this.coinLabelArr.push(coinLabel);
        coinLabel.textColor = 0xFFC372;
        coinLabel.width = 100;
        coinLabel.textAlign = egret.HorizontalAlign.CENTER;
        coinLabel.text = text;
        coinLabel.size = 20;
        coinLabel.x = x;
        coinLabel.y = y;
        coinLabel.anchorOffsetX = coinLabel.width>>1;
        coinLabel.anchorOffsetY = coinLabel.height>>1;
    }

    public setShopCard()
    {
        for(var i=0;i<6;i++)
        {
                var data = CardManager.Instance.randomGetCardData();
                while(this.randomIdArr.indexOf(data.id)>=0||data.getType==2||data.getType==0)
                {
                    var data = CardManager.Instance.randomGetCardData();
                }
                this.randomIdArr.push(data.id);
                var card = new Card(data,true);
                card.scaleX = card.scaleY = 0.7;
                card.x = 200+(i%3)*250;
                card.y = 180+Math.floor(i/3)*280;
                var pos = new egret.Point(card.x,card.y);
                this.posArr.push(pos);
                card.touchEnabled = true;
                card.touchChildren = false;
                this.addListener(card,egret.TouchEvent.TOUCH_TAP,this.scaleCardToScreenCenter,this);
                this.main_group.addChild(card);
                this.cardArr.push(card);
                var coin = Math.floor(Math.random()*100+60)
                this.createCoinLabel(card.x,card.y+140,coin+"")
        }
    }

    public scaleCardToScreenCenter(e:egret.TouchEvent)
    {
        if(!this.selectCard)
        {
            var card = e.target as Card;
            var posX:number = 640;
            var posY:number = 360;
            this.bg_rect.visible = true;
            this.btn_cancel.visible = true;
            this.btn_ok.visible = true;
            this.main_group.setChildIndex(card,999);
            this.selectCard = card;
            egret.Tween.get(card).to({x:posX,y:posY,scaleX:1.1,scaleY:1.1},300,egret.Ease.sineIn);
        }
    }

    public buyCard()
    {
        if(this.selectCard)
        {
            var index = this.cardArr.indexOf(this.selectCard);
            var coinIndex:number = 0;
            for(var i=0;i<this.coinLabelArr.length;i++)
            {
                if(this.coinLabelArr[i].x == this.posArr[index].x&&this.coinLabelArr[i].y == (this.posArr[index].y+140))
                {
                    coinIndex = i;
                    var coinValue = parseInt(this.coinLabelArr[i].text);
                    break;
                }
            }
            if(coinValue>GameManager.Instance.curCoin)
            {
                TipsManager.Instance.createTips("金币不足")
                return;
            }
            else
            {
                this.coinLabelArr[coinIndex].visible = false;
                GameManager.Instance.curCoin -= coinValue;
                this.bg_rect.visible = false;
                this.btn_cancel.visible = false;
                this.btn_ok.visible = false;
                CardManager.Instance.haveCardId.push(this.selectCard.cardData.id);
                Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
                this.cardArr.splice(index,1);
                this.posArr.splice(index,1);
                this.selectCard.parent.removeChild(this.selectCard);
                this.selectCard = null;
            }
        }
    }

    public cancel()
    {
        if(this.selectCard)
        {
            var self = this;
            this.bg_rect.visible = false;
            this.btn_cancel.visible = false;
            this.btn_ok.visible = false;
            var index = this.cardArr.indexOf(this.selectCard);
            egret.Tween.get(this.selectCard).to({x:this.posArr[index].x,y:this.posArr[index].y,scaleX:0.7,scaleY:0.7},300,egret.Ease.sineOut).call(function(){
                for(var i=0;i<self.cardArr.length;i++)
                {
                    self.main_group.setChildIndex(self.cardArr[i],5+i);
                }
                self.selectCard = null;
            });
            
        }
    }

    public setShopRelic()
    {
        var self = this;

        for(var i=0;i<3;i++)
        {
            var relicName = RelicManager.Instance.randomGetRelicCls();
            if(!relicName)
            {
                return;
            }
            while(this.relicClsNameArr.indexOf(relicName)>=0)
            {
                if(this.relicClsNameArr.length+RelicManager.Instance.playerHaveRelicIdArr.length>=RelicManager.Instance.relicNameArr.length)
                {
                    break;
                }
                var relicName = RelicManager.Instance.randomGetRelicCls();
            }
            this.relicClsNameArr.push(relicName);
            var name = egret.getQualifiedClassName(relicName);
            var data = DataManager.Instance.getRelicDataByKey(name);
            var img = new eui.Image();
            img.source = data.img;
            img.x = 840+i*120
            img.y = 100;
            img.scaleX = img.scaleY = 1;
            this.main_group.addChild(img);
            this.relicImgArr.push(img);
            this.addListener(img,egret.TouchEvent.TOUCH_TAP,this.selectRelic,this);
            this.addMessage(MsgCMD.RELIC_SELECT_OVER,this);
            var coin = Math.floor(Math.random()*200+150)
            this.createCoinLabel(img.x+60,img.y+120,coin+"")
            if(this.relicClsNameArr.length+RelicManager.Instance.playerHaveRelicIdArr.length>=RelicManager.Instance.relicNameArr.length)
            {
                break;
            }
        }
    }

    public selectRelic(e:egret.TouchEvent)
    {
        var img = e.target as eui.Image;
        var index = this.relicImgArr.indexOf(img);
        var coin = parseInt(this.coinLabelArr[index+6].text);
        var relicName = this.relicClsNameArr[index];
        var name = egret.getQualifiedClassName(relicName);
        var data = DataManager.Instance.getRelicDataByKey(name);
        var _data = {
        img:"l_"+data.img,
        detail:data.detail,
        detailName:data.detailName,
        clsName:relicName,
        relic:null,
        coin:coin
        }
        var selectUi = new RelicSelectUi(_data);
        GlobalManager.Instance.addToLayer(selectUi,LayerType.ui,999);
        return;
    }

    public removeSelf()
    {
        if(this&&this.contains(this))
        {
            this.parent.removeChild(this);
            GameManager.Instance.addClearNodeToArr();
			SceneManager.Instance.addMapScene(new MapScene())
        }
    }
}