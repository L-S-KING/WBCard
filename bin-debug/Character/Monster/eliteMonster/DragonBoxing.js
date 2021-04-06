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
 * 龙拳（精英怪）
 * 状态：这回合你每打出一张牌，龙拳对玩家造成的伤害增加10%。
 * 普通攻击：对玩家造成13点攻击伤害。
 * 重击：对玩家造成伤害更高。
 * debuff：造成一回合虚弱。
 */
var DragonBoxing = (function (_super) {
    __extends(DragonBoxing, _super);
    function DragonBoxing(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this._isAdd = false; //是否伤害加成
        _this.name = "DragonBoxing";
        return _this;
    }
    DragonBoxing.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    DragonBoxing.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = 200;
        }
        this.data.imgSource = "dragonBoxing00_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 2;
    };
    //接收消息
    DragonBoxing.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.NEXT_MONSTER_ACTION:
                if (data.target == this) {
                    egret.Tween.get(this).to({}, 300).call(this.Action);
                }
                break;
            case MsgCMD.ENEMY_ROUND_START:
                if (!this._reserveDefense) {
                    this.healthC.curDefense -= this.healthC.curDefense;
                }
                this.monsterAliveRound++;
                break;
            case MsgCMD.ENEMY_ROUND_END:
                break;
        }
    };
    DragonBoxing.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.randomNextAction();
        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("dragonBoxing0", 10, this.bodyImg, 6, false, true);
        this.bodyAnim.playAnim();
    };
    /**随机下一步动作 */
    DragonBoxing.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound == 0) {
            this.actionStateArr.push(MonsterActionState.buffPlus);
        }
        else if (this.monsterAliveRound <= 5) {
            var randomNum = Math.random();
            if (this._isAdd) {
                randomNum = 0.1;
            }
            if (randomNum < 0.5) {
                this.attack = Math.floor(Math.random() * 6 + 10);
                this.attackCount = Math.floor(Math.random() * 2 + 2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            if (randomNum >= 0.5 && randomNum < 0.8) {
                this.actionStateArr.push(MonsterActionState.debuff);
            }
            if (randomNum >= 0.8) {
                this.actionStateArr.push(MonsterActionState.buffPlus);
            }
        }
        else if (this.monsterAliveRound > 5) {
            var randomNum = Math.random();
            if (this._isAdd) {
                randomNum = 0.1;
            }
            if (randomNum < 0.5) {
                this.attack = Math.floor(Math.random() * 6 + 12);
                this.attackCount = Math.floor(Math.random() * 2 + 2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            if (randomNum >= 0.5 && randomNum < 0.7) {
                this.actionStateArr.push(MonsterActionState.debuff);
            }
            if (randomNum >= 0.7) {
                this.actionStateArr.push(MonsterActionState.buffPlus);
            }
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    DragonBoxing.prototype.Action = function () {
        var self = this;
        if (this.actionIndex >= this.actionStateArr.length) {
            egret.Tween.get(this).wait(600).call(function () {
                self.changeState(CharacterState.EndRound);
            });
            return;
        }
        switch (this.actionStateArr[this.actionIndex]) {
            case MonsterActionState.attack:
                this.actionIndex++;
                this.attackPlayer();
                break;
            case MonsterActionState.buffPlus:
                this.actionIndex++;
                this.addPowerPlus();
                break;
            case MonsterActionState.debuff:
                this.actionIndex++;
                this.debuffPlayer();
                break;
        }
    };
    // public damaged(damageData:DamageData)
    // {
    // 	super.damaged(damageData);
    // }
    /**怪物攻击玩家 */
    DragonBoxing.prototype.attackPlayer = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            for (var i = 0; i < self.haveBuff.length; i++) {
                if (self.haveBuff[i].name == "damageAdd") {
                    self.isAdd = false;
                    if (self.certainHasBuff("week")) {
                        self.attackTimes = 0.75;
                    }
                    else {
                        self.attackTimes = 1;
                    }
                    self.addBuffTips(self.haveBuff[i].getData().detailName + "结束", 0);
                    self.removeBuff(self.haveBuff[i]);
                    break;
                }
            }
            self.Action();
        });
    };
    /**给玩家添加debuff */
    DragonBoxing.prototype.debuffPlayer = function () {
        var self = this;
        var buffName = "week";
        var _buffData = DataManager.Instance.getBuffDataByName(buffName);
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: 2,
            gainType: 1
        };
        if (this.actionStateArr.indexOf(MonsterActionState.attack) >= 0) {
            debuff();
        }
        else {
            var posX = -35;
            var originX = 0;
            egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
                debuff();
            }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
                self.Action();
            });
        }
        function debuff() {
            var player = CharacterManager.Instance.player;
            player.addBuff(_data);
        }
    };
    /**强化攻击 */
    DragonBoxing.prototype.addPowerPlus = function () {
        var self = this;
        var _buffData = DataManager.Instance.getBuffDataByName("damageAdd");
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: 1,
            gainType: _buffData.gainType
        };
        this._isAdd = true;
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuff(_data);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    Object.defineProperty(DragonBoxing.prototype, "isAdd", {
        get: function () {
            return this._isAdd;
        },
        set: function (value) {
            this._isAdd = value;
        },
        enumerable: true,
        configurable: true
    });
    return DragonBoxing;
}(BaseMonster));
__reflect(DragonBoxing.prototype, "DragonBoxing");
//# sourceMappingURL=DragonBoxing.js.map