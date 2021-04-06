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
/**卑鄙精灵 */
var DespicableGoblin = (function (_super) {
    __extends(DespicableGoblin, _super);
    function DespicableGoblin(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        _this.dam = 0;
        _this.skill = 0;
        _this.name = "DespicableGoblin";
        return _this;
    }
    DespicableGoblin.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    DespicableGoblin.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = Math.floor(Math.random() * 5) + 11;
        }
        this.data.imgSource = "despicablegoblin_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    };
    DespicableGoblin.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg, { loop: true }).to({ scaleY: 0.8 }, 1000).to({ scaleY: 1 }, 1000);
        this.randomNextAction();
    };
    /**随机下一步动作 */
    DespicableGoblin.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound >= 0) {
            this.attack = Math.floor(Math.random() * 2) + 9;
            this.attackCount = 1;
            this.dam = this.attack;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    DespicableGoblin.prototype.Action = function () {
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
    DespicableGoblin.prototype.storingForce = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).wait(1000).call(function () {
            self.Action();
        });
    };
    /**怪物攻击玩家 */
    DespicableGoblin.prototype.attackPlayer = function () {
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
    return DespicableGoblin;
}(BaseMonster));
__reflect(DespicableGoblin.prototype, "DespicableGoblin");
//# sourceMappingURL=DespicableGoblin.js.map