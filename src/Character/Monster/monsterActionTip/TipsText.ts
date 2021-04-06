class TipsText extends BaseModule
{
    private label:eui.Label;
    private rect:eui.Rect;
    public constructor()
    {
        super();
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.init();
    }

    public init()
    {
        this.rect = new eui.Rect();
        this.addChild(this.rect);
        this.rect.fillColor = 0xffffff;
        this.rect.alpha = 0.4;
        this.rect.width = 72;
        this.rect.anchorOffsetX = this.rect.width>>1;
        this.label = new eui.Label();
        this.addChild(this.label);
        this.label.width = 72;
        this.label.anchorOffsetX = this.label.width>>1;
        // this.label.textAlign = egret.HorizontalAlign.CENTER;
        this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.label.textColor = 0;
        this.label.size = 18;
        this.visible = false;
    }

    public updateText(text:string)
    {
        this.label.text = text;
        this.label.anchorOffsetY = this.label.height>>1;
        this.rect.height = this.label.height;
        this.rect.anchorOffsetY = this.rect.height>>1;
    }

    public removeSelf()
    {
        if(this&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
        }
    }
}