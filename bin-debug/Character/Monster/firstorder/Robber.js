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
/**抢劫犯 */
var Robber = (function (_super) {
    __extends(Robber, _super);
    function Robber(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        _this.isEscape = false;
        _this.money = 0;
        _this.name = "Robber";
        return _this;
    }
    Robber.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    Robber.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = Math.floor(Math.random() * 5) + 45;
        }
        this.data.imgSource = "robber_0_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    };
    Robber.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        // egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.8,scaleX:0.8},1000).to({scaleY:1,scaleX:1},1000);
        this.randomNextAction();
        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("robber_", 6, this.bodyImg, 10, false, true);
        this.bodyAnim.playAnim();
    };
    /**随机下一步动作 */
    Robber.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound >= 0 && this.monsterAliveRound <= 5) {
            var a = Math.random();
            if (a > 0.4) {
                this.actionStateArr.push(MonsterActionState.defense);
            }
            else {
                this.attack = 10;
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
        if (this.monsterAliveRound >= 6) {
            this.actionStateArr.push(MonsterActionState.Escape);
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    Robber.prototype.Action = function () {
        var self = this;
        if (this.actionIndex >= this.actionStateArr.length) {
            egret.Tween.get(this).wait(600).call(function () {
                self.changeState(CharacterState.EndRound);
            });
            return;
        }
        // if(this.isEscape)
        // {
        // 	
        // }
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
            case MonsterActionState.Escape:
                this.actionIndex++;
                this.escape();
                break;
        }
    };
    /**逃跑 */
    Robber.prototype.escape = function () {
        // this.scaleX=-1;
        var self = this;
        var mArr = CharacterManager.Instance.monsterArr;
        for (var i = 0; i < mArr.length; i++) {
            if (mArr[i].name == "Robber") {
                mArr[i].scaleX = -1;
                egret.Tween.get(mArr[i]).to({ x: 1300 }, 1000, egret.Ease.cubicIn).call(function () {
                    this.isEscape = true;
                    CharacterManager.Instance.removeMonster(this);
                    self.Action();
                });
            }
            ;
        }
    };
    /**怪物攻击玩家 */
    Robber.prototype.attackPlayer = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.addBuffTips("偷钱", 1);
            self.Action();
        });
        /**偷玩家钱 */
        if (GameManager.Instance.curCoin >= 15) {
            GameManager.Instance.curCoin -= 15;
            this.money += 15;
        }
        else {
            this.money += GameManager.Instance.curCoin;
            GameManager.Instance.curCoin -= GameManager.Instance.curCoin;
        }
    };
    //死亡后还钱
    Robber.prototype.dead = function () {
        GameManager.Instance.curCoin += this.money;
        _super.prototype.dead.call(this);
    };
    /**格挡 */
    Robber.prototype.defense = function () {
        var self = this;
        var value = Math.floor(Math.random() * 7 + 6);
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuffTips("格挡增加", 1);
            self.changeDefense(value);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    return Robber;
}(BaseMonster));
__reflect(Robber.prototype, "Robber");
//# sourceMappingURL=Robber.js.map