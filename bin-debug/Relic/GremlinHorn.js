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
 * 大地精灵
 * 每杀死一个敌人回复一点能量,抽一张卡
 */
var GremlinHorn = (function (_super) {
    __extends(GremlinHorn, _super);
    function GremlinHorn(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.deadMonsterCount = 0;
        _this.name = egret.getQualifiedSuperclassName(GremlinHorn);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(GremlinHorn);
        return _this;
    }
    GremlinHorn.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        GameManager.Instance.curPlayerPP += 1;
        this.deadMonsterCount++;
        var data = { pp: 0 };
        Message.instance.send(MsgCMD.CARD_USE, data);
        egret.Tween.get(this).wait(800).call(function () { Message.instance.send(MsgCMD.DRAW_CARD, 1); });
        //egret.Tween.get(this).wait(1000).call(function(){this.deadMonsterCount = 0;})		
    };
    GremlinHorn.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.MONSTER_DIE, this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
        this.addMessage(MsgCMD.CARD_USE, this);
        this.addMessage(MsgCMD.PLAYER_ROUND_END, this);
    };
    GremlinHorn.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.MONSTER_DIE:
                this.relicEffect();
                break;
            case MsgCMD.PLAYER_ROUND_START:
                break;
            case MsgCMD.CARD_USE:
                break;
            case MsgCMD.PLAYER_ROUND_END:
                break;
        }
    };
    return GremlinHorn;
}(BaseRelic));
__reflect(GremlinHorn.prototype, "GremlinHorn");
//# sourceMappingURL=GremlinHorn.js.map