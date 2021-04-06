/**
 * 不可打出卡牌效果
 */
class NoCardEffect extends BaseCardEffect
{

    private setCardNum:number = 0;
	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
        this.name = egret.getQualifiedClassName(NoCardEffect);
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
        this.setCardNum = this.data.spValue;
    }

	public setCardDetail()
	{
		
		this.cardOwner.addCardDetail("本牌不可被打出。");
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