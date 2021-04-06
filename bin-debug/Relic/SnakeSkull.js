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
 * 异蛇头骨
 * 每当你给予敌人中毒效果时，额外给予1层中毒效果。
 */
var SnakeSkull = (function (_super) {
    __extends(SnakeSkull, _super);
    function SnakeSkull(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(SnakeSkull);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(SnakeSkull);
        return _this;
    }
    SnakeSkull.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.CARD_USE, this);
    };
    SnakeSkull.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var monster = GameManager.Instance.curSelectMonster;
        var data = DataManager.Instance.getBuffDataByName("poisoning");
        var temp = data.value;
        data.value = 1;
        monster.addBuff(data);
        data.value = temp;
    };
    SnakeSkull.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.CARD_USE:
                var _data = data;
                if (_data && _data.buff) {
                    var buffArr = _data.buff.split(',');
                    if (buffArr.indexOf("poisoning") >= 0)
                        this.relicEffect();
                }
                break;
        }
    };
    return SnakeSkull;
}(BaseRelic));
__reflect(SnakeSkull.prototype, "SnakeSkull");
//# sourceMappingURL=SnakeSkull.js.map