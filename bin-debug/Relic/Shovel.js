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
/**铲子
 * 每掉一次血抽一张牌。
 */
var Shovel = (function (_super) {
    __extends(Shovel, _super);
    function Shovel(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(Shovel);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(Shovel);
        return _this;
    }
    Shovel.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        // egret.Tween.get(this).to({alpha:0},100).call(function(){Message.instance.send(MsgCMD.DRAW_CARD,1);} )
        Message.instance.send(MsgCMD.DRAW_CARD, 1);
    };
    Shovel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_UNDERATTACK, this);
    };
    Shovel.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_UNDERATTACK:
                {
                    this.relicEffect();
                }
                break;
        }
    };
    return Shovel;
}(BaseRelic));
__reflect(Shovel.prototype, "Shovel");
//# sourceMappingURL=Shovel.js.map