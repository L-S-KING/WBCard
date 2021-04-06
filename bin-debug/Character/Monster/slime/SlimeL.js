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
/**老吊假萌王(boss) */
var SlimeL = (function (_super) {
    __extends(SlimeL, _super);
    function SlimeL(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        _this.name = "SlimeL";
        return _this;
    }
    SlimeL.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    SlimeL.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = 350;
        }
        this.data.imgSource = "Slime2_1_png";
        this.damageVfx = "Slime2_3_png";
        this.monsterLevel = 3;
    };
    SlimeL.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg, { loop: true }).to({ scaleY: 0.8, scaleX: 0.8 }, 1000).to({ scaleY: 1, scaleX: 1 }, 1000);
        this.randomNextAction();
        var data = DataManager.Instance.getBuffDataByName("division");
        this.addBuff(data);
    };
    /**随机下一步动作 */
    SlimeL.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound == 0) {
            this.actionStateArr.push(MonsterActionState.NoCard);
        }
        else if (this.monsterAliveRound <= 4) {
            this.attack = Math.floor(Math.random() * 5 + 6);
            this.attackCount = Math.floor(Math.random() * 3 + 1);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        else {
            this.attack = Math.floor(Math.random() * 5 + 10);
            this.attackCount = Math.floor(Math.random() * 3 + 1);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    SlimeL.prototype.Action = function () {
        var self = this;
        if (this.actionIndex >= this.actionStateArr.length) {
            egret.Tween.get(this).wait(600).call(function () {
                self.changeState(CharacterState.EndRound);
            });
            return;
        }
        this.monsterAliveRound++;
        if (this.healthC.curHealth <= this.healthC.maxHealth * 0.5) {
            this.division();
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
        }
    };
    SlimeL.prototype.division = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 1200).call(this.initSmallSlime);
    };
    SlimeL.prototype.initSmallSlime = function () {
        this.group = this.parent;
        this.divsionHealth = this.healthC.curHealth;
        var self = this;
        var posX = this.x - 200;
        for (var i = 0; i < 2; i++) {
            var _data = {
                name: null,
                originX: posX + i * 400,
                originY: 400,
                health: this.divsionHealth,
                imgSource: null,
            };
            if (i == 1) {
                var slime = new SlimeM(_data, true);
            }
            else {
                var slime = new SlimeM(_data, true);
            }
            this.group.addChild(slime);
            CharacterManager.Instance.pushMonsterToArr(slime);
        }
        this.removeSelf();
    };
    SlimeL.prototype.removeSelf = function () {
        _super.prototype.removeSelf.call(this);
    };
    SlimeL.prototype.setCard = function () {
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
    SlimeL.prototype.attackPlayer = function () {
        this.addBuffTips("攻击！", 0);
        var self = this;
        var posX = -35;
        var originX = 0;
        egret.Tween.get(this.bodyImg).wait(500).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
            Message.instance.send(MsgCMD.SET_CARD, { setCardId: 8 });
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    return SlimeL;
}(BaseMonster));
__reflect(SlimeL.prototype, "SlimeL");
//# sourceMappingURL=SlimeL.js.map