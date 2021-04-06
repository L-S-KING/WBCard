class Tips extends BaseModule
{
    private textData:string;
    private tipsLabel:eui.Label;
    public constructor(text:string)
    {
        super();
        this.textData = text;
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.setLabel();
        this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
    }

    public setLabel()
    {
        this.tipsLabel = new eui.Label();
        this.addChild(this.tipsLabel);
        this.tipsLabel.width = egret.MainContext.instance.stage.stageWidth;
        this.tipsLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.tipsLabel.text = this.textData;
        this.tipsLabel.textColor = 0xffffff;

    }

    public update()
    {
        this.worldTime++;
        if(this.worldTime>=45)
        {
            this.alpha -= 0.05;
            if(this.alpha<=0)
            {
                this.removeself();
            }
        }
    }

    public removeself()
    {
        TipsManager.Instance.removeTips(this);
    }
}