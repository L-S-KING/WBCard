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
var ImgAnim = (function (_super) {
    __extends(ImgAnim, _super);
    /**图集动画类 */
    function ImgAnim() {
        var _this = _super.call(this) || this;
        /**要播放图集动画的图片 */
        _this.mainImg = null;
        /**图集动画张数 */
        _this.imgCount = 0;
        /**图集动画纹理列表 */
        _this.imgTextures = [];
        /**图集动画播放帧数 */
        _this.imgFrames = 0;
        /**回调函数 */
        _this._callFun = null;
        _this._scope = null;
        _this._arg = null;
        _this.imgAnchorX = []; //图集X锚点集合
        _this.imgAnchorY = []; //图集Y锚点集合
        _this.imgTitle = null; //图集主字符
        _this.isLoop = false; //是否循环
        _this.originX = 0;
        _this.originY = 0;
        _this.isPlay = false;
        _this.playTime = 0; //开始播放动画之后经过的时间
        _this.imgIndex = 0; //图片索引值
        _this.autoDestroy = false;
        return _this;
    }
    /**初始化图集
     * 图片主字符；图片张数；播放的主图片；播放的帧数；是否循环；回调函数
     */
    ImgAnim.prototype.initData = function (imgTitle, imgCount, mainImg, imgFrames, autoDestroy, loop, callFun, scope, arg) {
        if (autoDestroy === void 0) { autoDestroy = false; }
        if (loop === void 0) { loop = false; }
        this.imgTitle = imgTitle;
        this.imgCount = imgCount;
        this.mainImg = mainImg;
        this.imgFrames = imgFrames;
        this.autoDestroy = autoDestroy;
        this.isLoop = loop;
        if (callFun) {
            this._callFun = callFun;
        }
        if (scope) {
            this._scope = scope;
        }
        if (arg) {
            this._arg = arg;
        }
        var texture;
        for (var i = 0; i < imgCount; i++) {
            texture = RES.getRes(this.imgTitle + i + "_png");
            this.imgTextures.push(texture);
            this.imgAnchorX.push(texture.textureWidth >> 1);
            this.imgAnchorY.push(texture.textureHeight);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    ImgAnim.prototype.playAnim = function () {
        this.mainImg.texture = this.imgTextures[0];
        this.mainImg.anchorOffsetX = this.imgAnchorX[0];
        this.mainImg.anchorOffsetY = this.imgAnchorY[0];
        this.isPlay = true;
        this.imgIndex = 0;
        this.playTime = 0;
    };
    ImgAnim.prototype.update = function () {
        if (this.isPlay) {
            if (this.imgIndex <= this.imgCount - 1) {
                this.playTime++;
                if (this.playTime % this.imgFrames == 0) {
                    this.playTime = 0;
                    this.mainImg.texture = this.imgTextures[this.imgIndex];
                    this.mainImg.anchorOffsetX = this.imgAnchorX[this.imgIndex];
                    this.mainImg.anchorOffsetY = this.imgAnchorY[this.imgIndex];
                    this.imgIndex++;
                }
            }
            else {
                if (this._callFun) {
                    this._callFun.call(this._scope, this._arg);
                }
                if (this.isLoop) {
                    this.imgIndex = 0;
                    return;
                }
                this.isPlay = false;
                if (this.autoDestroy) {
                    this.removeFromViewPort();
                }
                return;
            }
        }
    };
    ImgAnim.prototype.removeFromViewPort = function () {
        if (this.mainImg && this.mainImg.parent && this.mainImg.parent.contains(this.mainImg))
            this.mainImg.parent.removeChild(this.mainImg);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    return ImgAnim;
}(egret.DisplayObject));
__reflect(ImgAnim.prototype, "ImgAnim");
//# sourceMappingURL=ImgAnim.js.map