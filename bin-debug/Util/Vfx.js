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
var Vfx = (function (_super) {
    __extends(Vfx, _super);
    /**
     * 特效类，data的
     * x,y:位置
     * img:图片资源路径
     * type:类型
     */
    function Vfx(data) {
        var _this = _super.call(this) || this;
        _this.originX = 0;
        _this.originY = 0;
        _this._type = 0;
        if (data) {
            _this.data = data;
        }
        return _this;
    }
    Vfx.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setImg();
    };
    Vfx.prototype.initData = function () {
        if (this.data) {
            this.originX = this.data.x;
            this.originY = this.data.y;
            this.texture = this.data.img;
            this._type = this.data.type;
        }
    };
    Vfx.prototype.setImg = function () {
        this.bodyImg = new egret.Bitmap();
        this.bodyImg.texture = RES.getRes(this.texture);
        this.addChild(this.bodyImg);
        this.bodyImg.anchorOffsetX = this.bodyImg.width >> 1;
        this.bodyImg.anchorOffsetY = this.bodyImg.height >> 1;
        this.x = this.originX;
        this.y = this.originY;
        //this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 300, egret.Ease.sineOut).wait(200).to({ alpha: 0 }, 300, egret.Ease.sineIn).call(this.removeSelf);
    };
    Vfx.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return Vfx;
}(BaseSprite));
__reflect(Vfx.prototype, "Vfx");
//# sourceMappingURL=Vfx.js.map