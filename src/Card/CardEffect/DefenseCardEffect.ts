class DefenseCardEffect extends BaseCardEffect
{
    private defenseValue:number = 0;

    public constructor(data?:any,card?:Card)
    {
        super(data,card);
        this.name = egret.getQualifiedClassName(DefenseCardEffect);
    }
    public initData()
    {
        if(this.data)
        {
            var defenseValue = parseInt(this.data.defenseValue);
            this.defenseValue = defenseValue;
        }
    }

    public setCardDetail()
    {
        var player = CharacterManager.Instance.player;
        if(player)
        {
            if(player.certainHasBuff("destroyArmor"))
            {
                var defenseValue  = Math.floor(this.defenseValue*0.75);
            }
            else
            {
                var defenseValue  = this.defenseValue;
            }
        }
        else
        {
            var defenseValue  = this.defenseValue;
        }
        this.cardOwner.addCardDetail("增加"+defenseValue+"点格挡。");
    }

    public addEvent()
    {

    }

    public useCardEffect(character?:BaseCharacter)
    {
        var player = CharacterManager.Instance.player;
        player.changeDefense(this.defenseValue);
        player.addBuffTips("格挡增加",1);
        if(!CardManager.Instance.isDoubleEffect)
        this.removeSelf();
        return true;
    }

    public update()
    {
    }
}