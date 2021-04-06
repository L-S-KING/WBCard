/**重刃效果 */
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
var HeavyBladeCardEffect = (function (_super) {
    __extends(HeavyBladeCardEffect, _super);
    function HeavyBladeCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.power = 0;
        _this.changePower = false;
        //卡牌的伤害数值
        _this.damageData = null;
        //伤害倍数
        _this.damagedTimes = 0;
        _this.name = egret.getQualifiedClassName(HeavyBladeCardEffect);
        return _this;
    }
    HeavyBladeCardEffect.prototype.initData = function () {
        if (this.data) {
            this.damagedTimes = parseFloat(this.data.spValue);
        }
    };
    HeavyBladeCardEffect.prototype.setCardDetail = function () {
        this.cardOwner.addCardDetail("力量在重刃上发挥" + this.damagedTimes + "倍效果。");
    };
    HeavyBladeCardEffect.prototype.useCardEffect = function (character) {
        if (!this.changePower) {
            this.power = CharacterManager.Instance.player.powerUpValue;
            CharacterManager.Instance.player.powerUpValue = this.power * this.damagedTimes;
            this.changePower = true;
            this.cardOwner.setCardDetail();
        }
        else {
            this.cardOwner.setCardDetail();
        }
        //if(!CardManager.Instance.isDoubleEffect)
        this.removeSelf();
        egret.Tween.get(this).to({}, 100).call(function () { CharacterManager.Instance.player.powerUpValue = this.power; });
        return true;
    };
    return HeavyBladeCardEffect;
}(BaseCardEffect));
__reflect(HeavyBladeCardEffect.prototype, "HeavyBladeCardEffect");
//# sourceMappingURL=HeavyBladeCardEffect.js.map