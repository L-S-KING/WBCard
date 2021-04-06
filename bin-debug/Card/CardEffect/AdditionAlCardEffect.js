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
var AdditionalCardEffect = (function (_super) {
    __extends(AdditionalCardEffect, _super);
    function AdditionalCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.setCardNum = 0;
        _this.name = egret.getQualifiedClassName(AdditionalCardEffect);
        return _this;
    }
    //接收消息
    AdditionalCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    AdditionalCardEffect.prototype.initData = function () {
        this.setCardNum = this.data.spValue;
    };
    AdditionalCardEffect.prototype.setCardDetail = function () {
        this.cardOwner.addCardDetail("增加" + this.setCardNum + "张小刀到你的手牌");
    };
    AdditionalCardEffect.prototype.addEvent = function () {
    };
    AdditionalCardEffect.prototype.useCardEffect = function (character) {
        Message.instance.send(MsgCMD.ADD_CARD);
        if (!CardManager.Instance.isDoubleEffect)
            this.removeSelf();
        return true;
    };
    return AdditionalCardEffect;
}(BaseCardEffect));
__reflect(AdditionalCardEffect.prototype, "AdditionalCardEffect");
//# sourceMappingURL=AdditionAlCardEffect.js.map