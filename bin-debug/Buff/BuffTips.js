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
var BuffTips = (function (_super) {
    __extends(BuffTips, _super);
    function BuffTips(data, owner) {
        var _this = _super.call(this) || this;
        _this.bodyImg = null;
        _this.originX = 0;
        _this.originY = 0;
        _this.owner = null;
        _this.type = 0;
        if (data) {
            _this.data = data;
        }
        if (owner) {
            _this.owner = owner;
        }
        return _this;
    }
    BuffTips.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setTips();
        this.buffAnim();
    };
    BuffTips.prototype.initData = function () {
        if (this.data) {
            this.originX = this.data.x;
            this.originY = this.data.y;
            this.text = this.data.text;
            this.type = this.data.type;
        }
    };
    BuffTips.prototype.setTips = function () {
        this.tipsLabel = new eui.Label();
        this.tipsLabel.width = 200;
        this.tipsLabel.height = 36;
        this.tipsLabel.size = 36;
        this.tipsLabel.textColor = 0xffffff;
        this.tipsLabel.strokeColor = 0;
        this.tipsLabel.stroke = 2;
        this.tipsLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.tipsLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.tipsLabel.anchorOffsetX = this.tipsLabel.width >> 1;
        this.tipsLabel.anchorOffsetY = this.tipsLabel.height >> 1;
        this.tipsLabel.text = this.text;
        this.addChild(this.tipsLabel);
        this.x = this.originX;
        this.y = this.originY;
        if (this.type == 0) {
            this.alpha = 0;
            this.scaleX = this.scaleY = 0.1;
        }
        else if (this.type == 1) {
            this.scaleX = this.scaleY = 1.2;
        }
        else if (this.type == 2) {
            this.scaleX = this.scaleY = 1;
        }
    };
    BuffTips.prototype.buffAnim = function () {
        if (this.type == 0) {
            var posY = this.originY - 100;
            egret.Tween.get(this).to({ y: posY, scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 500).wait(500).to({ alpha: 0 }, 400).call(this.removeSelf);
        }
        else if (this.type == 1) {
            var posY = this.originY - 200;
            egret.Tween.get(this).wait(300).to({ y: posY, scaleX: 0.8, scaleY: 0.8, alpha: 0 }, 600, egret.Ease.quintIn).call(this.removeSelf);
        }
        else if (this.type == 2) {
            var posY = this.originY - 80;
            var posY1 = this.originY - 30;
            egret.Tween.get(this).to({ scaleX: 1.3, scaleY: 1.3, y: posY1 }, 400, egret.Ease.backOut).to({ scaleX: 0.8, scaleY: 0.8, y: posY }, 500).call(this.removeSelf);
        }
    };
    // public changeBuffAnim()
    // {
    //     var posY:number = this.originY - 160;
    //     egret.Tween.removeTweens(this);
    //     egret.Tween.get(this).wait(800).to({y:posY,scaleX:0.8,scaleY:0.8,alpha:0},800,egret.Ease.sineOut).call(this.removeSelf);
    // }
    BuffTips.prototype.removeSelf = function () {
        if (this.parent && this.parent.contains(this)) {
            // this.owner.removeBuffTips(this);
            this.parent.removeChild(this);
        }
    };
    return BuffTips;
}(BaseSprite));
__reflect(BuffTips.prototype, "BuffTips");
//# sourceMappingURL=BuffTips.js.map