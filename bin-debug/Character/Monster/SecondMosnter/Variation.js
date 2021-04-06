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
 * 变异人（精英怪）
 */
var Variation = (function (_super) {
    __extends(Variation, _super);
    function Variation(data) {
        var _this = _super.call(this, data) || this;
        _this.isMaimed = false;
        _this.name = egret.getQualifiedClassName(Variation);
        return _this;
    }
    Variation.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.health = 160;
        this.data.imgSource = "variation_0_png";
        this.damageVfx = "variation_vfx_png";
        this.monsterLevel = 2;
    };
    Variation.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    Variation.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        var posY = 20;
        var originY = 0;
        this.randomNextAction();
        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("variation_", 8, this.bodyImg, 5, false, true);
        this.bodyAnim.playAnim();
    };
    Variation.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        if (this.monsterAliveRound == 0) {
            this.actionStateArr.push(MonsterActionState.debuff);
        }
        else {
            var random = Math.floor(Math.random() * 3);
            if (random == 0) {
                this.attack = Math.floor(Math.random() * 5 + 10);
                this.attackCount = Math.floor(Math.random() * 2 + 1);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            else if (random == 1) {
                this.attack = Math.floor(Math.random() * 5 + 5);
                this.attackCount = Math.floor(Math.random() * 2 + 2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            else if (random == 2) {
                this.attack = Math.floor(Math.random() * 5 + 10);
                this.attackCount = Math.floor(Math.random() * 2 + 1);
                this.actionStateArr.push(MonsterActionState.attack);
                //给易伤
                this.isMaimed = true;
            }
        }
        this.actionTips.updateTips();
    };
    /**行动 */
    Variation.prototype.Action = function () {
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
                this.deBuffPlayerByName("chaos");
                break;
        }
    };
    Variation.prototype.attackPlayer = function () {
        this.addBuffTips("攻击！", 0);
        var self = this;
        var posX = -35;
        var originX = 0;
        egret.Tween.get(this.bodyImg).wait(500).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
        if (this.isMaimed) {
            this.deBuffPlayerByName("maimed");
            this.isMaimed = false;
        }
    };
    Variation.prototype.deBuffPlayerByName = function (name) {
        var _buffData = DataManager.Instance.getBuffDataByName(name);
        var value;
        if (name == "chaos") {
            value = 0;
        }
        else {
            value = Math.floor(Math.random() * 2 + 2);
        }
        var self = this;
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
    return Variation;
}(BaseMonster));
__reflect(Variation.prototype, "Variation");
//# sourceMappingURL=Variation.js.map