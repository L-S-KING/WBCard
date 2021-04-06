class CardShowUi extends BaseUi
{
    private group_card:eui.Group;
    private btn_cancel:eui.Button;
    private isRemoveCardShow:boolean = false;
    private isRemoveOver:boolean = false;
    private label_title:eui.Label;
    private scroller_card:eui.Scroller;

    public constructor(isRemoveCardShow:boolean = false)
    {
        super();
        this.isRemoveCardShow = isRemoveCardShow;
        this.skinName = "CardShowUiSkin";
        this.name = egret.getQualifiedClassName(CardShowUi);
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
    }

    public initData()
    {
        var haveCard = CardManager.Instance.haveCardId;
        var cardArr:number[] = [];
        for(var i=0;i<haveCard.length;i++)
        {
            cardArr.push(haveCard[i]);
        }
        cardArr.sort(function(a,b){return a-b});
        for(var i=0;i<cardArr.length;i++)
        {
            var data = DataManager.Instance.getCardDataByIdKey(cardArr[i]+"");
            var card = new Card(data,true);
            this.group_card.addChild(card);
            card.touchEnabled = true;
            card.touchChildren = false;
            if(this.isRemoveCardShow)
            {
                this.addListener(card,egret.TouchEvent.TOUCH_TAP,this.removeCard,this);
                this.label_title.text = "选择一张牌删除"
            }
        }
        egret.Tween.get(this.scroller_card).to({y:150},600,egret.Ease.sineIn);
        egret.Tween.get(this.btn_cancel).to({x:-15},600,egret.Ease.quintIn);
    }

    public removeCard(e:egret.TouchEvent)
    {
        if(this.isRemoveOver)
        {
            return;
        }
        var card = e.target as Card;
        var index = CardManager.Instance.haveCardId.indexOf(card.cardData.id);
        CardManager.Instance.haveCardId.splice(index,1);
        egret.Tween.get(card).to({alpha:0},500,egret.Ease.sineIn).call(function(){
            if(card&&card.parent.contains(card))
            {
                card.parent.removeChild(card);
            }
        })
        this.isRemoveOver = true;
        Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE)
        Message.instance.send(MsgCMD.PLAYER_REMOVECARD_OVER);
    }

    public setImgIcon()
    {

    }

    public addEvent()
    {
        this.addListener(this.btn_cancel,egret.TouchEvent.TOUCH_TAP,this.removeSelf,this);
    }

    public removeSelf()
    {
        UiManager.Instance.removeUiFromLayer(this);
    }
}