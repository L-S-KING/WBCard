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
 * 缩放仪
 * 每当BOSS战开始时，回复25点生命
 */
var Pantograph = (function (_super) {
    __extends(Pantograph, _super);
    function Pantograph(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(Pantograph);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(Pantograph);
        return _this;
    }
    Pantograph.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
    };
    Pantograph.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var player = CharacterManager.Instance.player;
        player.healthCom.curHealth += 25;
    };
    Pantograph.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                if (GameManager.Instance.roundCount == 0) {
                    var mArr = CharacterManager.Instance.monsterArr;
                    for (var i = 0; i < mArr.length; i++) {
                        if (mArr[i].mLevel == 3) {
                            this.relicEffect();
                            return;
                        }
                    }
                }
                break;
        }
    };
    return Pantograph;
}(BaseRelic));
__reflect(Pantograph.prototype, "Pantograph");
//# sourceMappingURL=Pantograph.js.map