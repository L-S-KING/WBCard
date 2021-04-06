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
var BaseCardEffect = (function (_super) {
    __extends(BaseCardEffect, _super);
    function BaseCardEffect(data, card) {
        var _this = _super.call(this) || this;
        _this.data = null;
        _this.id = 0;
        _this.cardOwner = null;
        if (data) {
            _this.data = data;
        }
        if (card) {
            _this.cardOwner = card;
        }
        return _this;
    }
    BaseCardEffect.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.addEvent();
    };
    BaseCardEffect.prototype.changeDamageValue = function (data) {
    };
    BaseCardEffect.prototype.initData = function () {
    };
    BaseCardEffect.prototype.addEvent = function () {
    };
    BaseCardEffect.prototype.useCardEffect = function (character) {
        return true;
    };
    BaseCardEffect.prototype.update = function () {
    };
    BaseCardEffect.prototype.setCardDetail = function () {
    };
    BaseCardEffect.prototype.removeSelf = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return BaseCardEffect;
}(BaseSprite));
__reflect(BaseCardEffect.prototype, "BaseCardEffect");
//# sourceMappingURL=BaseCardEffect.js.map