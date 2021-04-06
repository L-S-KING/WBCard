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
var MonsterActionState;
(function (MonsterActionState) {
    MonsterActionState[MonsterActionState["buffPlus"] = 0] = "buffPlus";
    MonsterActionState[MonsterActionState["defense"] = 1] = "defense";
    MonsterActionState[MonsterActionState["attack"] = 2] = "attack";
    MonsterActionState[MonsterActionState["debuff"] = 3] = "debuff";
    MonsterActionState[MonsterActionState["Dizziness"] = 4] = "Dizziness";
    MonsterActionState[MonsterActionState["Sleep"] = 5] = "Sleep";
    MonsterActionState[MonsterActionState["division"] = 6] = "division";
    MonsterActionState[MonsterActionState["Summoning"] = 7] = "Summoning";
    MonsterActionState[MonsterActionState["BackWound"] = 8] = "BackWound";
    MonsterActionState[MonsterActionState["Pilfering"] = 9] = "Pilfering";
    MonsterActionState[MonsterActionState["NoCard"] = 10] = "NoCard";
    MonsterActionState[MonsterActionState["Escape"] = 11] = "Escape";
    MonsterActionState[MonsterActionState["StoringForce"] = 12] = "StoringForce";
    MonsterActionState[MonsterActionState["Cure"] = 13] = "Cure";
})(MonsterActionState || (MonsterActionState = {}));
var BaseMonster = (function (_super) {
    __extends(BaseMonster, _super);
    function BaseMonster(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this) || this;
        _this.attackCount = 3; //攻击次数
        _this.canAction = false; //会否可以行动
        _this.debuffArr = ["week", "maimed", "poisoning"];
        _this.actionStateArr = []; //行动数组
        _this.actionIndex = 0; //行动索引
        _this.monsterLevel = 0; //怪物等级，1普通怪，2精英怪，3boss怪
        _this.actionTips = null;
        _this.damageVfx = null; //伤害特效
        _this.monsterAliveRound = 0; //怪物存活回合数
        _this.isMonsterSet = false; //是否是怪物生成
        if (data) {
            _this.data = data;
        }
        _this.isMonsterSet = isMonsterSet;
        return _this;
    }
    BaseMonster.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.init();
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 500);
    };
    BaseMonster.prototype.initData = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
        this._type = 1;
        this.originX = this.data.originX;
        this.originY = this.data.originY;
        this.touchEnabled = true;
        this.x = this.originX;
        this.y = this.originY;
        this._state = CharacterState.WaitRound;
    };
    BaseMonster.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.randomNextAction();
    };
    //接收消息
    BaseMonster.prototype.recvMsg = function (cmd, data) {
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
    BaseMonster.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.NEXT_MONSTER_ACTION, this);
        this.addMessage(MsgCMD.ENEMY_ROUND_START, this);
        this.addMessage(MsgCMD.ENEMY_ROUND_END, this);
        //this.addListener(this,egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
        this.addListener(this, egret.TouchEvent.TOUCH_BEGIN, this.changeActionTipTextVisible, this);
    };
    BaseMonster.prototype.changeActionTipTextVisible = function () {
        this.actionTips.textVisible(true);
    };
    Object.defineProperty(BaseMonster.prototype, "actionArr", {
        get: function () {
            return this.actionStateArr;
        },
        enumerable: true,
        configurable: true
    });
    /**随机下一步动作 */
    BaseMonster.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        if (this.monsterLevel < 1) {
            var index = Math.floor(Math.random() * 4);
            this.actionStateArr.push(index);
        }
        else {
        }
        this.actionTips.updateTips();
    };
    /**更新显示动作 */
    BaseMonster.prototype.updateActionView = function () {
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    BaseMonster.prototype.Action = function () {
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
            case MonsterActionState.debuff:
                this.actionIndex++;
                this.debuffPlayer();
                break;
            case MonsterActionState.buffPlus:
                this.actionIndex++;
                this.addPowerPlus();
                break;
            case MonsterActionState.defense:
                this.actionIndex++;
                this.defense();
                break;
            case MonsterActionState.Dizziness:
                this.actionIndex++;
                this.actionDizziness();
                break;
            case MonsterActionState.Sleep:
                this.actionSleep();
                break;
        }
    };
    /**添加眩晕效果 */
    BaseMonster.prototype.addDizziness = function () {
        this.actionStateArr = [MonsterActionState.Dizziness];
        this.updateActionView();
    };
    /**眩晕动作 */
    BaseMonster.prototype.actionDizziness = function () {
        this.addBuffTips("眩晕！", 0);
        egret.Tween.get(this).to({}, 600).call(this.Action);
    };
    /**添加睡眠效果 */
    BaseMonster.prototype.addSleep = function () {
        this.actionStateArr = [MonsterActionState.Sleep];
        this.updateActionView();
    };
    /**睡眠动作 */
    BaseMonster.prototype.actionSleep = function () {
        this.addBuffTips("睡眠！", 0);
        egret.Tween.get(this).to({}, 600).call(this.nextMonsterCanAciton);
    };
    /**分裂 */
    BaseMonster.prototype.division = function () {
    };
    /**怪物攻击玩家 */
    BaseMonster.prototype.attackPlayer = function () {
        this.addBuffTips("攻击！", 0);
        var self = this;
        var posX = -35;
        var originX = 0;
        egret.Tween.get(this.bodyImg).wait(500).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
        //Message.instance.send(MsgCMD.SET_CARD);
    };
    /**给予玩家伤害 */
    BaseMonster.prototype.damagePlayer = function () {
        var self = this;
        var player = CharacterManager.Instance.player;
        for (var i = 0; i < self.attackCount; i++) {
            var damage = new DamageData();
            damage.damageValue = Math.floor(self.attack * self.attackTimes) + this._powerUpValue;
            damage.damageEffect = self.damageVfx;
            player.damaged(damage);
        }
    };
    /**给玩家debuff */
    BaseMonster.prototype.debuffPlayer = function () {
        var self = this;
        var index = Math.floor(Math.random() * this.debuffArr.length);
        var buffName = this.debuffArr[index];
        var _buffData = DataManager.Instance.getBuffDataByName(buffName);
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: Math.floor(Math.random() * 2 + 2),
            gainType: _buffData.gainType
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
    /**强化力量 */
    BaseMonster.prototype.addPowerPlus = function () {
        var self = this;
        var _buffData = DataManager.Instance.getBuffDataByName("powerUp");
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: Math.floor(Math.random() * 3 + 1),
            gainType: _buffData.gainType
        };
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuff(_data);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    /**格挡 */
    BaseMonster.prototype.defense = function () {
        var self = this;
        var value = Math.floor(Math.random() * 3 + 4);
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuffTips("格挡增加", 1);
            self.changeDefense(value);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    Object.defineProperty(BaseMonster.prototype, "attackTimes", {
        get: function () {
            return this._attackTimes;
        },
        set: function (value) {
            this._attackTimes = value;
            this.updateActionView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMonster.prototype, "attackCounts", {
        get: function () {
            return this.attackCount;
        },
        set: function (value) {
            this.attackCount = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseMonster.prototype.update = function () {
        _super.prototype.update.call(this);
        // //检测是否可以结束怪物回合
        // var mArr = CharacterManager.Instance.monsterArr;
        // for(var i=0;i<mArr.length;i++)
        // {
        //     if(mArr[i].state != CharacterState.EndRound)
        //     {
        //         return;
        //     }
        // }
    };
    /**怪物更新状态 */
    BaseMonster.prototype.changeState = function (state) {
        switch (state) {
            case CharacterState.WaitRound:
                this._state = CharacterState.WaitRound;
                break;
            case CharacterState.EndRound:
                this.randomNextAction();
                this._state = CharacterState.EndRound;
                this.nextMonsterCanAciton();
                break;
        }
    };
    /**下一个怪物可以行动 */
    BaseMonster.prototype.nextMonsterCanAciton = function () {
        var mArr = CharacterManager.Instance.monsterArr;
        var index = mArr.indexOf(this);
        if (mArr[index + 1]) {
            Message.instance.send(MsgCMD.NEXT_MONSTER_ACTION, { target: mArr[index + 1] });
        }
        else {
            GameManager.Instance.changeGameStart(GameState.EnemyRoundEnd);
        }
    };
    BaseMonster.prototype.damaged = function (damageData) {
        _super.prototype.damaged.call(this, damageData);
        if (this.actionStateArr.indexOf(MonsterActionState.Sleep) >= 0) {
            if (this.healthC.curDefense <= 0)
                this.addDizziness();
        }
        var self = this;
        this.bodyImg.x = 0;
        var posX = 15;
        self.skewX = 0;
        egret.Tween.get(this.bodyImg).to({ skewX: 10, x: posX }, 100, egret.Ease.quartOut).to({ skewX: 0, x: 0 }, 150);
    };
    BaseMonster.prototype.dead = function () {
        this._isDead = true;
        Message.instance.send(MsgCMD.MONSTER_DIE);
        egret.Tween.get(this).to({ alpha: 0 }, 600).call(this.removeSelf);
    };
    BaseMonster.prototype.removeSelf = function () {
        CharacterManager.Instance.removeMonster(this);
        if (this.monsterLevel == 1) {
            GameManager.Instance.ordinary++;
        }
        if (this.monsterLevel == 2) {
            GameManager.Instance.elite++;
        }
        if (this.bodyAnim)
            this.bodyAnim.removeFromViewPort();
    };
    Object.defineProperty(BaseMonster.prototype, "mLevel", {
        /**怪物等级，1普通怪，2精英怪，3boss怪 */
        get: function () {
            return this.monsterLevel;
        },
        enumerable: true,
        configurable: true
    });
    return BaseMonster;
}(BaseCharacter));
__reflect(BaseMonster.prototype, "BaseMonster");
//# sourceMappingURL=BaseMonster.js.map