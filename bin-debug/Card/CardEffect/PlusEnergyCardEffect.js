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
var PlusEnergyCardEffect = (function (_super) {
    __extends(PlusEnergyCardEffect, _super);
    function PlusEnergyCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.spValue = 0;
        _this.name = egret.getQualifiedClassName(PlusEnergyCardEffect);
        return _this;
    }
    PlusEnergyCardEffect.prototype.initData = function () {
        if (this.data) {
            this.spValue = parseInt(this.data.spValue);
        }
    };
    PlusEnergyCardEffect.prototype.addEvent = function () {
    };
    PlusEnergyCardEffect.prototype.setCardDetail = function () {
        this.cardOwner.addCardDetail("增加" + this.spValue + "点PP值。");
    };
    PlusEnergyCardEffect.prototype.useCardEffect = function (character) {
        GameManager.Instance.curPlayerPP += this.spValue;
        if (!CardManager.Instance.isDoubleEffect)
            this.removeSelf();
        return true;
    };
    PlusEnergyCardEffect.prototype.update = function () {
    };
    return PlusEnergyCardEffect;
}(BaseCardEffect));
__reflect(PlusEnergyCardEffect.prototype, "PlusEnergyCardEffect");
//# sourceMappingURL=PlusEnergyCardEffect.js.map