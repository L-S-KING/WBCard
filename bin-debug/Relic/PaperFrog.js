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
 * 纸娃
 * 易伤的伤害增加75%，而非为50%。
 */
var PaperFrog = (function (_super) {
    __extends(PaperFrog, _super);
    function PaperFrog(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(PaperFrog);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(PaperFrog);
        return _this;
    }
    PaperFrog.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.CARD_USE, this);
    };
    PaperFrog.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var monsterArr = CharacterManager.Instance.monsterArr;
        for (var i = 0; i < monsterArr.length; i++) {
            for (var j = 0; j < monsterArr[i].getHaveBuff().length; j++) {
                if (monsterArr[i].getHaveBuff()[j].name == "maimed") {
                    monsterArr[i].damageTimes = 1.75;
                }
            }
        }
    };
    PaperFrog.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.CARD_USE:
                this.relicEffect();
                break;
        }
    };
    return PaperFrog;
}(BaseRelic));
__reflect(PaperFrog.prototype, "PaperFrog");
//# sourceMappingURL=PaperFrog.js.map