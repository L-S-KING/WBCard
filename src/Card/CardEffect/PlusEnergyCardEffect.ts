class PlusEnergyCardEffect extends BaseCardEffect
{
	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
		this.name =  egret.getQualifiedClassName(PlusEnergyCardEffect);
	}

	private spValue:number = 0;

	public initData()
    {
        if(this.data)
        {
            this.spValue = parseInt(this.data.spValue);
        }
    }

    public addEvent()
    {

    }

    public setCardDetail()
    {
		this.cardOwner.addCardDetail("增加"+this.spValue+"点PP值。");
    }

    public useCardEffect(character:BaseCharacter)
    {
		GameManager.Instance.curPlayerPP += this.spValue;
        if(!CardManager.Instance.isDoubleEffect)
        this.removeSelf();
        return true;
    }

    public update()
    {

    }
}