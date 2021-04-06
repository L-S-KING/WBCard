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
 * 扎人的树（精英怪）
 * 疼痛戳刺：对玩家造成伤害时往玩家弃牌堆塞一张伤口。
 * N连击：对玩家造成N*6（N*7）点攻击伤害
 * 重击：对玩家造成24点攻击伤害
 */
var PryingTree = (function (_super) {
    __extends(PryingTree, _super);
    function PryingTree(data, isMonsterSet) {
        if (isMonsterSet === void 0) { isMonsterSet = false; }
        var _this = _super.call(this, data, isMonsterSet) || this;
        _this.name = "PryingTree";
        return _this;
    }
    PryingTree.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    PryingTree.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = 180;
        }
        this.data.imgSource = "hurtMan00_png";
        this.damageVfx = "tree_vfx_png";
        this.monsterLevel = 2;
    };
    PryingTree.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.randomNextAction();
        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("hurtMan0", 6, this.bodyImg, 6, false, true);
        this.bodyAnim.playAnim();
    };
    /**随机下一步动作 */
    PryingTree.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if (this.monsterAliveRound == 0) {
            this.attack = 6;
            this.attackCount = Math.floor(Math.random() * 5 + 2);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        else {
            var randomNum = Math.random();
            if (randomNum < 0.7) {
                this.attack = 6;
                this.attackCount = Math.floor(Math.random() * 3 + 2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            if (randomNum >= 0.7) {
                this.attack = 24;
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
        this.actionTips.updateTips();
    };
    /**怪物行动 */
    PryingTree.prototype.Action = function () {
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
        }
    };
    PryingTree.prototype.damaged = function (damageData) {
        _super.prototype.damaged.call(this, damageData);
    };
    /**怪物攻击玩家 */
    PryingTree.prototype.attackPlayer = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
            var a = Math.random();
            if (a < 0.5) {
                self.setCard();
            }
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    PryingTree.prototype.setCard = function () {
        // var self = this;
        // var posX:number = - 20;
        // var originX:number = 0;
        // egret.Tween.get(this.bodyImg).wait(300).to({x:posX},100,egret.Ease.backOut).call(function(){
        Message.instance.send(MsgCMD.SET_CARD, { setCardId: 8 });
        // }
        // ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
        //     self.Action();
        // })
    };
    return PryingTree;
}(BaseMonster));
__reflect(PryingTree.prototype, "PryingTree");
//# sourceMappingURL=PryingTree.js.map