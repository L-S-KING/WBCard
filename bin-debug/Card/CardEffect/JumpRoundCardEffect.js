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
var JumpRoundCardEffect = (function (_super) {
    __extends(JumpRoundCardEffect, _super);
    function JumpRoundCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.name = egret.getQualifiedClassName(JumpRoundCardEffect);
        return _this;
    }
    //接收消息
    JumpRoundCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    JumpRoundCardEffect.prototype.initData = function () {
        if (this.data) {
            this.spType = this.data.sp;
            this.spValue = parseInt(this.data.spValue);
        }
        //this.setCardDetail();
    };
    JumpRoundCardEffect.prototype.setCardDetail = function () {
        if (this.spType == Sp.jumpPlayerRound) {
            this.cardOwner.addCardDetail("跳过玩家下一回合的执行阶段");
        }
        else if (this.spType == Sp.jumpEnemyRound) {
            this.cardOwner.addCardDetail("跳过怪物下一回合");
        }
    };
    JumpRoundCardEffect.prototype.addEvent = function () {
        this.addMessage(MsgCMD.CARD_USE, this);
    };
    // public useCardEffect(character?:BaseCharacter)
    // {
    //      GameManager.Instance.skipPlayerTurn=true;
    // 	    GameManager.Instance.skipPlayerNumber+=1;
    //     this.removeSelf();
    // }
    JumpRoundCardEffect.prototype.useCardEffect = function (character) {
        if (this.spType == Sp.jumpPlayerRound) {
            GameManager.Instance.skipPlayerTurn = true;
            GameManager.Instance.skipPlayerNumber += 1;
        }
        else if (this.spType == Sp.jumpEnemyRound) {
            GameManager.Instance.skipMonsterTurn = true;
            GameManager.Instance.skipEnemyNumber += 1;
        }
        this.removeSelf();
        return true;
    };
    return JumpRoundCardEffect;
}(BaseCardEffect));
__reflect(JumpRoundCardEffect.prototype, "JumpRoundCardEffect");
//# sourceMappingURL=JumpRoundCardEffect.js.map