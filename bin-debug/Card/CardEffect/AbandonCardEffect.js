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
var AbandonCardEffect = (function (_super) {
    __extends(AbandonCardEffect, _super);
    function AbandonCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.sp = null;
        _this.spValue = 0;
        _this.abandonCount = 0;
        _this.name = egret.getQualifiedClassName(AbandonCardEffect);
        return _this;
    }
    AbandonCardEffect.prototype.initData = function () {
        if (this.data) {
            this.sp = this.data.sp;
            this.spValue = parseInt(this.data.spValue);
        }
    };
    AbandonCardEffect.prototype.setCardDetail = function () {
        if (this.sp != null) {
            if (this.sp == Sp.drawCard) {
                this.cardOwner.addCardDetail("抽取" + this.spValue + "张卡。");
            }
            else if (this.sp == Sp.abandonCard) {
                this.cardOwner.addCardDetail("丢弃" + this.spValue + "张卡。");
            }
            else {
                //egret.error("抽不到弃不了")
            }
        }
    };
    //接收消息
    AbandonCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    AbandonCardEffect.prototype.addEvent = function () {
    };
    AbandonCardEffect.prototype.useCardEffect = function (character) {
        if (this.sp == Sp.drawCard) {
            var self = this;
            if (CardManager.Instance.isDoubleEffect && this.cardOwner.cardData.damageType != "null") {
                self.spValue = self.spValue * 2;
            }
            else {
                self.spValue = self.spValue;
            }
            egret.Tween.get(this).to({}, 50).call(function () {
                Message.instance.send(MsgCMD.DRAW_CARD, self.spValue);
                self.removeSelf();
            });
        }
        else if (this.sp == Sp.abandonCard) {
            //创建丢弃界面
            CardManager.Instance.abandonCardCount = this.spValue;
            Message.instance.send(MsgCMD.ABANDON_CARD);
            this.removeSelf();
        }
        return true;
    };
    return AbandonCardEffect;
}(BaseCardEffect));
__reflect(AbandonCardEffect.prototype, "AbandonCardEffect");
//# sourceMappingURL=AbandonCardEffect.js.map