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
/**
 * 双发卡牌效果
 */
var DoubleHairCardEffect = (function (_super) {
    __extends(DoubleHairCardEffect, _super);
    function DoubleHairCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.name = egret.getQualifiedClassName(DoubleHairCardEffect);
        return _this;
    }
    //接收消息
    DoubleHairCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    DoubleHairCardEffect.prototype.initData = function () {
    };
    DoubleHairCardEffect.prototype.setCardDetail = function () {
        this.cardOwner.addCardDetail("在这个回合，你打出的下一张攻击牌会被打出两次。");
    };
    DoubleHairCardEffect.prototype.addEvent = function () {
    };
    DoubleHairCardEffect.prototype.useCardEffect = function (character) {
        CardManager.Instance.isDoubleEffect = true;
        this.removeSelf();
        return true;
    };
    return DoubleHairCardEffect;
}(BaseCardEffect));
__reflect(DoubleHairCardEffect.prototype, "DoubleHairCardEffect");
//# sourceMappingURL=DoubleHairCardEffect.js.map