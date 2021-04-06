class JumpRoundCardEffect extends BaseCardEffect
{
    // private spArr:SpData[] = [];
    private spType:Sp;
    private spValue:number;
    public constructor(data?:any,card?:Card)
    {
        super(data,card);
        this.name = egret.getQualifiedClassName(JumpRoundCardEffect)
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
        
        if(this.spType == Sp.jumpPlayerRound)
        {
     	    this.cardOwner.addCardDetail("跳过玩家下一回合的执行阶段");
        }
        else if(this.spType == Sp.jumpEnemyRound)
        {
            this.cardOwner.addCardDetail("跳过怪物下一回合");
        }
    }

    public addEvent()
    {
        this.addMessage(MsgCMD.CARD_USE,this);
    }

    // public useCardEffect(character?:BaseCharacter)
    // {
    //      GameManager.Instance.skipPlayerTurn=true;
	// 	    GameManager.Instance.skipPlayerNumber+=1;

    //     this.removeSelf();
    // }

    public useCardEffect(character?:BaseCharacter)
    {
        if(this.spType == Sp.jumpPlayerRound)
        {
     	    GameManager.Instance.skipPlayerTurn=true;
	        GameManager.Instance.skipPlayerNumber+=1;
        }
        else if(this.spType == Sp.jumpEnemyRound)
        {
            GameManager.Instance.skipMonsterTurn=true;
		    GameManager.Instance.skipEnemyNumber+=1;
        }
        this.removeSelf();
        return true;
    }

}