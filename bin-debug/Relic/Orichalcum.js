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
/**奥利哈钢
 * 战斗开始添加5层护甲。
 */
var Orichalcum = (function (_super) {
    __extends(Orichalcum, _super);
    function Orichalcum(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(Orichalcum);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(Orichalcum);
        return _this;
    }
    Orichalcum.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var buffData = DataManager.Instance.getBuffDataByName("multipleDefense");
        var _buffData = {
            name: buffData.name,
            detailName: buffData.detailName,
            type: buffData.type,
            detail: buffData.detail,
            img: buffData.img,
            value: 5,
            gainType: buffData.gainType
        };
        var player = CharacterManager.Instance.player;
        player.addBuff(_buffData);
    };
    Orichalcum.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
    };
    Orichalcum.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                if (GameManager.Instance.roundCount == 0)
                    egret.Tween.get(this).wait(2800).call(this.relicEffect);
                break;
        }
    };
    return Orichalcum;
}(BaseRelic));
__reflect(Orichalcum.prototype, "Orichalcum");
//# sourceMappingURL=Orichalcum.js.map