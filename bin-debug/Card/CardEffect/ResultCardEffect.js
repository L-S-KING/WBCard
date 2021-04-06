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
var ResultCardEffect = (function (_super) {
    __extends(ResultCardEffect, _super);
    function ResultCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        // private sp:Sp = null;
        // private spValue:number = 0;
        // private abandonCount:number = 0;
        _this.buffValue = null;
        _this.buffDetail = null;
        _this.buffName = ["damageResult", "randomDamagerResult", "resultDefense", "drawCardResult"];
        _this.name = egret.getQualifiedClassName(ResultCardEffect);
        return _this;
    }
    ResultCardEffect.prototype.initData = function () {
        if (this.data) {
            //this.buffName = this.data.detailName;
            this.buffValue = parseInt(this.data.buffValue);
        }
    };
    ResultCardEffect.prototype.setCardDetail = function () {
        if (this.buffValue <= 4) {
            if (this.buffValue == 1) {
                this.cardOwner.addCardDetail("打出攻击卡额外造成1点的群体伤害。");
                this.buffDetail = "打出攻击卡额外造成1点的群体伤害。";
            }
            if (this.buffValue == 2) {
                this.cardOwner.addCardDetail("打出攻击卡随机对1名敌人造成1点伤害。");
                this.buffDetail = "打出攻击卡随机对1名敌人造成1点伤害。";
            }
            if (this.buffValue == 3) {
                this.cardOwner.addCardDetail("打出攻击卡获取1点格挡值。");
                this.buffDetail = "打出攻击卡获取1点格挡值。";
            }
            if (this.buffValue == 4) {
                this.cardOwner.addCardDetail("打出攻击卡抽一张牌。");
                this.buffDetail = "打出攻击卡抽一张牌。";
            }
        }
        else if (this.buffValue > 4) {
            if (this.buffValue == 5) {
                this.cardOwner.addCardDetail("打出技能卡额外造成1点的群体伤害。");
                this.buffDetail = "打出技能卡额外造成1点的群体伤害。";
            }
            if (this.buffValue == 6) {
                this.cardOwner.addCardDetail("打出技能卡随机对1名敌人造成1点伤害。");
                this.buffDetail = "打出技能卡随机对1名敌人造成1点伤害。";
            }
            if (this.buffValue == 7) {
                this.cardOwner.addCardDetail("打出技能卡获取1点格挡值。");
                this.buffDetail = "打出技能卡获取1点格挡值。";
            }
            if (this.buffValue == 8) {
                this.cardOwner.addCardDetail("打出技能卡抽一张牌。");
                this.buffDetail = "打出技能卡抽一张牌。";
            }
        }
    };
    //接收消息
    ResultCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    ResultCardEffect.prototype.addEvent = function () {
    };
    ResultCardEffect.prototype.useCardEffect = function (character) {
        var buffId = this.buffValue % 4;
        if (buffId == 0) {
            buffId = 4;
        }
        var buffData = DataManager.Instance.getBuffDataByName(this.buffName[buffId - 1]);
        var _buffData = {
            name: buffData.name,
            detailName: buffData.type,
            type: buffData.type,
            detail: this.buffDetail,
            img: buffData.img,
            value: buffData.value
        };
        character.addBuff(buffData, this.buffValue);
        this.removeSelf();
        return true;
    };
    return ResultCardEffect;
}(BaseCardEffect));
__reflect(ResultCardEffect.prototype, "ResultCardEffect");
//# sourceMappingURL=ResultCardEffect.js.map