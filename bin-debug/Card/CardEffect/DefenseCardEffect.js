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
var DefenseCardEffect = (function (_super) {
    __extends(DefenseCardEffect, _super);
    function DefenseCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.defenseValue = 0;
        _this.name = egret.getQualifiedClassName(DefenseCardEffect);
        return _this;
    }
    DefenseCardEffect.prototype.initData = function () {
        if (this.data) {
            var defenseValue = parseInt(this.data.defenseValue);
            this.defenseValue = defenseValue;
        }
    };
    DefenseCardEffect.prototype.setCardDetail = function () {
        var player = CharacterManager.Instance.player;
        if (player) {
            if (player.certainHasBuff("destroyArmor")) {
                var defenseValue = Math.floor(this.defenseValue * 0.75);
            }
            else {
                var defenseValue = this.defenseValue;
            }
        }
        else {
            var defenseValue = this.defenseValue;
        }
        this.cardOwner.addCardDetail("增加" + defenseValue + "点格挡。");
    };
    DefenseCardEffect.prototype.addEvent = function () {
    };
    DefenseCardEffect.prototype.useCardEffect = function (character) {
        var player = CharacterManager.Instance.player;
        player.changeDefense(this.defenseValue);
        player.addBuffTips("格挡增加", 1);
        if (!CardManager.Instance.isDoubleEffect)
            this.removeSelf();
        return true;
    };
    DefenseCardEffect.prototype.update = function () {
    };
    return DefenseCardEffect;
}(BaseCardEffect));
__reflect(DefenseCardEffect.prototype, "DefenseCardEffect");
//# sourceMappingURL=DefenseCardEffect.js.map