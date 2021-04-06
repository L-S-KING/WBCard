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
 * 六火亡魂（boss）
 */
var FireGhost = (function (_super) {
    __extends(FireGhost, _super);
    function FireGhost(data) {
        var _this = _super.call(this, data) || this;
        _this.fireCount = 0; //身上的火团数
        _this.fireArr = []; //火团的资源
        _this.isHit = false; //是不是刚打完
        _this.name = egret.getQualifiedClassName(FireGhost);
        return _this;
    }
    FireGhost.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.health = 300;
        this.data.imgSource = "fireGhost_body_png";
        this.damageVfx = "fire_vfx_png";
        this.monsterLevel = 3;
    };
    FireGhost.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    FireGhost.prototype.init = function () {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        var posY = 20;
        var originY = 0;
        egret.Tween.get(this.bodyImg, { loop: true }).to({ y: posY }, 1000).to({ y: originY }, 1000);
        this.randomNextAction();
    };
    /**随机下一步动作 */
    FireGhost.prototype.randomNextAction = function () {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = this.monsterAliveRound;
        if (roundCount == 0) {
            this.actionStateArr.push(MonsterActionState.debuff);
        }
        else if (roundCount == 1) {
            this.actionStateArr.push(MonsterActionState.defense);
        }
        else if (roundCount == 2) {
            if (this.fireCount >= 6) {
                this.attack = Math.floor(Math.random() * 10 + 40);
                this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
        else if (roundCount > 2) {
            if (this.fireCount < 6) {
                if (!this.isHit) {
                    this.creatFire(1);
                }
                if (this.fireCount >= 6) {
                    this.attack = Math.floor(Math.random() * 10 + 40);
                    this.attackCount = 1;
                    this.actionStateArr.push(MonsterActionState.attack);
                    this.actionTips.updateTips();
                    return;
                }
                this.nextAction();
                this.isHit = false;
            }
        }
        this.actionTips.updateTips();
    };
    /**行动 */
    FireGhost.prototype.Action = function () {
        var self = this;
        var roundCount = this.monsterAliveRound;
        if (this.actionIndex >= this.actionStateArr.length) {
            egret.Tween.get(this).wait(600).call(function () {
                self.changeState(CharacterState.EndRound);
            });
            return;
        }
        if (roundCount == 2) {
            this.creatFire(6);
        }
        switch (this.actionStateArr[this.actionIndex]) {
            case MonsterActionState.buffPlus:
                this.actionIndex++;
                this.addPowerPlus();
                break;
            case MonsterActionState.defense:
                this.actionIndex++;
                this.defense();
                break;
            case MonsterActionState.NoCard:
                this.actionIndex++;
                this.setCard();
                break;
            case MonsterActionState.attack:
                this.actionIndex++;
                this.attackPlayer();
                break;
            case MonsterActionState.Sleep:
                this.actionIndex++;
                this.Action();
                break;
            case MonsterActionState.debuff:
                this.actionIndex++;
                this.debuffPlayer();
                break;
        }
    };
    /**生成火团 */
    FireGhost.prototype.creatFire = function (count) {
        var radius = 240;
        for (var i = 0; i < count; i++) {
            var radiusAngle = this.fireCount * 60 / 180 * Math.PI;
            var fire = new Fire();
            this.addChild(fire);
            fire.x = -Math.sin(radiusAngle) * radius;
            fire.y = 64 - (this.bodyImg.height * 0.5 + Math.cos(radiusAngle) * radius);
            this.fireArr.push(fire);
            this.fireCount++;
        }
    };
    /**消耗火团 */
    FireGhost.prototype.useFire = function () {
        for (var i = 0; i < this.fireArr.length; i++) {
            if (this.fireArr[i].parent && this.fireArr[i].parent.contains(this.fireArr[i])) {
                egret.Tween.removeTweens(this.fireArr[i]);
                this.fireArr[i].parent.removeChild(this.fireArr[i]);
                this.fireArr.splice(i, 1);
                i--;
                this.fireCount--;
            }
        }
    };
    /**添加废卡 */
    FireGhost.prototype.setCard = function () {
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            Message.instance.send(MsgCMD.SET_CARD, { setCardId: 8 });
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    /**攻击 */
    FireGhost.prototype.attackPlayer = function () {
        //消耗火团
        if (this.fireCount >= 6) {
            this.useFire();
            this.isHit = true;
        }
        var self = this;
        var posX = -20;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).call(function () {
            self.damagePlayer();
        }).to({ x: originX }, 100, egret.Ease.sineOut).wait(1000).call(function () {
            self.Action();
        });
    };
    /**不处于积满火球，随机下一次状态 */
    FireGhost.prototype.nextAction = function () {
        var random = Math.random();
        if (random <= 0.40) {
            this.actionStateArr.push(MonsterActionState.defense);
        }
        else if (random <= 0.60) {
            this.actionStateArr.push(MonsterActionState.NoCard);
        }
        else if (random <= 0.80) {
            this.actionStateArr.push(MonsterActionState.buffPlus);
        }
        else {
            this.attack = Math.floor(Math.random() * 6 + 5);
            this.attackCount = Math.floor(Math.random() * 2 + 2);
            this.actionStateArr.push(MonsterActionState.attack);
        }
    };
    /**格挡 */
    FireGhost.prototype.defense = function () {
        var self = this;
        var value = Math.floor(Math.random() * 5 + 20);
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuffTips("格挡增加", 1);
            self.changeDefense(value);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    /**强化力量 */
    FireGhost.prototype.addPowerPlus = function () {
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
        egret.Tween.get(this).wait(200).call(function () {
            self.addBuff(_data);
        }).to({}, 300).call(function () {
            self.Action();
        });
    };
    /**移除 */
    FireGhost.prototype.removeSelf = function () {
        _super.prototype.removeSelf.call(this);
        this.useFire();
    };
    return FireGhost;
}(BaseMonster));
__reflect(FireGhost.prototype, "FireGhost");
//# sourceMappingURL=FireGhost.js.map