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
 * 黑暗之血
 * 在战斗结束时,回复10点生命
 */
var BlackBlood = (function (_super) {
    __extends(BlackBlood, _super);
    function BlackBlood(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(BlackBlood);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(BlackBlood);
        return _this;
    }
    BlackBlood.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.GAME_ROUND_END, this);
    };
    BlackBlood.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        GameManager.Instance.curHealth += 10;
    };
    BlackBlood.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.GAME_ROUND_END:
                this.relicEffect();
                break;
        }
    };
    return BlackBlood;
}(BaseRelic));
__reflect(BlackBlood.prototype, "BlackBlood");
//# sourceMappingURL=BlackBlood.js.map