class CardSelectUi extends BaseModule
{
    private selectCount:number = 0;
    private btn_cancel:eui.Button;
    private randomIdArr:number[] = [];

    public constructor(idArr?:number[])
    {
        super();
        if(idArr)
        {
            this.randomIdArr = idArr;
        }
        this.skinName = "CardSelectUiSkin";
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.setRandomCard();
        this.addEvent();
    }

    public addEvent()
    {
        this.addListener(this.btn_cancel,egret.TouchEvent.TOUCH_TAP,this.removeSelf,this);
    }

    public setRandomCard()
    {
        if(this.randomIdArr.length<=0)
        {
            for(var i=0;i<3;i++)
            {
                var data = CardManager.Instance.randomGetCardData();
                while(this.randomIdArr.indexOf(data.id)>=0||data.getType==0||data.getType==2)
                {
                    var data = CardManager.Instance.randomGetCardData();
                }
                this.randomIdArr.push(data.id);
                var card = new Card(data,true,true);
                card.y = 360;
                egret.Tween.get(card).to({x:640+(i-1)*240},400,egret.Ease.circOut);
                card.touchEnabled = true;
                card.touchChildren = false;
                this.addListener(card,egret.TouchEvent.TOUCH_TAP,this.select,this);
                this.addChild(card);
            }
        }
        else
        {
                for(var i=0;i<this.randomIdArr.length;i++)
                {
                    var data = DataManager.Instance.getCardDataByIdKey(this.randomIdArr[i]+"")
                    var card = new Card(data,true,true);
                    card.y = 360;
                    egret.Tween.get(card).to({x:640+(i-1)*240},400,egret.Ease.circOut);
                    card.touchEnabled = true;
                    card.touchChildren = false;
                    this.addListener(card,egret.TouchEvent.TOUCH_TAP,this.select,this);
                    this.addChild(card);
                }
        }
    }

    public select(e:egret.TouchEvent)
    {
        if(this.selectCount<=0)
        {
            this.selectCount++;
            var card = e.target as Card;
            CardManager.Instance.haveCardId.push(card.cardData.id);
            Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
            Message.instance.send(MsgCMD.REWARD_CARD_SELECT_OVER,this);
            if(this&&this.parent.contains(this))
            {
                this.parent.removeChild(this);
            }
        }
    }

    public removeSelf()
    {
        if(this&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
        }
    }
}