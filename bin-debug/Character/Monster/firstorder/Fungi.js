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
/**真菌兽 */
var Fungi = (function (_super) {
    __extends(Fungi, _super);
    function Fungi(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        _this.skill = 0;
        _this.name = "Fungi";
        return _this;
    }
    Fungi.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    Fungi.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = Math.floor(Math.random() * 6) + 22;
        }
        this.data.imgSource = "fungi_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    };
    Fungi.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg, { loop: true }).to({ scaleY: 0.95, scaleX: 0.95 }, 1000).to({ scaleY: 1, scaleX: 1 }, 1000);
        this.randomNextAction();
    };
    /**随机下一步动作 */
    Fungi.prototype.randomNextAction = function () {
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
            if (this.monsterAliveRound % 3 == 1) {
                this.attack = 6;
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
            if (this.monsterAliveRound % 3 == 2) {
                this.attack = 6;
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    Fungi.prototype.Action = function () {
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
        }
    };
    /**怪物攻击玩家 */
    Fungi.prototype.attackPlayer = function () {
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
    /**强化力量 */
    Fungi.prototype.addPowerPlus = function () {
        var self = this;
        var _buffData = DataManager.Instance.getBuffDataByName("powerUp");
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: Math.floor(Math.random() + 3),
            gainType: _buffData.gainType
        };
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuff(_data);
        })
            .to({}, 300).call(function () {
            self.Action();
        });
    };
    Fungi.prototype.damaged = function (damageData) {
        _super.prototype.damaged.call(this, damageData);
        if (this.healthC.curHealth <= 0) {
            var self = this;
            var _buffData = DataManager.Instance.getBuffDataByName("maimed");
            var _data = {
                name: _buffData.name,
                detailName: _buffData.detailName,
                type: _buffData.type,
                detail: _buffData.detail,
                img: _buffData.img,
                value: 2,
                gainType: _buffData.gainType
            };
            var player = CharacterManager.Instance.player;
            player.addBuff(_data);
        }
    };
    return Fungi;
}(BaseMonster));
__reflect(Fungi.prototype, "Fungi");
//# sourceMappingURL=Fungi.js.map