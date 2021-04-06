class ViewNumber extends BaseModule
{
    private data:any;
    private label:eui.Label;
    private speedVector:egret.Point = new egret.Point();
    private speedX:number = 0;
    private speedY:number = 0;
    private gravity:number = 0;
    private maxSpeedY:number = 0;

    /**伤害，治疗显示数字
     * data:value:伤害或治疗量
     * type：类型，0为伤害数字，1为治疗数字
     * x，y：位置
     */
    public constructor(data?:any)
    {
        super();
        if(data)
        {
            this.data = data;
        }
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.init();
    }

    public init()
    {
        if(this.data)
        {
            this.label = new eui.Label();
            this.label.text = this.data.value+"";
            this.label.width = 100;
            this.label.height = 50;
            this.label.size = 35;
            this.label.anchorOffsetX = this.label.width>>1;
            this.label.anchorOffsetY = this.label.height>>1;
            this.label.textAlign = egret.HorizontalAlign.CENTER;
            this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(this.label);
            this.x = this.data.x;
            this.y = this.data.y;
            var random:number = Math.random();
            if(random<0.5)
            {
                this.speedVector.x = -1;
            }
            else
            {
                this.speedVector.x = 1;
            }
            switch(this.data.type)
            {
                case 0:
                this.label.textColor = 0xeeeeee;
                this.speedY = -14;
                this.maxSpeedY = 20;
                this.gravity = 1;
                this.scaleX = this.scaleY = 0.5;
                this.speedX = 4;
                break;
                case 1:
                this.label.textColor = 0x99ff33;
                break;
            }
            this.scaleX = this.scaleY = 0.8;
            egret.Tween.get(this).to({scaleX:1.5,scaleY:1.5},200).to({scaleX:1,scaleY:1},300);
            this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
        }
    }

    public update()
    {

        this.x += this.speedVector.x * this.speedX;
        this.speedY += this.gravity;
        if(this.speedY >= this.maxSpeedY)
        {
            this.speedY = this.maxSpeedY;
        }
        this.y += this.speedY;

        if(this.y >= 720)
        {
            this.removeSelf();
        }
    }

    public removeSelf()
    {
        if(this&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
        }
    }
}