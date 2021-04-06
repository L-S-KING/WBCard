class ImgAnim extends egret.DisplayObject
{
    /**要播放图集动画的图片 */
    private mainImg:egret.Bitmap = null;
    /**图集动画张数 */
    private imgCount:number = 0;
    /**图集动画纹理列表 */
    private imgTextures:egret.Texture[] = [];
    /**图集动画播放帧数 */
    private imgFrames:number = 0;
    /**回调函数 */
    private _callFun:Function = null;
    private _scope:any = null;
    private _arg:any = null;
    private imgAnchorX:number[] = [];//图集X锚点集合
    private imgAnchorY:number[] = [];//图集Y锚点集合
    private imgTitle:string = null;//图集主字符
    private isLoop:boolean = false;//是否循环
    private originX:number = 0;
    private originY:number = 0;
    private isPlay:boolean =false;
    private playTime:number = 0;//开始播放动画之后经过的时间
    private imgIndex:number = 0;//图片索引值
    private autoDestroy:boolean = false;

    /**图集动画类 */
    public constructor()
    {
        super();
    }

    /**初始化图集
     * 图片主字符；图片张数；播放的主图片；播放的帧数；是否循环；回调函数
     */
    public initData(imgTitle:string,imgCount:number,mainImg:egret.Bitmap,imgFrames:number,autoDestroy = false,loop:boolean = false,callFun?:Function,scope?:any,arg?:any)
    {
        this.imgTitle = imgTitle;
        this.imgCount = imgCount;
        this.mainImg = mainImg;
        this.imgFrames = imgFrames;
        this.autoDestroy = autoDestroy;
        this.isLoop = loop;
        if(callFun)
        {
            this._callFun = callFun;
        }
        if(scope)
        {
            this._scope = scope;
        }
        if(arg)
        {
            this._arg = arg;
        }
        var texture:egret.Texture;
        for(var i=0;i<imgCount;i++)
        {
            texture = RES.getRes(this.imgTitle+i+"_png");
            this.imgTextures.push(texture);
            this.imgAnchorX.push(texture.textureWidth>>1);
            this.imgAnchorY.push(texture.textureHeight);
        }
        this.addEventListener(egret.Event.ENTER_FRAME,this.update,this);
    }

    public playAnim()
    {
        this.mainImg.texture = this.imgTextures[0];
        this.mainImg.anchorOffsetX = this.imgAnchorX[0];
        this.mainImg.anchorOffsetY = this.imgAnchorY[0];
        this.isPlay = true;
        this.imgIndex = 0;
        this.playTime = 0;
    }

    public update()
    {
        if(this.isPlay)
        {
            if(this.imgIndex<=this.imgCount-1)
            {
                this.playTime++;
                if(this.playTime % this.imgFrames == 0)
                {
                    this.playTime = 0;
                    
                    this.mainImg.texture = this.imgTextures[this.imgIndex];
                    
                    this.mainImg.anchorOffsetX = this.imgAnchorX[this.imgIndex];
                    this.mainImg.anchorOffsetY = this.imgAnchorY[this.imgIndex];
                    this.imgIndex++;
                }
            }
            else
            {
                if(this._callFun)
                {
                    this._callFun.call(this._scope,this._arg);
                }
                if(this.isLoop)
                {
                    this.imgIndex = 0;
                    return;
                }
                this.isPlay = false;
                if(this.autoDestroy)
                {
                    this.removeFromViewPort();
                }
                return;
            }
        }
    }

    public removeFromViewPort()
    {
        if(this.mainImg&&this.mainImg.parent&&this.mainImg.parent.contains(this.mainImg))
        this.mainImg.parent.removeChild(this.mainImg);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.update,this);
    }
}