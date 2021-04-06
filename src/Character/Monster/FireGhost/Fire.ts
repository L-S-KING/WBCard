class Fire extends BaseModule
{
	private fire_img:egret.Bitmap = null;
	private fireAnim:ImgAnim = null;
	public constructor() 
	{
		super();
	}

	public addToViewPort(e: egret.Event)
	{
		super.addToViewPort(e);
		this.creatFire();
	}

	private creatFire()
	{
		this.fire_img = new egret.Bitmap(RES.getRes("fire_0_png"));
		this.addChild(this.fire_img);
		this.alpha = 0;
		egret.Tween.get(this).to({alpha:1},200);
		this.scaleX = this.scaleY = 0.7;
		this.fireAnim = new ImgAnim();
		this.fireAnim.initData("fire_",8,this.fire_img,6,false,true);
		this.fireAnim.playAnim();
		this.fire_img.anchorOffsetX = this.fire_img.width * 0.5;
		this.fire_img.anchorOffsetY = this.fire_img.height;
	}

	public removefromViewPort(e:egret.Event)
	{
		super.removefromViewPort(e);
		egret.Tween.removeTweens(this);
		this.fireAnim.removeFromViewPort();
	}
}