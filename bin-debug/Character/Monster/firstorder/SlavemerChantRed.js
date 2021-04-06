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
/**奴隶商人红 */
var SlavemerChantRed = (function (_super) {
    __extends(SlavemerChantRed, _super);
    function SlavemerChantRed(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        _this.deBuffType = 0; //1为荆棘buff，2为虚弱buff
        _this.name = "SlavemerChantRed";
        return _this;
    }
    SlavemerChantRed.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    SlavemerChantRed.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = Math.floor(Math.random() * 5) + 45;
        }
        this.data.imgSource = "slavemerchantred_0_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    };
    SlavemerChantRed.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        // egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.8,scaleX:0.8},1000).to({scaleY:1,scaleX:1},1000);
        this.randomNextAction();
        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("slavemerchantred_", 6, this.bodyImg, 10, false, true);
        this.bodyAnim.playAnim();
    };
    /**随机下一步动作 */
    SlavemerChantRed.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound == 0) {
            this.attack = 8;
            this.attackCount = 1;
            this.deBuffType = 2;
            this.actionStateArr.push(MonsterActionState.debuff);
        }
        if (this.monsterAliveRound == 1) {
            this.attack = 13;
            this.attackCount = 1;
            this.deBuffType = 0;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        if (this.monsterAliveRound == 2) {
            this.attack = 13;
            this.attackCount = 1;
            this.deBuffType = 0;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        if (this.monsterAliveRound == 3) {
            this.deBuffType = 1;
            this.actionStateArr.push(MonsterActionState.debuff);
        }
        if (this.monsterAliveRound == 4) {
            this.attack = 13;
            this.attackCount = 1;
            this.deBuffType = 0;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        if (this.monsterAliveRound == 5) {
            this.attack = 13;
            this.attackCount = 1;
            this.deBuffType = 0;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        if (this.monsterAliveRound >= 6) {
            if (this.monsterAliveRound % 6 == 0) {
                this.attack = 8;
                this.attackCount = 1;
                this.deBuffType = 2;
                this.actionStateArr.push(MonsterActionState.debuff);
            }
            else if (this.monsterAliveRound % 9 == 0) {
                this.deBuffType = 1;
                this.actionStateArr.push(MonsterActionState.debuff);
            }
            else {
                this.attack = 13;
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    SlavemerChantRed.prototype.Action = function () {
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
    SlavemerChantRed.prototype.setCard = function () {
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
    SlavemerChantRed.prototype.attackPlayer = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    /**给玩家debuff */
    SlavemerChantRed.prototype.debuffPlayer = function () {
        var self = this;
        var value = 0;
        var _buffData = DataManager.Instance.getBuffDataByName("");
        if (this.deBuffType == 1) {
            _buffData = DataManager.Instance.getBuffDataByName("Twining");
            value = 2;
        }
        else if (this.deBuffType == 2) {
            _buffData = DataManager.Instance.getBuffDataByName("week");
            value = 2;
        }
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: value,
            gainType: _buffData.gainType
        };
        if (this.actionStateArr.indexOf(MonsterActionState.attack) >= 0) {
            debuff();
        }
        else {
            if (_buffData.name == "week") {
                var posX = -35;
                var originX = 0;
                egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
                    debuff();
                })
                    .to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
                    self.Action();
                });
            }
            else if (_buffData.name == "Twining") {
                var posX = -35;
                var originX = 0;
                egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
                    debuff();
                })
                    .to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
                    self.Action();
                });
            }
        }
        function debuff() {
            var player = CharacterManager.Instance.player;
            player.addBuff(_data);
        }
    };
    return SlavemerChantRed;
}(BaseMonster));
__reflect(SlavemerChantRed.prototype, "SlavemerChantRed");
//# sourceMappingURL=SlavemerChantRed.js.map