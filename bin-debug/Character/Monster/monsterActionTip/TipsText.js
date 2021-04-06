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
var TipsText = (function (_super) {
    __extends(TipsText, _super);
    function TipsText() {
        return _super.call(this) || this;
    }
    TipsText.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.init();
    };
    TipsText.prototype.init = function () {
        this.rect = new eui.Rect();
        this.addChild(this.rect);
        this.rect.fillColor = 0xffffff;
        this.rect.alpha = 0.4;
        this.rect.width = 72;
        this.rect.anchorOffsetX = this.rect.width >> 1;
        this.label = new eui.Label();
        this.addChild(this.label);
        this.label.width = 72;
        this.label.anchorOffsetX = this.label.width >> 1;
        // this.label.textAlign = egret.HorizontalAlign.CENTER;
        this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.label.textColor = 0;
        this.label.size = 18;
        this.visible = false;
    };
    TipsText.prototype.updateText = function (text) {
        this.label.text = text;
        this.label.anchorOffsetY = this.label.height >> 1;
        this.rect.height = this.label.height;
        this.rect.anchorOffsetY = this.rect.height >> 1;
    };
    TipsText.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return TipsText;
}(BaseModule));
__reflect(TipsText.prototype, "TipsText");
//# sourceMappingURL=TipsText.js.map