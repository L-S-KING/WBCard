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
 * 额外卡牌效果
 */
var ExpendsCardEffect = (function (_super) {
    __extends(ExpendsCardEffect, _super);
    function ExpendsCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.name = egret.getQualifiedClassName(ExpendsCardEffect);
        return _this;
    }
    //接收消息
    ExpendsCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    ExpendsCardEffect.prototype.setCardDetail = function () {
        this.cardOwner.addCardDetail("使用后消耗卡牌。");
    };
    ExpendsCardEffect.prototype.addEvent = function () {
    };
    ExpendsCardEffect.prototype.useCardEffect = function (character) {
        this.removeSelf();
        return true;
    };
    return ExpendsCardEffect;
}(BaseCardEffect));
__reflect(ExpendsCardEffect.prototype, "ExpendsCardEffect");
//# sourceMappingURL=ExpendsCardEffect.js.map