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
var NoCardEffect = (function (_super) {
    __extends(NoCardEffect, _super);
    function NoCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.setCardNum = 0;
        _this.name = egret.getQualifiedClassName(NoCardEffect);
        return _this;
    }
    //接收消息
    NoCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    NoCardEffect.prototype.initData = function () {
        this.setCardNum = this.data.spValue;
    };
    NoCardEffect.prototype.setCardDetail = function () {
        this.cardOwner.addCardDetail("本牌不可被打出。");
    };
    NoCardEffect.prototype.addEvent = function () {
    };
    NoCardEffect.prototype.useCardEffect = function (character) {
        this.removeSelf();
        return true;
    };
    return NoCardEffect;
}(BaseCardEffect));
__reflect(NoCardEffect.prototype, "NoCardEffect");
//# sourceMappingURL=ExtraCardEffect.js.map