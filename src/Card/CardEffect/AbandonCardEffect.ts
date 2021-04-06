class AbandonCardEffect extends BaseCardEffect
{
	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
        this.name = egret.getQualifiedClassName(AbandonCardEffect);
	}

	private sp:Sp = null;
	private spValue:number = 0;
	private abandonCount:number = 0;

	public initData()
	{
        if(this.data)
        {
            this.sp = this.data.sp;
            this.spValue = parseInt(this.data.spValue);
        }
	}


	public setCardDetail()
	{
		if(this.sp!=null)
		{
            if(this.sp == Sp.drawCard)
            {
                this.cardOwner.addCardDetail("抽取"+this.spValue+"张卡。");
            }
            else if(this.sp == Sp.abandonCard)
            {
                this.cardOwner.addCardDetail("丢弃"+this.spValue+"张卡。");
            }
            else
            {
                //egret.error("抽不到弃不了")
            }
			
		}
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

    public addEvent()
    {
    }

    public useCardEffect(character?:BaseCharacter)
    {	
        if(this.sp == Sp.drawCard)
        {
            var self = this;
            if(CardManager.Instance.isDoubleEffect&&this.cardOwner.cardData.damageType!="null")
            {
                self.spValue = self.spValue*2;
            }
            else
            {
                self.spValue = self.spValue;
            }
            egret.Tween.get(this).to({},50).call(function(){
                
                Message.instance.send(MsgCMD.DRAW_CARD,self.spValue);
                
                self.removeSelf();
            })
            
        }
        else if(this.sp == Sp.abandonCard)
        {
            //创建丢弃界面
            CardManager.Instance.abandonCardCount = this.spValue;
            Message.instance.send(MsgCMD.ABANDON_CARD);
            this.removeSelf();
        }
        
        return true;
    }
}