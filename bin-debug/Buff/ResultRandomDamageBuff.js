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
var ResultRandomDamageBuff = (function (_super) {
    __extends(ResultRandomDamageBuff, _super);
    function ResultRandomDamageBuff(data, buffTarget, spBuffCardType) {
        var _this = _super.call(this, data, buffTarget) || this;
        _this.spBuffCardType = 0;
        _this.spBuffCardType = spBuffCardType;
        return _this;
    }
    ResultRandomDamageBuff.prototype.setImgIcon = function () {
        this.buff_img.source = this.data.img;
        this.round_label.visible = false;
        if (this.spBuffCardType <= 4) {
            this.detail = "使用攻击卡时对随机敌人造成额外1点伤害。";
        }
        else {
            this.detail = "使用效果卡时对随机敌人造成额外1点伤害。";
        }
    };
    /**效果随机减血 */
    ResultRandomDamageBuff.prototype.randomMonster = function () {
        var index = Math.floor(Math.random() * CharacterManager.Instance.monsterArr.length);
        var monster = CharacterManager.Instance.monsterArr[index];
        var damaged = new DamageData();
        damaged.damageValue = 1;
        damaged.damageEffect = "38_png";
        monster.damaged(damaged);
    };
    ResultRandomDamageBuff.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                if (this.buffTarget.type == 0) {
                    this.roundStartEffect();
                }
                break;
            case MsgCMD.PLAYER_ROUND_END:
                if (this.buffTarget.type == 0) {
                    this.roundEndEffect();
                }
                break;
            case MsgCMD.ENEMY_ROUND_START:
                if (this.buffTarget.type == 1) {
                    this.roundStartEffect();
                }
                break;
            case MsgCMD.ENEMY_ROUND_END:
                if (this.buffTarget.type == 1) {
                    this.roundEndEffect();
                }
                break;
            //玩家使用攻击
            case MsgCMD.CARD_USE:
                if (GameManager.Instance.curSelectCard != null) {
                    if (this.spBuffCardType <= 4) {
                        if (GameManager.Instance.curSelectCard.cardEffecType == 0) {
                            egret.Tween.get(this).wait(500).call(this.randomMonster);
                        }
                    }
                    else {
                        if (GameManager.Instance.curSelectCard.cardEffecType == 1) {
                            egret.Tween.get(this).wait(500).call(this.randomMonster);
                        }
                    }
                }
                break;
        }
    };
    return ResultRandomDamageBuff;
}(BaseBuff));
__reflect(ResultRandomDamageBuff.prototype, "ResultRandomDamageBuff");
//# sourceMappingURL=ResultRandomDamageBuff.js.map