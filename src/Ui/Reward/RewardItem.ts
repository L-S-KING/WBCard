enum RewardItemType{
    coin,
    card,
    refilc
}
class RewardItem extends BaseModule
{
    private rewardItemType:RewardItemType = null;
    private item_image:eui.Image;
    private item_label:eui.Label;
    private randomIdArr:number[] = [];

    public constructor(rewardItemType:RewardItemType)
    {
        super();
        this.rewardItemType = rewardItemType;
        this.skinName = "RewardItemSkin"
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        switch(this.rewardItemType)
        {
            case RewardItemType.coin:
            this.setCoinReward();
            break;
            case RewardItemType.card:
            this.setCardReward();
            break;
            case RewardItemType.refilc:
            this.setRelicReward();
            break;
        }
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            case MsgCMD.RELIC_SELECT_OVER:
            if(data.detailName == this.item_label.text)
            {
                this.removeSelf();
            }
            break;
            case MsgCMD.REWARD_CARD_SELECT_OVER:
            if(this.item_label.text = "选择一张牌")
            {
                this.removeSelf();
            }
            break;
        }
    }

    public setCoinReward()
    {
        var coinCount:number = Math.floor(Math.random()*15+20);
        this.item_image.source = "gold_png";
        this.item_label.text = ""+coinCount;
        var self = this;
        this.addListener(this,egret.TouchEvent.TOUCH_TAP,function(){
            GameManager.Instance.curCoin+=coinCount;
            self.removeSelf();
        },this)
        
    }


    public setCardReward()
    {
        var self = this;
        this.item_label.text = "选择一张牌";
        this.addMessage(MsgCMD.REWARD_CARD_SELECT_OVER,this);
        this.addListener(this,egret.TouchEvent.TOUCH_TAP,function(){
            if(self.randomIdArr.length<=0)
            {
                for(var i=0;i<3;i++)
                {
                    var data = CardManager.Instance.randomGetCardData();
                    while(self.randomIdArr.indexOf(data.id)>=0||data.getType==0||data.getType==2)
                    {
                        var data = CardManager.Instance.randomGetCardData();
                    }
                    self.randomIdArr.push(data.id);
                }
            }
            else
            {}
            var cardSelectUi = new CardSelectUi(self.randomIdArr);
            GlobalManager.Instance.addToLayer(cardSelectUi,LayerType.ui,999);
        },this);
    }

    public setRelicReward()
    {
        var relicName = RelicManager.Instance.randomGetRelicCls();
        if(!relicName)
        {
            this.removeSelf();
            return;
        }
        var name = egret.getQualifiedClassName(relicName);
        var data = DataManager.Instance.getRelicDataByKey(name);
        this.item_image.source = data.img;
        this.item_label.text = data.detailName;
        this.item_image.x = -24;
        this.item_image.y = -24;
        this.addListener(this,egret.TouchEvent.TOUCH_TAP,select,this);
        this.addMessage(MsgCMD.RELIC_SELECT_OVER,this);
        function select()
        {
            var _data = {
			img:"l_"+data.img,
			detail:data.detail,
			detailName:data.detailName,
            clsName:relicName,
			relic:null
            }
            var selectUi = new RelicSelectUi(_data);
            GlobalManager.Instance.addToLayer(selectUi,LayerType.ui,999);
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