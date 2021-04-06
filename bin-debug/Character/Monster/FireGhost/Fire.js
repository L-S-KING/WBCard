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
var Fire = (function (_super) {
    __extends(Fire, _super);
    function Fire() {
        var _this = _super.call(this) || this;
        _this.fire_img = null;
        _this.fireAnim = null;
        return _this;
    }
    Fire.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.creatFire();
    };
    Fire.prototype.creatFire = function () {
        this.fire_img = new egret.Bitmap(RES.getRes("fire_0_png"));
        this.addChild(this.fire_img);
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 200);
        this.scaleX = this.scaleY = 0.7;
        this.fireAnim = new ImgAnim();
        this.fireAnim.initData("fire_", 8, this.fire_img, 6, false, true);
        this.fireAnim.playAnim();
        this.fire_img.anchorOffsetX = this.fire_img.width * 0.5;
        this.fire_img.anchorOffsetY = this.fire_img.height;
    };
    Fire.prototype.removefromViewPort = function (e) {
        _super.prototype.removefromViewPort.call(this, e);
        egret.Tween.removeTweens(this);
        this.fireAnim.removeFromViewPort();
    };
    return Fire;
}(BaseModule));
__reflect(Fire.prototype, "Fire");
//# sourceMappingURL=Fire.js.map