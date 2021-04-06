/**
 * 双发卡牌效果
 */
class DoubleHairCardEffect extends BaseCardEffect
{
	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
        this.name = egret.getQualifiedClassName(DoubleHairCardEffect);
	}

	//接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            
        }
    }

	public initData()
    {
    }

	public setCardDetail()
	{
		
		this.cardOwner.addCardDetail("在这个回合，你打出的下一张攻击牌会被打出两次。")
	}

	public addEvent()
    {

    }

    public useCardEffect(character?:BaseCharacter)
    {
        CardManager.Instance.isDoubleEffect = true;
        this.removeSelf();
        return true;
    }
}