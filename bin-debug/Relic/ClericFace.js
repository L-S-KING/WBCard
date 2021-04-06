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
 * 牧师的脸
 * 每场战斗结束，你的最大生命值加1.
 */
var ClericFace = (function (_super) {
    __extends(ClericFace, _super);
    function ClericFace(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(ClericFace);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(ClericFace);
        return _this;
    }
    ClericFace.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.GAME_ROUND_END, this);
    };
    ClericFace.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        GameManager.Instance.maxHealth += 1;
    };
    ClericFace.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.GAME_ROUND_END:
                this.relicEffect();
                break;
        }
    };
    return ClericFace;
}(BaseRelic));
__reflect(ClericFace.prototype, "ClericFace");
//# sourceMappingURL=ClericFace.js.map