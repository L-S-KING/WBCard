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
var ConfrontationCardEffect = (function (_super) {
    __extends(ConfrontationCardEffect, _super);
    function ConfrontationCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.allCard = false;
        _this.name = egret.getQualifiedClassName(ConfrontationCardEffect);
        return _this;
    }
    //接收消息
    ConfrontationCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    ConfrontationCardEffect.prototype.initData = function () {
        if (this.data) {
            this.spType = this.data.sp;
            this.spValue = parseInt(this.data.spValue);
        }
        //this.setCardDetail();
    };
    ConfrontationCardEffect.prototype.setCardDetail = function () {
        switch (this.spValue) {
            case 0:
                this.cardOwner.addCardDetail("当手牌全是攻击牌时才可以打出此牌");
                break;
            case 1:
                this.cardOwner.addCardDetail("当手牌全是技能牌时才可以打出此牌");
                break;
        }
    };
    ConfrontationCardEffect.prototype.addEvent = function () {
        this.addMessage(MsgCMD.CARD_USE, this);
    };
    ConfrontationCardEffect.prototype.useCardEffect = function (character) {
        /**造成伤害 */
        this.allCardType();
        this.removeSelf();
        return this.allCard;
    };
    ConfrontationCardEffect.prototype.allCardType = function () {
        switch (this.spValue) {
            case 0:
                for (var i = 0; i < CardManager.Instance.handCard.length; i++) {
                    if (CardManager.Instance.handCard[i].cardData.cardEffectType != 0) {
                        this.allCard = false;
                        return;
                    }
                }
                this.allCard = true;
                break;
            case 1:
                for (var i = 0; i < CardManager.Instance.handCard.length; i++) {
                    if (CardManager.Instance.handCard[i].cardData.cardEffectType != 1) {
                        this.allCard = false;
                        return;
                    }
                }
                this.allCard = true;
                break;
        }
    };
    return ConfrontationCardEffect;
}(BaseCardEffect));
__reflect(ConfrontationCardEffect.prototype, "ConfrontationCardEffect");
//# sourceMappingURL=ConfrontationCardEffect.js.map