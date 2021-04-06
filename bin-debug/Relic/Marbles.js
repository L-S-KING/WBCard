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
/**弹珠袋
 * 每场战斗开始对怪物增加1层易伤
 */
var Marbles = (function (_super) {
    __extends(Marbles, _super);
    function Marbles(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(Marbles);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(Marbles);
        return _this;
    }
    Marbles.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var buffData = DataManager.Instance.getBuffDataByName("maimed");
        var _buffData = {
            name: buffData.name,
            detailName: buffData.detailName,
            type: buffData.type,
            detail: buffData.detail,
            img: buffData.img,
            value: 1,
            gainType: buffData.gainType
        };
        var monsterArr = CharacterManager.Instance.monsterArr;
        for (var i = 0; i < monsterArr.length; i++) {
            monsterArr[i].addBuff(_buffData);
        }
    };
    Marbles.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
    };
    Marbles.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                {
                    if (GameManager.Instance.roundCount == 0)
                        this.relicEffect();
                }
                break;
        }
    };
    return Marbles;
}(BaseRelic));
__reflect(Marbles.prototype, "Marbles");
//# sourceMappingURL=Marbles.js.map