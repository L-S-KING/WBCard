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
var BuffTipsImage = (function (_super) {
    __extends(BuffTipsImage, _super);
    function BuffTipsImage(data) {
        var _this = _super.call(this) || this;
        _this.image = null;
        _this.shacking = false;
        _this.shackTime = 0;
        _this.shackBi = 0;
        _this.shackDura = 0;
        _this.shackX = 0;
        _this.shackY = 0;
        _this.shackCount = 0;
        _this.sDistance = 0;
        if (data) {
            _this.data = data;
        }
        return _this;
    }
    BuffTipsImage.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setImgIcon();
        this.addEvent();
    };
    BuffTipsImage.prototype.initData = function () {
        this.x = this.data.x;
        this.y = this.data.y;
        this.alpha = 0;
    };
    BuffTipsImage.prototype.setImgIcon = function () {
        this.image = new egret.Bitmap();
        this.image.texture = RES.getRes(this.data.img);
        this.addChild(this.image);
        this.image.width = 120;
        this.image.height = 120;
        this.image.anchorOffsetX = this.image.width >> 1;
        this.image.anchorOffsetY = this.image.height >> 1;
    };
    BuffTipsImage.prototype.addEvent = function () {
        var self = this;
        egret.Tween.get(this).to({ alpha: 0.8 }, 200).wait(250).to({ alpha: 0 }, 200).call(this.removeSelf);
        this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
    };
    BuffTipsImage.prototype.update = function () {
        this.updateShake();
    };
    BuffTipsImage.prototype.updateShake = function () {
        if (this.shacking) {
            var layerAll = this.image;
            if (this.shackTime--) {
                this.shackBi = this.shackTime / this.shackDura;
                layerAll.x = this.shackX * this.shackBi;
                layerAll.y = this.shackY * this.shackBi;
            }
            else {
                if (this.shackCount--) {
                    this.shackTime = this.shackDura = 5;
                    this.shackX = (Math.random() > .5 ? 1 : -1) * (Math.random() * this.sDistance + 3);
                    this.shackY = (Math.random() > .5 ? 1 : -1) * (Math.random() * this.sDistance + 3);
                    layerAll.x = this.shackX;
                    layerAll.y = this.shackY;
                }
                else {
                    this.shacking = false;
                }
            }
        }
    };
    BuffTipsImage.prototype.cameraShake = function (dis, count) {
        if (count === void 0) { count = 1; }
        this.sDistance = dis;
        this.shacking = true;
        this.shackCount = count;
        this.shackTime = 0;
    };
    BuffTipsImage.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return BuffTipsImage;
}(BaseSprite));
__reflect(BuffTipsImage.prototype, "BuffTipsImage");
//# sourceMappingURL=BuffTipsImage.js.map