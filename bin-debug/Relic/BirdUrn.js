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
/**鸟面瓮
 * 每使用一张非攻击牌，回复2血 。
 * */
var BirdUrn = (function (_super) {
    __extends(BirdUrn, _super);
    function BirdUrn(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(BirdUrn);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(BirdUrn);
        return _this;
    }
    BirdUrn.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var player = CharacterManager.Instance.player;
        if (GameManager.Instance.curSelectCard != null) {
            if (GameManager.Instance.curSelectCard.cardEffecType != 0) {
                player.healthCom.curHealth += 1;
            }
        }
    };
    BirdUrn.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.CARD_USE, this);
    };
    BirdUrn.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.CARD_USE:
                {
                    this.relicEffect();
                }
                break;
        }
    };
    return BirdUrn;
}(BaseRelic));
__reflect(BirdUrn.prototype, "BirdUrn");
//# sourceMappingURL=BirdUrn.js.map