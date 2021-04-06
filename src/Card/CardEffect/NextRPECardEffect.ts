class NextRPECardEffect extends BaseCardEffect
{
	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
		this.name =  egret.getQualifiedClassName(NextRPECardEffect);
	}

    private buffValue:number = 0;

	public initData()
    {
        if(this.data)
        {
            this.buffValue = this.data.value;
        }
    }

    public addEvent()
    {

    }

    public setCardDetail()
    {
		this.cardOwner.addCardDetail("下回合开始时增加"+this.buffValue+"点PP值。");
    }

    public useCardEffect(character:BaseCharacter)
    {
        var player = CharacterManager.Instance.player;
        if(player)
         player.addBuff(this.data);
        this.removeSelf();
        return true;
    }

    public update()
    {

    }
}