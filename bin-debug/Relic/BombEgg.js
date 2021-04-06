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
 * 炸蛋
 * 战斗开始时添加炸弹效果
 */
var BombEgg = (function (_super) {
    __extends(BombEgg, _super);
    function BombEgg(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(BombEgg);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(BombEgg);
        return _this;
    }
    BombEgg.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var player = CharacterManager.Instance.player;
        var data = DataManager.Instance.getBuffDataByName("boom");
        var temp = data.value;
        data.value = 7;
        player.addBuff(data);
        data.value = temp;
    };
    BombEgg.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
    };
    BombEgg.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                if (GameManager.Instance.roundCount == 0) {
                    this.relicEffect();
                }
                break;
        }
    };
    return BombEgg;
}(BaseRelic));
__reflect(BombEgg.prototype, "BombEgg");
//# sourceMappingURL=BombEgg.js.map