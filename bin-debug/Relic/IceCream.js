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
 * 冰激凌
 * 上一回合剩余的PP保留到下一回合
 */
var IceCream = (function (_super) {
    __extends(IceCream, _super);
    function IceCream(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.pp = 0; //上一回合剩余的PP值
        _this.name = egret.getQualifiedClassName(IceCream);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(IceCream);
        return _this;
    }
    IceCream.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
        this.addMessage(MsgCMD.PLAYER_ROUND_END, this);
        this.addMessage(MsgCMD.GAME_ROUND_END, this);
    };
    IceCream.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        GameManager.Instance.curPlayerPP += this.pp;
        var data = { pp: 0 };
        Message.instance.send(MsgCMD.CARD_USE, data);
    };
    IceCream.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                egret.Tween.get(this).to({}, 800).call(this.relicEffect);
                break;
            case MsgCMD.PLAYER_ROUND_END:
                this.pp = GameManager.Instance.curPlayerPP;
                break;
            case MsgCMD.GAME_ROUND_END:
                this.pp = 0;
                break;
        }
    };
    return IceCream;
}(BaseRelic));
__reflect(IceCream.prototype, "IceCream");
//# sourceMappingURL=IceCream.js.map