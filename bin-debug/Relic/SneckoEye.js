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
/**异蛇之眼
 * 战斗开始添加混乱，每回合多抽2张卡。
 */
var SneckoEye = (function (_super) {
    __extends(SneckoEye, _super);
    function SneckoEye(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.frequency = false;
        _this.name = egret.getQualifiedClassName(SneckoEye);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(SneckoEye);
        return _this;
    }
    SneckoEye.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        egret.Tween.get(this).wait(2800).call(function () {
            Message.instance.send(MsgCMD.DRAW_CARD, 2);
        });
    };
    SneckoEye.prototype.addChaos = function () {
        var buffData = DataManager.Instance.getBuffDataByName("chaos");
        var _buffData = {
            name: buffData.name,
            detailName: buffData.detailName,
            type: buffData.type,
            detail: buffData.detail,
            img: buffData.img,
            value: null,
            gainType: buffData.gainType
        };
        var player = CharacterManager.Instance.player;
        if (player) {
            player.addBuff(_buffData);
        }
    };
    SneckoEye.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
    };
    SneckoEye.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                {
                    if (GameManager.Instance.roundCount == 0) {
                        this.addChaos();
                    }
                    this.relicEffect();
                }
                break;
        }
    };
    return SneckoEye;
}(BaseRelic));
__reflect(SneckoEye.prototype, "SneckoEye");
//# sourceMappingURL=SneckoEye.js.map