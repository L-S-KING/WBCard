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
 * 奶树
 */
var PriestTree = (function (_super) {
    __extends(PriestTree, _super);
    function PriestTree(data) {
        var _this = _super.call(this, data) || this;
        _this.name = egret.getQualifiedClassName(PriestTree);
        return _this;
    }
    PriestTree.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.health = 100;
        this.data.imgSource = "tree_0_png";
        this.damageVfx = "tree_vfx_png";
        this.monsterLevel = 2;
    };
    PriestTree.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    PriestTree.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        var posY = 20;
        var originY = 0;
        this.randomNextAction();
        var anima = new ImgAnim();
        anima.initData("tree_", 8, this.bodyImg, 5, false, true);
        anima.playAnim();
    };
    PriestTree.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var random = Math.floor(Math.random() * 3);
        if (random == 0) {
            //破甲攻击
            this.attack = Math.floor(Math.random() * 3 + 8);
            this.attackCount = 1;
            this.actionStateArr.push(MonsterActionState.attack);
        }
        else if (random == 1) {
            if (this.monsterAliveRound > 1) {
                this.actionStateArr.push(MonsterActionState.Cure);
            }
            else {
                this.actionStateArr.push(MonsterActionState.buffPlus);
            }
        }
        else if (random == 2) {
            this.actionStateArr.push(MonsterActionState.buffPlus);
        }
        this.actionTips.updateTips();
    };
    /**行动 */
    PriestTree.prototype.Action = function () {
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
                this.allMonsterPowerPlus();
                break;
            case MonsterActionState.Cure:
                this.actionIndex++;
                this.recoverHealth();
                break;
        }
    };
    PriestTree.prototype.deBuffPlayerByName = function (name) {
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
    /**群体回血 */
    PriestTree.prototype.recoverHealth = function () {
        var self = this;
        var monsterArr = CharacterManager.Instance.monsterArr;
        //群体回血
        for (var i = 0; i < monsterArr.length; i++) {
            monsterArr[i].changeCurHealth(10);
            var greenLight = new egret.Bitmap(RES.getRes("cure_0_png"));
            monsterArr[i].addChild(greenLight);
            var anima = new ImgAnim();
            anima.initData("cure_", 5, greenLight, 5, true, false);
            anima.playAnim();
        }
        egret.Tween.get(this).wait(200).to({}, 300).call(function () {
            self.Action();
        });
    };
    /**攻击玩家 */
    PriestTree.prototype.attackPlayer = function () {
        _super.prototype.attackPlayer.call(this);
        this.deBuffPlayerByName("destroyArmor");
    };
    /**群体增加力量 */
    PriestTree.prototype.allMonsterPowerPlus = function () {
        var monsterArr = CharacterManager.Instance.monsterArr;
        //群体加力量
        for (var i = 0; i < monsterArr.length; i++) {
            var self = this;
            var _buffData = DataManager.Instance.getBuffDataByName("powerUp");
            var _data = {
                name: _buffData.name,
                detailName: _buffData.detailName,
                type: _buffData.type,
                detail: _buffData.detail,
                img: _buffData.img,
                value: Math.floor(Math.random() * 3 + 2),
                gainType: _buffData.gainType
            };
            monsterArr[i].addBuff(_data);
        }
        egret.Tween.get(this).wait(500).to({}, 300).call(function () {
            self.Action();
        });
    };
    return PriestTree;
}(BaseMonster));
__reflect(PriestTree.prototype, "PriestTree");
//# sourceMappingURL=PriestTree.js.map