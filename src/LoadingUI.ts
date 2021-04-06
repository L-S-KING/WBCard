class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    private backGround: egret.ImageLoader = new egret.ImageLoader();
    private land: egret.ImageLoader = new egret.ImageLoader();
    private grassLand: egret.ImageLoader = new egret.ImageLoader();
    private grassLandMask: egret.ImageLoader = new egret.ImageLoader();
    private grass: egret.ImageLoader = new egret.ImageLoader();

    /**背景*/
    private backGroundImg: egret.Bitmap;
    /**土地*/
    private landImg: egret.Bitmap;
    /**草皮*/
    private grassLandImg: egret.Bitmap;
    /**草皮遮罩*/
    private grassLandMaskImg: egret.Bitmap;
    /**草团*/
    private grassImg: egret.Bitmap;
    /**是否预加载完成*/
    private load: boolean = false;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }

    private createView(): void {
        //添加监听
        this.backGround.once(egret.Event.COMPLETE, this.imageHandler, this);
        this.land.once(egret.Event.COMPLETE, this.imageHandler, this);
        this.grassLand.once(egret.Event.COMPLETE, this.imageHandler, this);
        this.grassLandMask.once(egret.Event.COMPLETE, this.imageHandler, this);
        this.grass.once(egret.Event.COMPLETE, this.imageHandler, this);
        //开始加载
        this.backGround.load("resource/assets/Game/loadBg.jpg");
    }

    /**图层深度*/
    private i: number = 0;

    private imageHandler(e: egret.Event) {
        let bitmap: egret.ImageLoader = e.currentTarget;
        let bmd: egret.BitmapData = bitmap.data;
        let texture: egret.Texture = new egret.Texture();
        texture._setBitmapData(bmd);
        if (this.i == 0) {//添加底图
            this.backGroundImg = new egret.Bitmap(texture);
            this.addChildAt(this.backGroundImg, this.i);
            this.backGroundImg.height = this.stage.stageHeight;
            this.backGroundImg.width = this.stage.stageWidth;
            this.land.load("resource/assets/Game/land.png");
        } else if (this.i == 1) {//添加土地
            this.landImg = new egret.Bitmap(texture);
            this.addChildAt(this.landImg, this.i);
            this.landImg.x = (this.stage.stageWidth - this.landImg.width) / 2;
            this.landImg.y = (this.stage.stageHeight * 0.78);
            this.grassLand.load("resource/assets/Game/grassLand.png");
            // this.landImg.scaleX=this.landImg.scaleY=2;
        } else if (this.i == 2) {//添加草皮
            this.grassLandImg = new egret.Bitmap(texture);
            this.addChildAt(this.grassLandImg, this.i);
            this.grassLandImg.x = (this.stage.stageWidth - this.grassLandImg.width) / 2;
            this.grassLandImg.y = (this.stage.stageHeight * 0.78) - 40;
            this.grassLandMask.load("resource/assets/Game/grassLand.png");
            // this.grassLandImg.scaleX=this.grassLandImg.scaleY=2;
        } else if (this.i == 3) {//添加草皮遮罩
            this.grassLandMaskImg = new egret.Bitmap(texture);
            this.addChildAt(this.grassLandMaskImg, this.i);
            this.grassLandMaskImg.x = this.grassLandImg.x;
            this.grassLandMaskImg.y = this.grassLandImg.y;
            this.grassLandMaskImg.scaleX = 0;
            this.grassLandImg.mask = this.grassLandMaskImg;
            this.grass.load("resource/assets/Game/grass.png");
            // this.grassLandMaskImg.scaleX=this.grassLandMaskImg.scaleY=2;
        } else if (this.i == 4) {//添加草团
            this.grassImg = new egret.Bitmap(texture);
            this.addChildAt(this.grassImg, this.i);
            this.grassImg.x = this.grassLandMaskImg.x + this.grassLandMaskImg.width * this.grassLandMaskImg.scaleX - this.grassImg.width / 2;
            this.grassImg.y = this.grassLandMaskImg.y
            // this.grassImg.scaleX=this.grassImg.scaleY=2;

            this.load = true;
        }
        this.i++;
    }

    public onProgress(current: number, total: number): void {
        let n = current / total;
        if (this.load) {
            this.grassLandMaskImg.scaleX = n;
            this.grassImg.x = this.grassLandMaskImg.x + this.grassLandMaskImg.width * n - this.grassImg.width / 2;
        }
    }
}
