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
var BaseBuff = (function (_super) {
    __extends(BaseBuff, _super);
    function BaseBuff(data, buffTarget) {
        var _this = _super.call(this) || this;
        _this._type = 0; //0为一般属性buff，1为特殊功能buff
        _this.buffTarget = null;
        _this.buffType = 0; //0：回合减少型buff，1：回合不减少型buff
        _this._roundCount = 0; //回合数或回合不减少型buff的层数
        _this._gainType = 0;
        _this.weekValue = -0.2;
        _this.maimedValue = 0.5;
        if (data) {
            _this.data = data;
        }
        if (buffTarget) {
            _this.buffTarget = buffTarget;
        }
        _this.skinName = "BuffUiSkin";
        return _this;
    }
    BaseBuff.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setImgIcon();
        this.addEvent();
    };
    BaseBuff.prototype.getData = function () {
        return this.data;
    };
    BaseBuff.prototype.initData = function () {
        if (this.data) {
            this._type = 0;
            this.name = this.data.name;
            this._roundCount = this.data.value;
            this.buffType = this.data.type;
            this.detail = this.data.detail;
            this._gainType = this.data.gainType;
            this.normalEffect();
        }
    };
    BaseBuff.prototype.addEvent = function () {
        this.addMessage(MsgCMD.CARD_USE, this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
        this.addMessage(MsgCMD.PLAYER_ROUND_END, this);
        this.addMessage(MsgCMD.ENEMY_ROUND_START, this);
        this.addMessage(MsgCMD.ENEMY_ROUND_END, this);
    };
    BaseBuff.prototype.setImgIcon = function () {
        this.buff_img.source = this.data.img;
        if (this._roundCount > 0) {
            this.round_label.text = this._roundCount + "";
        }
        else {
            this.round_label.visible = false;
        }
    };
    Object.defineProperty(BaseBuff.prototype, "gainType", {
        get: function () {
            return this._gainType;
        },
        set: function (value) {
            this._gainType = value;
        },
        enumerable: true,
        configurable: true
    });
    //接收消息
    BaseBuff.prototype.recvMsg = function (cmd, data) {
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
        }
    };
    /**普通效果 */
    BaseBuff.prototype.normalEffect = function () {
        switch (this.name) {
            case "powerUp":
                this.buffTarget.powerUpValue += this._roundCount;
                if (this.buffTarget.type == 0) {
                    Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE, { setCardDetail: true });
                }
                else {
                    Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE);
                }
                break;
            case "week":
                var player = CharacterManager.Instance.player;
                if (this.buffTarget.type == 0) {
                    this.buffTarget.attackTimes += this.weekValue;
                    Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE, { setCardDetail: true });
                }
                else {
                    var monster = this.buffTarget;
                    monster.attackTimes += this.weekValue;
                    Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE);
                }
                break;
            case "maimed":
                this.buffTarget.damageTimes += this.maimedValue;
                break;
            case "reserveDefense":
                this.buffTarget.reserveDefense = true;
                break;
            case "destroyArmor":
                Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE, { setCardDetail: true });
                break;
        }
    };
    /**回合开始效果 */
    BaseBuff.prototype.roundStartEffect = function () {
        switch (this.name) {
            case "week":
                this.roundCount--;
                break;
            case "chaos":
                //this.roundCount--;
                break;
            case "poisoning":
                this.buffTarget.addBuffTips(this.data.detailName, 1);
                var damage = new DamageData();
                damage.damageValue = 3;
                this.buffTarget.damaged(damage);
                this.roundCount--;
                break;
            case "maimed":
                this.roundCount--;
                break;
            case "roundPowerUp":
                //this.buffTarget.addBuffTips(this.data.detailName,0);
                var buffData = DataManager.Instance.getBuffDataByName("powerUp");
                var _data = {
                    name: buffData.name,
                    detailName: buffData.detailName,
                    type: buffData.type,
                    detail: buffData.detail,
                    img: buffData.img,
                    value: 3,
                    gainType: buffData.gainType
                };
                this.buffTarget.addBuff(_data);
                if (this.buffTarget.type == 0) {
                    Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE, { setCardDetail: true });
                }
                else {
                    Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE);
                }
                break;
            case "division":
                break;
            case "boom":
                this.roundCount--;
                if (this.roundCount <= 0) {
                    var monsterArr = CharacterManager.Instance.monsterArr;
                    for (var i = 0; i < monsterArr.length; i++) {
                        var data = new DamageData();
                        data.damageValue = 100;
                        data.damageEffect = "38_png";
                        monsterArr[i].damaged(data);
                    }
                }
                break;
            case "thorns":
                this.roundCount--;
                break;
            case "Twining":
                this.roundCount--;
                break;
        }
    };
    /**回合结束效果 */
    BaseBuff.prototype.roundEndEffect = function () {
        switch (this.name) {
            case "multipleDefense":
                this.buffTarget.addBuffTips(this.data.detailName, 0);
                this.buffTarget.changeDefense(this.roundCount);
                this.roundCount--;
                break;
            case "regrowth":
                this.buffTarget.addBuffTips(this.data.detailName, 0);
                this.buffTarget.changeCurHealth(this.roundCount);
                this.roundCount--;
                break;
            case "destroyArmor":
                this.roundCount--;
                break;
            case "damageAdd":
                break;
        }
    };
    BaseBuff.prototype.updateUi = function () {
        if (this.name == "reserveDefense") {
            return;
        }
        this.buff_img.source = this.data.img;
        this.round_label.text = this._roundCount + "";
        if (this.roundCount <= 0) {
            if (this.name != "chaos") {
                this.buffTarget.removeBuff(this);
                this.buffTarget.addBuffTips(this.data.detailName + "结束", 0);
            }
        }
    };
    Object.defineProperty(BaseBuff.prototype, "roundCount", {
        get: function () {
            return this._roundCount;
        },
        set: function (value) {
            var temp = value - this._roundCount;
            this._roundCount = value;
            var player = CharacterManager.Instance.player;
            switch (this.name) {
                case "powerUp":
                    this.buffTarget.powerUpValue += temp;
                    if (this.buffTarget.type == 0) {
                        Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE, { setCardDetail: true });
                    }
                    else {
                        Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE);
                    }
                    break;
                case "week":
                    if (this.roundCount <= 0) {
                        var player = CharacterManager.Instance.player;
                        if (this.buffTarget.type == 0) {
                            this.buffTarget.attackTimes -= this.weekValue;
                            Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE, { setCardDetail: true });
                        }
                        else {
                            var monster = this.buffTarget;
                            monster.attackTimes -= this.weekValue;
                            Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE);
                        }
                    }
                    break;
                case "maimed":
                    if (this.roundCount <= 0) {
                        this.buffTarget.damageTimes -= this.maimedValue;
                    }
                    break;
                case "thorns":
                    if (this.roundCount <= 0) {
                        var target = this.buffTarget;
                        target.isAttackStance = true;
                    }
                    break;
            }
            this.updateUi();
        },
        enumerable: true,
        configurable: true
    });
    BaseBuff.prototype.removeSelf = function () {
        switch (this.name) {
            case "powerUp":
                this.buffTarget.powerUpValue = 0;
                if (this.buffTarget.type == 0) {
                    Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE, { setCardDetail: true });
                }
                else {
                    Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE);
                }
                break;
            case "week":
                var player = CharacterManager.Instance.player;
                if (this.buffTarget.type == 0) {
                    this.buffTarget.attackTimes -= this.weekValue;
                    Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE, { setCardDetail: true });
                }
                else {
                    var monster = this.buffTarget;
                    monster.attackTimes -= this.weekValue;
                    Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE);
                }
                break;
            case "maimed":
                this.buffTarget.damageTimes -= this.maimedValue;
                break;
            case "reserveDefense":
                this.buffTarget.reserveDefense = false;
                break;
        }
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    BaseBuff.prototype.getDetail = function () {
        if (this.detail)
            return this.detail;
    };
    BaseBuff.prototype.getDetailName = function () {
        if (this.data.detailName)
            return this.data.detailName;
    };
    return BaseBuff;
}(BaseModule));
__reflect(BaseBuff.prototype, "BaseBuff");
//# sourceMappingURL=BaseBuff.js.map