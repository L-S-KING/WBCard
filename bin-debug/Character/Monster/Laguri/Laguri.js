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
 * 拉古瑞（精英）
 */
var Laguri = (function (_super) {
    __extends(Laguri, _super);
    function Laguri(data) {
        var _this = _super.call(this) || this;
        if (data) {
            _this.data = data;
        }
        return _this;
    }
    Laguri.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    Laguri.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this.data.health > 0) {
            this.health = this.data.health;
        }
        else {
            this.health = 200;
        }
        this.data.imgSource = "Laguri_sleep_png";
        this.damageVfx = "Laguri_vfx_png";
        this.monsterLevel = 2;
    };
    Laguri.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.addSleep();
        this.changeDefense(15);
        var data = DataManager.Instance.getBuffDataByName("multipleDefense");
        var _data = {
            name: data.name,
            detailName: data.detailName,
            type: data.type,
            detail: data.detail,
            img: data.img,
            value: 10,
            gainType: data.gainType
        };
        this.addBuff(_data);
        var data1 = DataManager.Instance.getBuffDataByName("reserveDefense");
        this.addBuff(data1);
        egret.Tween.get(this.bodyImg, { loop: true }).to({ scaleY: 0.95 }, 400).to({ scaleY: 1 }, 400);
    };
    /**随机下一步动作 */
    Laguri.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        this.actionStateArr.push(MonsterActionState.attack);
        this.attack = Math.floor(Math.random() * 7 + 8);
        this.attackCount = Math.floor(Math.random() * 2 + 2);
        this.actionTips.updateTips();
    };
    /**添加眩晕效果 */
    Laguri.prototype.addDizziness = function () {
        var self = this;
        egret.Tween.get(this.bodyImg).to({ skewX: -25, scaleY: 1.3 }, 300).call(function () {
            self.bodyImg.texture = RES.getRes("Laguri_normal_png");
            self.bodyImg.anchorOffsetX = self.bodyImg.width >> 1;
            self.bodyImg.anchorOffsetY = self.bodyImg.height;
            self.bodyImg.skewX = 0;
            self.bodyImg.scaleY = 0;
            self.actionTips.changePos();
            self.removeAllBuff();
        });
        _super.prototype.addDizziness.call(this);
    };
    Laguri.prototype.changeNormal = function () {
        var self = this;
        egret.Tween.get(this.bodyImg).to({ skewX: -25, scaleY: 1.3 }, 300).call(function () {
            self.bodyImg.texture = RES.getRes("Laguri_normal_png");
            self.bodyImg.anchorOffsetX = self.bodyImg.width >> 1;
            self.bodyImg.anchorOffsetY = self.bodyImg.height;
            self.bodyImg.skewX = 0;
            self.bodyImg.scaleY = 0;
            self.actionTips.changePos();
            self.removeAllBuff();
            self.Action();
        });
    };
    /**怪物行动 */
    Laguri.prototype.Action = function () {
        var self = this;
        if (this.actionIndex >= this.actionStateArr.length) {
            egret.Tween.get(this).wait(600).call(function () {
                self.changeState(CharacterState.EndRound);
            });
            return;
        }
        if (this.monsterAliveRound == 11) {
            this.actionIndex++;
            this.changeNormal();
            return;
        }
        switch (this.actionStateArr[this.actionIndex]) {
            case MonsterActionState.attack:
                this.actionIndex++;
                this.addBuffTips("攻击！", 0);
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
            case MonsterActionState.Dizziness:
                this.actionIndex++;
                this.actionDizziness();
                break;
            case MonsterActionState.Sleep:
                this.actionSleep();
                break;
        }
    };
    return Laguri;
}(BaseMonster));
__reflect(Laguri.prototype, "Laguri");
//# sourceMappingURL=Laguri.js.map