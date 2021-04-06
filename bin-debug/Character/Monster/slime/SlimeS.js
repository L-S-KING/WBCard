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
/**巨小假萌王 */
var SlimeS = (function (_super) {
    __extends(SlimeS, _super);
    function SlimeS(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        _this.name = "SlimeS";
        return _this;
    }
    SlimeS.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    SlimeS.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = 35;
        }
        this.data.imgSource = "Slime0_1_png";
        this.damageVfx = "Slime0_3_png";
        this.monsterLevel = 1;
    };
    SlimeS.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg, { loop: true }).to({ scaleY: 0.8, scaleX: 0.8 }, 1000).to({ scaleY: 1, scaleX: 1 }, 1000);
        this.randomNextAction();
        if (this.isMonsterSet) {
        }
    };
    /**随机下一步动作 */
    SlimeS.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound == 0) {
            this.actionStateArr.push(MonsterActionState.NoCard);
        }
        else if (this.monsterAliveRound <= 5) {
            this.attack = Math.floor(Math.random() * 5 + 6);
            this.attackCount = Math.floor(Math.random() * 2 + 1);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        else {
            this.attack = Math.floor(Math.random() * 5 + 10);
            this.attackCount = Math.floor(Math.random() * 2 + 1);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    SlimeS.prototype.Action = function () {
        var self = this;
        if (this.actionIndex >= this.actionStateArr.length) {
            egret.Tween.get(this).wait(600).call(function () {
                self.changeState(CharacterState.EndRound);
            });
            return;
        }
        if (this.isMonsterSet && this.monsterAliveRound == 0) {
            var index = CharacterManager.Instance.monsterArr.indexOf(this);
            var teIndex = CharacterManager.Instance.monsterArr.length - 1;
            if (index == teIndex) {
                GameManager.Instance.changeGameStart(GameState.EnemyRoundEnd);
            }
            else {
                this.nextMonsterCanAciton();
            }
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
    SlimeS.prototype.removeSelf = function () {
        _super.prototype.removeSelf.call(this);
    };
    SlimeS.prototype.setCard = function () {
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
    SlimeS.prototype.attackPlayer = function () {
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
    return SlimeS;
}(BaseMonster));
__reflect(SlimeS.prototype, "SlimeS");
//# sourceMappingURL=SlimeS.js.map