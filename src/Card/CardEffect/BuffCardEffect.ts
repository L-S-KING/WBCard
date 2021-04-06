class BuffCardEffect extends BaseCardEffect
{
    private buffName:string = null;
    private buffValue:string = null;
    public constructor(data?:BuffData,card?:Card)
    {
        super(data,card);
        this.name = egret.getQualifiedClassName(BuffCardEffect);
    }

    public initData()
    {
        if(this.data)
        {
            this.buffName = this.data.detailName;
            this.buffValue = this.data.value;
        }
    }

    public addEvent()
    {

    }

    public setCardDetail()
    {
        if(parseInt(this.buffValue)>0)
        {
            this.cardOwner.addCardDetail("增加"+this.buffValue+"层"+this.buffName+"效果。");
        }
        else
        {
            this.cardOwner.addCardDetail("增加"+this.buffName+"效果。");
        }
        
    }

    public useCardEffect(character?:BaseCharacter)
    {
        character.addBuff(this.data);
        if(!CardManager.Instance.isDoubleEffect)
        this.removeSelf();
        return true;
    }

    public update()
    {

    }

    
}