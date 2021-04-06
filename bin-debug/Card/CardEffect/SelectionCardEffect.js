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
 * 从三张随机卡牌中选择一张卡牌效果
 */
var SelectionCardEffect = (function (_super) {
    __extends(SelectionCardEffect, _super);
    function SelectionCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.name = egret.getQualifiedClassName(SelectionCardEffect);
        return _this;
    }
    //接收消息
    SelectionCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    SelectionCardEffect.prototype.initData = function () {
    };
    SelectionCardEffect.prototype.setCardDetail = function () {
        this.cardOwner.addCardDetail("从三张随机牌中选择一张牌加入你的手牌。并且其消耗能量为0。");
    };
    SelectionCardEffect.prototype.addEvent = function () {
    };
    SelectionCardEffect.prototype.useCardEffect = function (character) {
        Message.instance.send(MsgCMD.SELECT_CARD);
        this.removeSelf();
        return true;
    };
    return SelectionCardEffect;
}(BaseCardEffect));
__reflect(SelectionCardEffect.prototype, "SelectionCardEffect");
//# sourceMappingURL=SelectionCardEffect.js.map