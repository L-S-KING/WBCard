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
var ViewNumber = (function (_super) {
    __extends(ViewNumber, _super);
    /**伤害，治疗显示数字
     * data:value:伤害或治疗量
     * type：类型，0为伤害数字，1为治疗数字
     * x，y：位置
     */
    function ViewNumber(data) {
        var _this = _super.call(this) || this;
        _this.speedVector = new egret.Point();
        _this.speedX = 0;
        _this.speedY = 0;
        _this.gravity = 0;
        _this.maxSpeedY = 0;
        if (data) {
            _this.data = data;
        }
        return _this;
    }
    ViewNumber.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.init();
    };
    ViewNumber.prototype.init = function () {
        if (this.data) {
            this.label = new eui.Label();
            this.label.text = this.data.value + "";
            this.label.width = 100;
            this.label.height = 50;
            this.label.size = 35;
            this.label.anchorOffsetX = this.label.width >> 1;
            this.label.anchorOffsetY = this.label.height >> 1;
            this.label.textAlign = egret.HorizontalAlign.CENTER;
            this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(this.label);
            this.x = this.data.x;
            this.y = this.data.y;
            var random = Math.random();
            if (random < 0.5) {
                this.speedVector.x = -1;
            }
            else {
                this.speedVector.x = 1;
            }
            switch (this.data.type) {
                case 0:
                    this.label.textColor = 0xeeeeee;
                    this.speedY = -14;
                    this.maxSpeedY = 20;
                    this.gravity = 1;
                    this.scaleX = this.scaleY = 0.5;
                    this.speedX = 4;
                    break;
                case 1:
                    this.label.textColor = 0x99ff33;
                    break;
            }
            this.scaleX = this.scaleY = 0.8;
            egret.Tween.get(this).to({ scaleX: 1.5, scaleY: 1.5 }, 200).to({ scaleX: 1, scaleY: 1 }, 300);
            this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
        }
    };
    ViewNumber.prototype.update = function () {
        this.x += this.speedVector.x * this.speedX;
        this.speedY += this.gravity;
        if (this.speedY >= this.maxSpeedY) {
            this.speedY = this.maxSpeedY;
        }
        this.y += this.speedY;
        if (this.y >= 720) {
            this.removeSelf();
        }
    };
    ViewNumber.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return ViewNumber;
}(BaseModule));
__reflect(ViewNumber.prototype, "ViewNumber");
//# sourceMappingURL=ViewNumber.js.map