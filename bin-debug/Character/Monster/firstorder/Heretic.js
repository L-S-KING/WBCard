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
 * 邪教徒
 */
var Heretic = (function (_super) {
    __extends(Heretic, _super);
    function Heretic(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        _this.name = "Heretic";
        return _this;
    }
    Heretic.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    Heretic.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = Math.floor(Math.random() * 5) + 48;
        }
        this.data.imgSource = "heretic_0_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    };
    Heretic.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg, { loop: true }).to({ scaleY: 0.95, scaleX: 0.95 }, 1000).to({ scaleY: 1, scaleX: 1 }, 1000);
        this.randomNextAction();
        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("heretic_", 6, this.bodyImg, 10, false, true);
        this.bodyAnim.playAnim();
    };
    /**随机下一步动作 */
    Heretic.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound == 0) {
            this.actionStateArr.push(MonsterActionState.buffPlus);
        }
        if (this.monsterAliveRound == 1) {
            this.attack = 6;
            this.attackCount = 1;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        if (this.monsterAliveRound == 2) {
            this.attack = 6;
            this.attackCount = 1;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        if (this.monsterAliveRound >= 3) {
            if (this.monsterAliveRound % 3 == 0) {
                this.actionStateArr.push(MonsterActionState.buffPlus);
            }
            else {
                this.attack = 6;
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    Heretic.prototype.Action = function () {
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
    Heretic.prototype.setCard = function () {
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
    Heretic.prototype.attackPlayer = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    /**强化力量 */
    Heretic.prototype.addPowerPlus = function () {
        var self = this;
        var _buffData = DataManager.Instance.getBuffDataByName("powerUp");
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: 3,
            gainType: 0
        };
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuff(_data);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    return Heretic;
}(BaseMonster));
__reflect(Heretic.prototype, "Heretic");
//# sourceMappingURL=Heretic.js.map