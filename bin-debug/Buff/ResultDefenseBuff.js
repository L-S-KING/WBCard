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
var ResultDefenseBuff = (function (_super) {
    __extends(ResultDefenseBuff, _super);
    function ResultDefenseBuff(data, buffTarget, spBuffCardType) {
        var _this = _super.call(this, data, buffTarget) || this;
        _this.spBuffCardType = 0;
        _this.spBuffCardType = spBuffCardType;
        return _this;
    }
    ResultDefenseBuff.prototype.setImgIcon = function () {
        this.buff_img.source = this.data.img;
        this.round_label.visible = false;
        if (this.spBuffCardType <= 4) {
            this.detail = "使用攻击卡时增加1点格挡值。";
        }
        else {
            this.detail = "使用效果卡时增加1点格挡值。";
        }
    };
    /**增加格挡 */
    ResultDefenseBuff.prototype.changeDefense = function () {
        var player = CharacterManager.Instance.player;
        player.changeDefense(1);
    };
    ResultDefenseBuff.prototype.recvMsg = function (cmd, data) {
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
                            this.buffTarget.addBuffTips("全身防护I", 0);
                            egret.Tween.get(this).wait(500).call(this.changeDefense);
                        }
                    }
                    else {
                        if (GameManager.Instance.curSelectCard.cardEffecType == 1) {
                            this.buffTarget.addBuffTips("全身防护II", 0);
                            egret.Tween.get(this).wait(500).call(this.changeDefense);
                        }
                    }
                }
                break;
        }
    };
    return ResultDefenseBuff;
}(BaseBuff));
__reflect(ResultDefenseBuff.prototype, "ResultDefenseBuff");
//# sourceMappingURL=ResultDefenseBuff.js.map