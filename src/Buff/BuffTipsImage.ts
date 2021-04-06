class BuffTipsImage extends BaseSprite
{
    private data:any;
    private image:egret.Bitmap = null;
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
        this.setImgIcon();
        this.addEvent();
    }

    public initData()
    {
        this.x = this.data.x;
        this.y = this.data.y;
        this.alpha = 0;
    }

    public setImgIcon()
    {
        this.image = new egret.Bitmap();
        this.image.texture = RES.getRes(this.data.img);
        this.addChild(this.image);
        this.image.width = 120;
        this.image.height = 120;
        this.image.anchorOffsetX = this.image.width>>1;
        this.image.anchorOffsetY = this.image.height>>1;
    }

    public addEvent()
    {
        var self = this;
        egret.Tween.get(this).to({alpha:0.8},200).wait(250).to({alpha:0},200).call(this.removeSelf);
        this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
    }

    public update()
    {
        this.updateShake();
    }

    private shacking:boolean = false;
    private shackTime:number = 0;
    private shackBi:number = 0;
    private shackDura:number = 0;
    private shackX:number = 0;
    private shackY:number = 0;
    private shackCount:number = 0;
    private sDistance:number = 0; 

    public updateShake()
	{
		if(this.shacking)
		{
			let layerAll = this.image;
			if(this.shackTime--)
			{
				this.shackBi = this.shackTime / this.shackDura;
				layerAll.x = this.shackX * this.shackBi;
				layerAll.y = this.shackY * this.shackBi;
			}
			else
			{
				if(this.shackCount--)
				{
					this.shackTime= this.shackDura = 5;
					this.shackX = (Math.random() > .5 ? 1 : -1) * (Math.random() * this.sDistance + 3);
					this.shackY = (Math.random() > .5 ? 1 : -1) * (Math.random() * this.sDistance + 3);
					layerAll.x = this.shackX;
					layerAll.y = this.shackY;
				}
				else
				{
					this.shacking = false;
				}  
			}
		}
	}

    public cameraShake(dis, count = 1)
    {
        this.sDistance = dis; 
		this.shacking = true;
		this.shackCount = count;
		this.shackTime = 0;
    }

    public removeSelf()
    {
        if(this&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
        }
    }
}