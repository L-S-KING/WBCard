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
var CardUi = (function (_super) {
    __extends(CardUi, _super);
    function CardUi(data) {
        var _this = _super.call(this) || this;
        if (data) {
            _this.cardData = data;
        }
        _this.name = egret.getQualifiedClassName(CardUi);
        _this.skinName = "CardUiSkin";
        return _this;
    }
    CardUi.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    CardUi.prototype.initData = function () {
        this.x = (GameConst.stage.stageWidth - this.width) >> 1;
        this.y = (GameConst.stage.stageHeight - this.height) >> 1;
    };
    CardUi.prototype.setImgIcon = function () {
        this.label_pp.text = this.cardData.pp + "";
        this.label_icon.text = this.cardData.imgIcon;
    };
    CardUi.prototype.addEvent = function () {
        this.addListener(egret.MainContext.instance.stage, egret.TouchEvent.TOUCH_BEGIN, this.removeSelf, this);
    };
    CardUi.prototype.removeSelf = function () {
        UiManager.Instance.removeUiFromLayer(this);
    };
    return CardUi;
}(BaseUi));
__reflect(CardUi.prototype, "CardUi");
//# sourceMappingURL=CardUi.js.map