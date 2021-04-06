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
/**红头骨
 * 生命值低于50%时，增加3点力量。
 */
var RedSkull = (function (_super) {
    __extends(RedSkull, _super);
    function RedSkull(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.a = false;
        _this.name = egret.getQualifiedClassName(RedSkull);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(RedSkull);
        return _this;
    }
    RedSkull.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var buffData = DataManager.Instance.getBuffDataByName("powerUp");
        var _buffData = {
            name: buffData.name,
            detailName: buffData.detailName,
            type: buffData.type,
            detail: buffData.detail,
            img: buffData.img,
            value: 3,
            gainType: buffData.gainType
        };
        var player = CharacterManager.Instance.player;
        if (player.healthCom.curHealth <= player.healthCom.maxHealth * 0.5 && this.a == false) {
            player.addBuff(_buffData);
            this.a = true;
        }
    };
    RedSkull.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_UNDERATTACK, this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
        this.addMessage(MsgCMD.GAME_ROUND_END, this);
    };
    RedSkull.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_UNDERATTACK:
                {
                    this.relicEffect();
                }
                break;
            case MsgCMD.PLAYER_ROUND_START:
                if (GameManager.Instance.roundCount == 0) {
                    this.relicEffect();
                }
                break;
            case MsgCMD.GAME_ROUND_END:
                this.a = false;
                break;
        }
    };
    return RedSkull;
}(BaseRelic));
__reflect(RedSkull.prototype, "RedSkull");
//# sourceMappingURL=RedSkull.js.map