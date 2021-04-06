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
var DamageCardEffect = (function (_super) {
    __extends(DamageCardEffect, _super);
    function DamageCardEffect(data, card) {
        var _this = _super.call(this, data, card) || this;
        _this.damageArr = [];
        _this.name = egret.getQualifiedClassName(DamageCardEffect);
        return _this;
    }
    //接收消息
    DamageCardEffect.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    DamageCardEffect.prototype.initData = function () {
        if (this.data) {
            var damageType = this.data.damageType;
            if (damageType != "null") {
                var damageTypeArr = damageType.split(',');
            }
            var damageValue = this.data.damageValue;
            if (damageValue != "null") {
                var damageValueArr = damageValue.split(',');
            }
            for (var i in damageTypeArr) {
                if (damageTypeArr[i] != "null") {
                    var _damageData = new DamageData();
                    _damageData.damageType = DamageType[damageTypeArr[i]];
                    _damageData.damageValue = parseInt(damageValueArr[i]);
                    this.damageArr.push(_damageData);
                }
            }
            //this.setCardDetail();
        }
    };
    DamageCardEffect.prototype.changeDamageValue = function (data) {
        // for(var i=0;i<this.damageArr.length;i++)
        // {
        //     this.damageArr[i].damageValue += data.value;
        // }
    };
    DamageCardEffect.prototype.setCardDetail = function () {
        var sigleDamageCount = 0;
        var sigleDamage = 0;
        var aoeDamageCount = 0;
        var aoeDamage = 0;
        for (var i = 0; i < this.damageArr.length; i++) {
            if (this.damageArr[i].damageType == DamageType.single) {
                sigleDamageCount++;
                sigleDamage = this.damageArr[i].damageValue;
            }
            if (this.damageArr[i].damageType == DamageType.aoe) {
                aoeDamageCount++;
                aoeDamage = this.damageArr[i].damageValue;
            }
        }
        var player = CharacterManager.Instance.player;
        if (aoeDamageCount > 0) {
            if (player) {
                var damage = Math.floor((aoeDamage + player.powerUpValue) * player.attackTimes);
            }
            else {
                var damage = aoeDamage;
            }
            this.cardOwner.addCardDetail("造成" + aoeDamageCount + "次的" + damage + "点群体伤害。");
        }
        if (sigleDamageCount > 0) {
            if (player) {
                var damage = Math.floor((sigleDamage + player.powerUpValue) * player.attackTimes);
            }
            else {
                var damage = sigleDamage;
            }
            this.cardOwner.addCardDetail("造成" + sigleDamageCount + "次的" + damage + "点单体伤害。");
        }
    };
    DamageCardEffect.prototype.addEvent = function () {
        this.addMessage(MsgCMD.CARD_USE, this);
    };
    DamageCardEffect.prototype.useCardEffect = function (character) {
        var player = CharacterManager.Instance.player;
        if (this.cardOwner.cardEffecType == 0) {
            Message.instance.send(MsgCMD.PLAYER_ATTACK);
        }
        for (var i = 0; i < this.damageArr.length; i++) {
            switch (this.damageArr[i].damageType) {
                case DamageType.single:
                    if (character) {
                        var damage = new DamageData();
                        damage.damageType = this.damageArr[i].damageType;
                        damage.damageValue = Math.floor((this.damageArr[i].damageValue + CharacterManager.Instance.player.powerUpValue) * player.attackTimes);
                        damage.damageEffect = this.data.damageVfx;
                        character.damaged(damage);
                    }
                    break;
                case DamageType.aoe:
                    var damage = new DamageData();
                    damage.damageType = this.damageArr[i].damageType;
                    damage.damageValue = Math.floor((this.damageArr[i].damageValue + CharacterManager.Instance.player.powerUpValue) * player.attackTimes);
                    var _data = {
                        x: 800,
                        y: 360,
                        type: 0,
                        img: this.data.damageVfx
                    };
                    UtilManager.Instance.createVfx(_data);
                    for (var j = 0; j < CharacterManager.Instance.monsterArr.length; j++) {
                        CharacterManager.Instance.monsterArr[j].damaged(damage);
                    }
                    break;
            }
        }
        if (!CardManager.Instance.isDoubleEffect)
            this.removeSelf();
        return true;
    };
    return DamageCardEffect;
}(BaseCardEffect));
__reflect(DamageCardEffect.prototype, "DamageCardEffect");
//# sourceMappingURL=DamageCardEffect.js.map