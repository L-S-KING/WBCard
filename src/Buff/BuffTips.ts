class BuffTips extends BaseSprite
{
    private bodyImg:egret.Bitmap = null;
    private data:any;
    private originX:number = 0;
    private originY:number = 0;
    private text:string;
    private tipsLabel:eui.Label;
    private owner:BaseCharacter = null;
    private type:number = 0;
    public constructor(data?:any,owner?:BaseCharacter)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        if(owner)
        {
            this.owner = owner;
        }
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.setTips();
        this.buffAnim();
    }

    public initData()
    {
        if(this.data)
        {
            this.originX = this.data.x;
            this.originY = this.data.y;
            this.text = this.data.text;
            this.type = this.data.type;
        }
    }

    public setTips()
    {
        this.tipsLabel = new eui.Label();
        this.tipsLabel.width = 200;
        this.tipsLabel.height = 36;
        this.tipsLabel.size = 36;
        this.tipsLabel.textColor = 0xffffff;
        this.tipsLabel.strokeColor = 0;
        this.tipsLabel.stroke = 2;
        this.tipsLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.tipsLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.tipsLabel.anchorOffsetX = this.tipsLabel.width>>1;
        this.tipsLabel.anchorOffsetY = this.tipsLabel.height>>1;
        this.tipsLabel.text = this.text;
        this.addChild(this.tipsLabel);
        this.x = this.originX;
        this.y = this.originY;
        if(this.type == 0)
        {
            this.alpha = 0;
            this.scaleX = this.scaleY = 0.1
        }
        else if(this.type == 1)
        {
            this.scaleX = this.scaleY = 1.2;
        }
        else if(this.type == 2)
        {
            this.scaleX = this.scaleY = 1;
        }
        
    }

    public buffAnim()
    {
        if(this.type == 0)
        {
            var posY:number = this.originY-100;
            egret.Tween.get(this).to({y:posY,scaleX:0.8,scaleY:0.8,alpha:1},500).wait(500).to({alpha:0},400).call(this.removeSelf);
        }
        else if(this.type == 1)
        {
            var posY:number = this.originY-200;
            egret.Tween.get(this).wait(300).to({y:posY,scaleX:0.8,scaleY:0.8,alpha:0},600,egret.Ease.quintIn).call(this.removeSelf);
        }
        else if(this.type == 2)
        {
            var posY:number = this.originY - 80;
            var posY1:number = this.originY - 30;
            egret.Tween.get(this).to({scaleX:1.3,scaleY:1.3,y:posY1},400,egret.Ease.backOut).to({scaleX:0.8,scaleY:0.8,y:posY},500).call(this.removeSelf);
        }
        
    }

    // public changeBuffAnim()
    // {
    //     var posY:number = this.originY - 160;
    //     egret.Tween.removeTweens(this);
    //     egret.Tween.get(this).wait(800).to({y:posY,scaleX:0.8,scaleY:0.8,alpha:0},800,egret.Ease.sineOut).call(this.removeSelf);
    // }
    public removeSelf()
    {
        if(this.parent&&this.parent.contains(this))
        {
            // this.owner.removeBuffTips(this);
            this.parent.removeChild(this);
        }
    }
}