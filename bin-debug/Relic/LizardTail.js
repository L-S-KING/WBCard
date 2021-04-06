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
/**蜥蜴尾巴
 * 第一次死亡时复活，恢复50%生命值。
 */
var LizardTail = (function (_super) {
    __extends(LizardTail, _super);
    function LizardTail(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.frequency = false;
        _this.name = egret.getQualifiedClassName(LizardTail);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(LizardTail);
        return _this;
    }
    LizardTail.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var player = CharacterManager.Instance.player;
        player.healthCom.curHealth = Math.floor(player.healthCom.maxHealth * 0.5);
        this.canUse = false;
    };
    LizardTail.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_DEAD, this);
    };
    LizardTail.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_DEAD:
                {
                    if (this.canUse)
                        this.relicEffect();
                }
                break;
        }
    };
    return LizardTail;
}(BaseRelic));
__reflect(LizardTail.prototype, "LizardTail");
//# sourceMappingURL=LizardTail.js.map