class ResultCardEffect extends BaseCardEffect
{
	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
        this.name = egret.getQualifiedClassName(ResultCardEffect);
	}

	// private sp:Sp = null;
	// private spValue:number = 0;
	// private abandonCount:number = 0;
    private buffValue:number = null;
    private buffDetail:string = null;
	public initData()
	{
        if(this.data)
        {
            //this.buffName = this.data.detailName;
            this.buffValue = parseInt(this.data.buffValue);
        }
	}

	public setCardDetail()
	{
        if(this.buffValue<=4)
        {
            if(this.buffValue==1)
            {
                this.cardOwner.addCardDetail("打出攻击卡额外造成1点的群体伤害。");
                this.buffDetail = "打出攻击卡额外造成1点的群体伤害。";
            }
            if(this.buffValue==2)
            {
                this.cardOwner.addCardDetail("打出攻击卡随机对1名敌人造成1点伤害。");
                this.buffDetail = "打出攻击卡随机对1名敌人造成1点伤害。"
            }
            if(this.buffValue==3)
            {
                this.cardOwner.addCardDetail("打出攻击卡获取1点格挡值。");
                this.buffDetail = "打出攻击卡获取1点格挡值。"
            }
            if(this.buffValue==4)
            {
                this.cardOwner.addCardDetail("打出攻击卡抽一张牌。");
                this.buffDetail = "打出攻击卡抽一张牌。"
            }
        }

        else if(this.buffValue>4)
        {
            if(this.buffValue==5)
            {
                this.cardOwner.addCardDetail("打出技能卡额外造成1点的群体伤害。");
                this.buffDetail = "打出技能卡额外造成1点的群体伤害。"
            }
            if(this.buffValue==6)
            {
                this.cardOwner.addCardDetail("打出技能卡随机对1名敌人造成1点伤害。");
                this.buffDetail = "打出技能卡随机对1名敌人造成1点伤害。"
            }
            if(this.buffValue==7)
            {
                this.cardOwner.addCardDetail("打出技能卡获取1点格挡值。");
                this.buffDetail = "打出技能卡获取1点格挡值。"
            }
            if(this.buffValue==8)
            {
                this.cardOwner.addCardDetail("打出技能卡抽一张牌。");
                this.buffDetail = "打出技能卡抽一张牌。"
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

    private buffName:string[] = ["damageResult","randomDamagerResult","resultDefense","drawCardResult"];
    public useCardEffect(character?:BaseCharacter)
    {	
        var buffId = this.buffValue%4;
        if(buffId==0)
        {
            buffId=4;
        }
        var buffData = DataManager.Instance.getBuffDataByName(this.buffName[buffId-1]);
        var _buffData = {
            name:buffData.name,
            detailName:buffData.type,
            type:buffData.type,
            detail:this.buffDetail,
            img:buffData.img,
            value:buffData.value
        }

        character.addBuff(buffData,this.buffValue);
        
        this.removeSelf();
        return true;
    }
}