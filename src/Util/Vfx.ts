class Vfx extends BaseSprite
{
    private data:any;
    private bodyImg:egret.Bitmap;
    private texture:string;
    private originX:number = 0;
    private originY:number = 0;
    private _type:number = 0;

    /**
     * 特效类，data的
     * x,y:位置
     * img:图片资源路径
     * type:类型
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
        this.initData();
        this.setImg();
    }

    public initData()
    {
        if(this.data)
        {
            this.originX = this.data.x;
            this.originY = this.data.y;
            this.texture = this.data.img;
            this._type = this.data.type;
        }
    }

    public setImg()
    {
        this.bodyImg = new egret.Bitmap();
        this.bodyImg.texture = RES.getRes(this.texture);
        this.addChild(this.bodyImg);
        this.bodyImg.anchorOffsetX = this.bodyImg.width>>1;
        this.bodyImg.anchorOffsetY = this.bodyImg.height>>1;
        this.x = this.originX;
        this.y = this.originY;
        //this.alpha = 0;
        egret.Tween.get(this).to({alpha:1},300,egret.Ease.sineOut).wait(200).to({alpha:0},300,egret.Ease.sineIn).call(this.removeSelf);
    }

    public removeSelf()
    {
        if(this&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
        }
    }
}