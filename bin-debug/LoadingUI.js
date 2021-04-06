var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.backGround = new egret.ImageLoader();
        _this.land = new egret.ImageLoader();
        _this.grassLand = new egret.ImageLoader();
        _this.grassLandMask = new egret.ImageLoader();
        _this.grass = new egret.ImageLoader();
        /**是否预加载完成*/
        _this.load = false;
        /**图层深度*/
        _this.i = 0;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        //添加监听
        this.backGround.once(egret.Event.COMPLETE, this.imageHandler, this);
        this.land.once(egret.Event.COMPLETE, this.imageHandler, this);
        this.grassLand.once(egret.Event.COMPLETE, this.imageHandler, this);
        this.grassLandMask.once(egret.Event.COMPLETE, this.imageHandler, this);
        this.grass.once(egret.Event.COMPLETE, this.imageHandler, this);
        //开始加载
        this.backGround.load("resource/assets/Game/loadBg.jpg");
    };
    LoadingUI.prototype.imageHandler = function (e) {
        var bitmap = e.currentTarget;
        var bmd = bitmap.data;
        var texture = new egret.Texture();
        texture._setBitmapData(bmd);
        if (this.i == 0) {
            this.backGroundImg = new egret.Bitmap(texture);
            this.addChildAt(this.backGroundImg, this.i);
            this.backGroundImg.height = this.stage.stageHeight;
            this.backGroundImg.width = this.stage.stageWidth;
            this.land.load("resource/assets/Game/land.png");
        }
        else if (this.i == 1) {
            this.landImg = new egret.Bitmap(texture);
            this.addChildAt(this.landImg, this.i);
            this.landImg.x = (this.stage.stageWidth - this.landImg.width) / 2;
            this.landImg.y = (this.stage.stageHeight * 0.78);
            this.grassLand.load("resource/assets/Game/grassLand.png");
            // this.landImg.scaleX=this.landImg.scaleY=2;
        }
        else if (this.i == 2) {
            this.grassLandImg = new egret.Bitmap(texture);
            this.addChildAt(this.grassLandImg, this.i);
            this.grassLandImg.x = (this.stage.stageWidth - this.grassLandImg.width) / 2;
            this.grassLandImg.y = (this.stage.stageHeight * 0.78) - 40;
            this.grassLandMask.load("resource/assets/Game/grassLand.png");
            // this.grassLandImg.scaleX=this.grassLandImg.scaleY=2;
        }
        else if (this.i == 3) {
            this.grassLandMaskImg = new egret.Bitmap(texture);
            this.addChildAt(this.grassLandMaskImg, this.i);
            this.grassLandMaskImg.x = this.grassLandImg.x;
            this.grassLandMaskImg.y = this.grassLandImg.y;
            this.grassLandMaskImg.scaleX = 0;
            this.grassLandImg.mask = this.grassLandMaskImg;
            this.grass.load("resource/assets/Game/grass.png");
            // this.grassLandMaskImg.scaleX=this.grassLandMaskImg.scaleY=2;
        }
        else if (this.i == 4) {
            this.grassImg = new egret.Bitmap(texture);
            this.addChildAt(this.grassImg, this.i);
            this.grassImg.x = this.grassLandMaskImg.x + this.grassLandMaskImg.width * this.grassLandMaskImg.scaleX - this.grassImg.width / 2;
            this.grassImg.y = this.grassLandMaskImg.y;
            // this.grassImg.scaleX=this.grassImg.scaleY=2;
            this.load = true;
        }
        this.i++;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        var n = current / total;
        if (this.load) {
            this.grassLandMaskImg.scaleX = n;
            this.grassImg.x = this.grassLandMaskImg.x + this.grassLandMaskImg.width * n - this.grassImg.width / 2;
        }
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map