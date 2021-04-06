/**
 * 消耗卡牌效果
 */
class ExpendsCardEffect extends BaseCardEffect
{

	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
        this.name = egret.getQualifiedClassName(ExpendsCardEffect);
	}

	//接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            
        }
    }


	public setCardDetail()
	{
		
		this.cardOwner.addCardDetail("使用后消耗卡牌。");
	}

	public addEvent()
    {

    }

    public useCardEffect(character?:BaseCharacter)
    {
        this.removeSelf();
        return true;
    }
}