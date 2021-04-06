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
 * 生姜
 * 你不会在被虚弱
 */
var Ginger = (function (_super) {
    __extends(Ginger, _super);
    function Ginger(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(Ginger);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(Ginger);
        _this.relicEffect();
        return _this;
    }
    Ginger.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
    };
    Ginger.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        Message.instance.send(MsgCMD.PLAYER_NOTWEAK);
    };
    Ginger.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                if (GameManager.Instance.roundCount == 0) {
                    var player = CharacterManager.Instance.player;
                    if (player) {
                        player.getimmunityBuffName().push("week");
                        var _buffData = DataManager.Instance.getBuffDataByName("week");
                    }
                }
                break;
        }
    };
    return Ginger;
}(BaseRelic));
__reflect(Ginger.prototype, "Ginger");
//# sourceMappingURL=Ginger.js.map