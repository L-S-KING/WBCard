class ConfrontationCardEffect extends BaseCardEffect
{
    // private spArr:SpData[] = [];
    private spType:Sp;
    private spValue:number;
	
	private allCard:boolean = false;
    public constructor(data?:any,card?:Card)
    {
        super(data,card);
        this.name = egret.getQualifiedClassName(ConfrontationCardEffect)
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            // case MsgCMD.CARD_USE:
            // this.useCardEffect();
            // break;
        }
    }

    public initData()
    {
        if(this.data)
        {
            this.spType = this.data.sp;
            this.spValue = parseInt(this.data.spValue);

        }
        //this.setCardDetail();
    }

    public setCardDetail()
    {
        switch(this.spValue)
        {
            case 0:
            this.cardOwner.addCardDetail("当手牌全是攻击牌时才可以打出此牌");
            break;
            case 1:
            this.cardOwner.addCardDetail("当手牌全是技能牌时才可以打出此牌");
            break;
        }
        
    }

    public addEvent()
    {
        this.addMessage(MsgCMD.CARD_USE,this);
    }

    public useCardEffect(character?:BaseCharacter)
    {
		/**造成伤害 */
		this.allCardType();

        this.removeSelf();
		return this.allCard;
    }

	private allCardType()
	{
        switch(this.spValue)
        {
            case 0:
            for(var i=0;i<CardManager.Instance.handCard.length;i++)
            {
                if(CardManager.Instance.handCard[i].cardData.cardEffectType!=0)
                {
                    this.allCard = false;
                    return;
                }
            }
            this.allCard = true;
            break;
            case 1:
            for(var i=0;i<CardManager.Instance.handCard.length;i++)
            {
                if(CardManager.Instance.handCard[i].cardData.cardEffectType!=1)
                {
                    this.allCard = false;
                    return;
                }
            }
            this.allCard = true;
            break;
        }
	}

}