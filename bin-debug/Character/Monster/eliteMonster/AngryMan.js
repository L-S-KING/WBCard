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
 * 红二哈（精英怪）
 * 疼痛戳刺：对玩家造成伤害时往玩家弃牌堆塞一张伤口。
 * N连击：对玩家造成N*6（N*7）点攻击伤害
 * 重击：对玩家造成24点攻击伤害
 */
var AngryMan = (function (_super) {
    __extends(AngryMan, _super);
    function AngryMan(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.name = "AngryMan";
        return _this;
    }
    AngryMan.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    AngryMan.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = 120;
        }
        this.data.imgSource = "angry00_png";
        this.damageVfx = "zhuazi_png";
        this.monsterLevel = 2;
    };
    AngryMan.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.randomNextAction();
        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("angry0", 6, this.bodyImg, 6, false, true);
        this.bodyAnim.playAnim();
    };
    /**随机下一步动作 */
    AngryMan.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound == 0) {
            this.attack = 6;
            this.attackCount = Math.floor(Math.random() * 2 + 2);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        else if (this.monsterAliveRound <= 2) {
            var randomNum = Math.random();
            if (randomNum < 0.7) {
                this.attack = 6;
                this.attackCount = Math.floor(Math.random() * 3 + 2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            else if (randomNum >= 0.7 && this.monsterAliveRound % 2 == 0) {
                this.attack = 28;
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
            else {
                this.attack = 16;
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
        else if (this.monsterAliveRound > 2) {
            var randomNum = Math.random();
            if (randomNum < 0.7) {
                this.attack = 6;
                this.attackCount = Math.floor(Math.random() * 3 + 2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            else if (randomNum >= 0.7 && this.monsterAliveRound % 2 == 0) {
                this.actionStateArr.push(MonsterActionState.buffPlus);
            }
            else {
                this.attack = 16 + Math.floor(Math.random() * 6);
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    AngryMan.prototype.Action = function () {
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
            case MonsterActionState.buffPlus:
                this.actionIndex++;
                this.addPowerPlus();
                break;
        }
    };
    /**怪物攻击玩家 */
    AngryMan.prototype.attackPlayer = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
            var a = Math.random();
            if (a >= 0.4) {
                self.debuffPlayer();
            }
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    /**给玩家添加debuff */
    AngryMan.prototype.debuffPlayer = function () {
        var self = this;
        var buffName = "maimed";
        var _buffData = DataManager.Instance.getBuffDataByName(buffName);
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: 3,
            gainType: 1
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
    AngryMan.prototype.addPowerPlus = function () {
        var self = this;
        var _buffData = DataManager.Instance.getBuffDataByName("powerUp");
        var _data = {
            name: _buffData.name,
            detailName: _buffData.detailName,
            type: _buffData.type,
            detail: _buffData.detail,
            img: _buffData.img,
            value: 2,
            gainType: 0
        };
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuff(_data);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    return AngryMan;
}(BaseMonster));
__reflect(AngryMan.prototype, "AngryMan");
//# sourceMappingURL=AngryMan.js.map