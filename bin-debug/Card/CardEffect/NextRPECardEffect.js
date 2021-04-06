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
var NextRPECardEffect = (function (_super) {
    __extends(NextRPECardEffect, _super);
    function NextRPECardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.buffValue = 0;
        _this.name = egret.getQualifiedClassName(NextRPECardEffect);
        return _this;
    }
    NextRPECardEffect.prototype.initData = function () {
        if (this.data) {
            this.buffValue = this.data.value;
        }
    };
    NextRPECardEffect.prototype.addEvent = function () {
    };
    NextRPECardEffect.prototype.setCardDetail = function () {
        this.cardOwner.addCardDetail("下回合开始时增加" + this.buffValue + "点PP值。");
    };
    NextRPECardEffect.prototype.useCardEffect = function (character) {
        var player = CharacterManager.Instance.player;
        if (player)
            player.addBuff(this.data);
        this.removeSelf();
        return true;
    };
    NextRPECardEffect.prototype.update = function () {
    };
    return NextRPECardEffect;
}(BaseCardEffect));
__reflect(NextRPECardEffect.prototype, "NextRPECardEffect");
//# sourceMappingURL=NextRPECardEffect.js.map