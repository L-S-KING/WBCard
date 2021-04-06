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
/**地精法师 */
var GoblinWizard = (function (_super) {
    __extends(GoblinWizard, _super);
    function GoblinWizard(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        _this.skill = 0;
        _this.name = "GoblinWizard";
        return _this;
    }
    GoblinWizard.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    GoblinWizard.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = Math.floor(Math.random() * 4) + 22;
        }
        this.data.imgSource = "wa0_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    };
    GoblinWizard.prototype.init = function () {
        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("wa", 39, this.bodyImg, 4, false, true);
        this.bodyAnim.playAnim();
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.randomNextAction();
    };
    /**随机下一步动作 */
    GoblinWizard.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound == 0) {
            this.actionStateArr.push(MonsterActionState.StoringForce);
        }
        if (this.monsterAliveRound == 1) {
            this.actionStateArr.push(MonsterActionState.StoringForce);
        }
        if (this.monsterAliveRound == 2) {
            this.attack = Math.floor(Math.random() * 2) + 30;
            this.attackCount = 1;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        if (this.monsterAliveRound >= 3) {
            if (this.monsterAliveRound % 3 == 0) {
                this.actionStateArr.push(MonsterActionState.StoringForce);
            }
            if (this.monsterAliveRound % 3 == 1) {
                this.actionStateArr.push(MonsterActionState.StoringForce);
            }
            if (this.monsterAliveRound % 3 == 2) {
                this.attack = Math.floor(Math.random() * 2) + 40;
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    GoblinWizard.prototype.Action = function () {
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
            case MonsterActionState.StoringForce:
                this.actionIndex++;
                this.storingForce();
                break;
        }
    };
    GoblinWizard.prototype.storingForce = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        this.addBuffTips("蓄力", 0);
        egret.Tween.get(this.bodyImg).wait(1000).call(function () {
            self.Action();
        });
    };
    /**怪物攻击玩家 */
    GoblinWizard.prototype.attackPlayer = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        })
            .to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    return GoblinWizard;
}(BaseMonster));
__reflect(GoblinWizard.prototype, "GoblinWizard");
//# sourceMappingURL=GoblinWizard.js.map