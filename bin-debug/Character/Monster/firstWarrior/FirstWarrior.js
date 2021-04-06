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
 * 第一勇士（boss）
 */
var FirstWarrior = (function (_super) {
    __extends(FirstWarrior, _super);
    function FirstWarrior(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        /**被动 */
        _this.isPassive = false;
        _this.iscutbuff = false;
        _this.name = "FirstWarrior";
        return _this;
    }
    FirstWarrior.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    FirstWarrior.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = 400;
        }
        this.data.imgSource = "firstBOSS_png";
        this.damageVfx = "anglerFlower_png";
        this.monsterLevel = 3;
    };
    FirstWarrior.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg, { loop: true }).to({ scaleY: 0.8 }, 1000).to({ scaleY: 1 }, 1000);
        this.randomNextAction();
    };
    /**随机下一步动作 */
    FirstWarrior.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound == 0) {
            if (this.healthC.curHealth > this.healthC.maxHealth * 0.5) {
                this.actionStateArr.push(MonsterActionState.debuff);
            }
            else {
                var a = Math.random();
                if (a < 0.3) {
                    this.actionStateArr.push(MonsterActionState.buffPlus);
                }
                else {
                    this.attack = Math.floor(Math.random() * 5 + 6);
                    this.attackCount = Math.floor(Math.random() * 3 + 1);
                    this.actionStateArr.push(MonsterActionState.attack);
                }
            }
        }
        if (this.monsterAliveRound >= 1) {
            if (this.healthC.curHealth > this.healthC.maxHealth * 0.5) {
                var a = Math.random();
                if (a < 0.15) {
                    this.actionStateArr.push(MonsterActionState.debuff);
                }
                else if (a < 0.3) {
                    this.actionStateArr.push(MonsterActionState.defense);
                }
                else if (a < 0.5) {
                    this.actionStateArr.push(MonsterActionState.buffPlus);
                }
                else {
                    this.attack = Math.floor(Math.random() * 5 + 6);
                    this.attackCount = Math.floor(Math.random() * 3 + 1);
                    this.actionStateArr.push(MonsterActionState.attack);
                }
            }
            else {
                var a = Math.random();
                if (a < 0.15) {
                    this.actionStateArr.push(MonsterActionState.buffPlus);
                }
                else if (a < 0.2) {
                    this.actionStateArr.push(MonsterActionState.defense);
                }
                else {
                    this.attack = Math.floor(Math.random() * 5 + 10);
                    this.attackCount = Math.floor(Math.random() * 3 + 2);
                    this.actionStateArr.push(MonsterActionState.attack);
                }
            }
        }
        // else if(this.monsterAliveRound<=1)
        // {
        //     this.attack = Math.floor(Math.random()*5+6);
        //     this.attackCount = Math.floor(Math.random()*3+1);
        //     this.actionStateArr.push(MonsterActionState.attack);
        // }
        // else if(this.monsterAliveRound<=2)
        // {
        //     this.actionStateArr.push(MonsterActionState.buffPlus);
        // }
        // else if(this.monsterAliveRound<=3)
        // {
        //     this.actionStateArr.push(MonsterActionState.defense);
        // }
        // else
        // {
        //     this.attack = Math.floor(Math.random()*5+10);
        //     this.attackCount = Math.floor(Math.random()*3+1);
        //     this.actionStateArr.push(MonsterActionState.attack);
        // }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    FirstWarrior.prototype.Action = function () {
        var self = this;
        if (this.actionIndex >= this.actionStateArr.length) {
            egret.Tween.get(this).wait(600).call(function () {
                self.changeState(CharacterState.EndRound);
            });
            return;
        }
        if (this.iscutbuff) {
            for (var i = 0; i < this.haveBuff.length; i++) {
                if (this.haveBuff[i].gainType == 1) {
                    this.removeBuffByGainType(this.haveBuff[i].gainType);
                }
            }
            this.iscutbuff = false;
        }
        if (this.isPassive && this.actionIndex == 0) {
            this.addMultipleDefense();
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
            case MonsterActionState.NoCard:
                this.actionIndex++;
                this.setCard();
                break;
            case MonsterActionState.buffPlus:
                this.actionIndex++;
                this.addPowerPlus();
                break;
            case MonsterActionState.defense:
                this.actionIndex++;
                this.defense();
                break;
        }
    };
    FirstWarrior.prototype.setCard = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            Message.instance.send(MsgCMD.SET_CARD, { setCardId: 8 });
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    /**怪物攻击玩家 */
    FirstWarrior.prototype.attackPlayer = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    /**格挡 */
    FirstWarrior.prototype.defense = function () {
        var self = this;
        var value = Math.floor(Math.random() * 3 + 4);
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuffTips("格挡增加", 1);
            self.changeDefense(15);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    /**强化力量 */
    FirstWarrior.prototype.addPowerPlus = function () {
        var value = 0;
        if (this.isPassive) {
            value = 6;
        }
        else {
            value = 2;
        }
        var self = this;
        var _buffData = DataManager.Instance.getBuffDataByName("powerUp");
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: value,
            gainType: 0
        };
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuff(_data);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    /**给玩家debuff */
    FirstWarrior.prototype.debuffPlayer = function (a) {
        var self = this;
        // var index = Math.floor(Math.random()*this.debuffArr.length);
        var buffName = "maimed";
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
        var buffName1 = "week";
        var _buffData1 = DataManager.Instance.getBuffDataByName(buffName1);
        var _data1 = {
            name: _buffData1.name,
            detailName: _buffData1.detailName,
            type: _buffData1.type,
            detail: _buffData1.detail,
            img: _buffData1.img,
            value: 2,
            gainType: 1
        };
        if (this.actionStateArr.indexOf(MonsterActionState.attack) >= 0) {
            debuff();
            debuff1();
        }
        else {
            var posX = -20;
            var originX = 0;
            egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
                debuff();
                debuff1();
            }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
                self.Action();
            });
        }
        function debuff() {
            var player = CharacterManager.Instance.player;
            player.addBuff(_data);
        }
        function debuff1() {
            var player = CharacterManager.Instance.player;
            egret.Tween.get(this).wait(800).call(function () { player.addBuff(_data1); });
        }
    };
    FirstWarrior.prototype.damaged = function (damageData) {
        _super.prototype.damaged.call(this, damageData);
        if (this.healthC.curHealth <= this.healthC.maxHealth * 0.5 && !this.isPassive) {
            this.actionStateArr = [];
            this.actionStateArr.push(MonsterActionState.buffPlus);
            this.actionStateArr.push(MonsterActionState.defense);
            this.actionTips.updateTips();
            // for(var i:number=0;i<this.haveBuff.length;i++)
            // {
            //     if(this.haveBuff[i].gainType==1)
            //     {
            //         this.removeBuffByGainType(this.haveBuff[i].gainType);
            //     }
            // }
            this.isPassive = true;
            this.iscutbuff = true;
        }
    };
    /**金属化BUFF */
    FirstWarrior.prototype.addMultipleDefense = function () {
        var value = 5;
        for (var i = 0; i < this.haveBuff.length; i++) {
            if (this.haveBuff[i].name == "multipleDefense") {
                value = 1;
                break;
            }
        }
        var buffName = "multipleDefense";
        var _buffData = DataManager.Instance.getBuffDataByName(buffName);
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: value,
            gainType: 0
        };
        var self = this;
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuff(_data);
        });
    };
    return FirstWarrior;
}(BaseMonster));
__reflect(FirstWarrior.prototype, "FirstWarrior");
//# sourceMappingURL=FirstWarrior.js.map