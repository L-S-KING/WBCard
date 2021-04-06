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
var Tips = (function (_super) {
    __extends(Tips, _super);
    function Tips(text) {
        var _this = _super.call(this) || this;
        _this.textData = text;
        return _this;
    }
    Tips.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.setLabel();
        this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
    };
    Tips.prototype.setLabel = function () {
        this.tipsLabel = new eui.Label();
        this.addChild(this.tipsLabel);
        this.tipsLabel.width = egret.MainContext.instance.stage.stageWidth;
        this.tipsLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.tipsLabel.text = this.textData;
        this.tipsLabel.textColor = 0xffffff;
    };
    Tips.prototype.update = function () {
        this.worldTime++;
        if (this.worldTime >= 45) {
            this.alpha -= 0.05;
            if (this.alpha <= 0) {
                this.removeself();
            }
        }
    };
    Tips.prototype.removeself = function () {
        TipsManager.Instance.removeTips(this);
    };
    return Tips;
}(BaseModule));
__reflect(Tips.prototype, "Tips");
//# sourceMappingURL=Tips.js.map