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
 * 咖啡滤杯
 * 每回合开始时获得1点能量，你无法再在休息处休息。
 */
var CoffeeDripper = (function (_super) {
    __extends(CoffeeDripper, _super);
    function CoffeeDripper(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(CoffeeDripper);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(CoffeeDripper);
        return _this;
    }
    CoffeeDripper.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
    };
    CoffeeDripper.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        GameManager.Instance.curPlayerPP += 1;
        var data = { pp: 0 };
        Message.instance.send(MsgCMD.CARD_USE, data);
    };
    CoffeeDripper.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                egret.Tween.get(this).wait(800).call(this.relicEffect);
                break;
        }
    };
    return CoffeeDripper;
}(BaseRelic));
__reflect(CoffeeDripper.prototype, "CoffeeDripper");
//# sourceMappingURL=CoffeeDripper.js.map