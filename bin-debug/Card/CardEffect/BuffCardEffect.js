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
var BuffCardEffect = (function (_super) {
    __extends(BuffCardEffect, _super);
    function BuffCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.buffName = null;
        _this.buffValue = null;
        _this.name = egret.getQualifiedClassName(BuffCardEffect);
        return _this;
    }
    BuffCardEffect.prototype.initData = function () {
        if (this.data) {
            this.buffName = this.data.detailName;
            this.buffValue = this.data.value;
        }
    };
    BuffCardEffect.prototype.addEvent = function () {
    };
    BuffCardEffect.prototype.setCardDetail = function () {
        if (parseInt(this.buffValue) > 0) {
            this.cardOwner.addCardDetail("增加" + this.buffValue + "层" + this.buffName + "效果。");
        }
        else {
            this.cardOwner.addCardDetail("增加" + this.buffName + "效果。");
        }
    };
    BuffCardEffect.prototype.useCardEffect = function (character) {
        character.addBuff(this.data);
        if (!CardManager.Instance.isDoubleEffect)
            this.removeSelf();
        return true;
    };
    BuffCardEffect.prototype.update = function () {
    };
    return BuffCardEffect;
}(BaseCardEffect));
__reflect(BuffCardEffect.prototype, "BuffCardEffect");
//# sourceMappingURL=BuffCardEffect.js.map