/**
 * 增加卡牌效果（刘双）
 */
class AdditionalCardEffect extends BaseCardEffect
{

    private setCardNum:number = 0;
	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
        this.name = egret.getQualifiedClassName(AdditionalCardEffect);
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
		
		this.cardOwner.addCardDetail("增加" + this.setCardNum + "张小刀到你的手牌")
	}

	public addEvent()
    {

    }

    public useCardEffect(character?:BaseCharacter)
    {
		Message.instance.send(MsgCMD.ADD_CARD);
        if(!CardManager.Instance.isDoubleEffect)
        this.removeSelf();
        return true;
    }
}