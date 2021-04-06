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
/**胖精灵 */
var FatGoblin = (function (_super) {
    __extends(FatGoblin, _super);
    function FatGoblin(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.divsionHealth = 0;
        _this.dam = 0;
        _this.skill = 0;
        _this.name = "FatGoblin";
        return _this;
    }
    FatGoblin.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    FatGoblin.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = Math.floor(Math.random() * 5) + 13;
        }
        this.data.imgSource = "fatgoblin_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    };
    FatGoblin.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg, { loop: true }).to({ scaleY: 0.8 }, 1000).to({ scaleY: 1 }, 1000);
        this.randomNextAction();
    };
    /**随机下一步动作 */
    FatGoblin.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound >= 0) {
            this.attack = Math.floor(Math.random() * 2) + 4;
            this.attackCount = 1;
            this.dam = this.attack;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    FatGoblin.prototype.Action = function () {
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
    FatGoblin.prototype.storingForce = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).wait(1000).call(function () {
            self.Action();
        });
    };
    /**怪物攻击玩家 */
    FatGoblin.prototype.attackPlayer = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        var self = this;
        var _buffData = DataManager.Instance.getBuffDataByName("week");
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
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        })
            .to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    return FatGoblin;
}(BaseMonster));
__reflect(FatGoblin.prototype, "FatGoblin");
//# sourceMappingURL=FatGoblin.js.map