class ChoseBox extends BaseSprite
{
	public constructor(choseObj:BaseCharacter) //BaseCharacter
	{
		super();
		this.choseObj = choseObj;

		//选框创建
		if(choseObj)
		{
			this.x = this.choseObj.x;
			this.y = this.choseObj.y - this.choseObj.body.height * 0.5;
			this.img = new egret.Bitmap(RES.getRes("choseBox_png"));
			this.addChild(this.img);
			this.img.width = this.choseObj.body.width + 15;
			this.img.height = this.choseObj.body.height + 15;
			this.img.anchorOffsetX = this.img.width * 0.5;
			this.img.anchorOffsetY = this.img.height * 0.5;
		}

		//选择框呼吸
		egret.Tween.get(this,{loop:true}).to({scaleX:1.2,scaleY:1.2},300).to({scaleX:1.0,scaleY:1.0},200);
	}

	//选择对象
	private choseObj:BaseCharacter = null;
	private img:egret.Bitmap = null;

	/**移除 */
	public removefromViewPort(e:egret.Event):void
	{
        super.removefromViewPort(e);

		egret.Tween.removeTweens(this);
    }

}