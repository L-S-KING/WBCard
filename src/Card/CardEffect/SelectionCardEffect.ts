/**
 * 从三张随机卡牌中选择一张卡牌效果
 */
class SelectionCardEffect extends BaseCardEffect
{

	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
        this.name = egret.getQualifiedClassName(SelectionCardEffect);
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
		
		this.cardOwner.addCardDetail("从三张随机牌中选择一张牌加入你的手牌。并且其消耗能量为0。")
	}

	public addEvent()
    {

    }

    public useCardEffect(character?:BaseCharacter)
    {
		Message.instance.send(MsgCMD.SELECT_CARD);
        this.removeSelf();
        return true;
    }
}