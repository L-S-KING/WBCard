class BaseCardEffect extends BaseSprite
{
    protected data:any = null;
    protected id:number = 0;
    protected cardOwner:Card = null;
    
    public constructor(data?:any,card?:Card)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        if(card)
        {
            this.cardOwner = card;
        }
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.addEvent();
    }

    public changeDamageValue(data?:any)
    {

    }

    public initData()
    {

    }

    public addEvent()
    {

    }

    public useCardEffect(character?:BaseCharacter):boolean
    {
        return true;
    }

    public update()
    {

    }

    public setCardDetail()
    {

    }

    public removeSelf()
    {
        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }
}