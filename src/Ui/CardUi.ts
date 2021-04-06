class CardUi extends BaseUi
{
    private cardData:CardData;
    private label_pp:eui.Label;
    private label_detail:eui.Label;
    private label_icon:eui.Label;

    public constructor(data?:any)
    {
        super();
        if(data)
        {
            this.cardData = data;
        }
        this.name = egret.getQualifiedClassName(CardUi);
        this.skinName = "CardUiSkin";
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
    }

    public initData()
    {
        this.x = (GameConst.stage.stageWidth-this.width)>>1;
        this.y = (GameConst.stage.stageHeight-this.height)>>1;
    }

    public setImgIcon()
    {
        this.label_pp.text = this.cardData.pp+"";
        this.label_icon.text = this.cardData.imgIcon;
    }

    public addEvent()
    {
        this.addListener(egret.MainContext.instance.stage,egret.TouchEvent.TOUCH_BEGIN,this.removeSelf,this);
    }

    public removeSelf()
    {
        UiManager.Instance.removeUiFromLayer(this);
    }
}