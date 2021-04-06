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
var HealthCompnent = (function (_super) {
    __extends(HealthCompnent, _super);
    function HealthCompnent(data, owner) {
        var _this = _super.call(this) || this;
        _this._maxHealth = 0;
        _this._curHealth = 0;
        _this._curDefense = 0; //当前的格挡值
        _this.owner = null;
        _this.originX = 0;
        _this.originY = 0;
        _this._isCutHp = false;
        if (data) {
            _this.data = data;
        }
        if (owner) {
            _this.owner = owner;
        }
        _this.skinName = "HealthCompnentSkin";
        return _this;
    }
    HealthCompnent.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.addEvent();
    };
    HealthCompnent.prototype.initData = function () {
        this.defense_group.visible = false;
        this.blood_label = this.blood_bar.getChildByName("blood_lable");
        // var glowFilter:egret.GlowFilter = new egret.GlowFilter(0xff0000,0.8,8,8,2,egret.BitmapFilterQuality.LOW,false,false)
        // //this.filters = [glowFilter];
        // this.blood_label.filters = [glowFilter];
        this.blood_label.strokeColor = 0xff0000;
        this.blood_label.stroke = 2;
        this.setOriginHealth(this.data.health);
        this.width = this.data.width;
        this.blood_bar.width = this.data.width;
        this.x = this.originX = this.data.x;
        this.y = this.originY = this.data.y;
        this.anchorOffsetX = this.blood_bar.width * 0.5 + this.blood_bar.x;
        this.anchorOffsetY = this.height >> 1;
    };
    Object.defineProperty(HealthCompnent.prototype, "curDefense", {
        get: function () {
            return this._curDefense;
        },
        set: function (value) {
            this._curDefense = value;
            this.updateDefenseUi();
        },
        enumerable: true,
        configurable: true
    });
    //更新格挡ui
    HealthCompnent.prototype.updateDefenseUi = function () {
        if (this._curDefense <= 0) {
            this.defense_group.visible = false;
        }
        else {
            this.defense_group.visible = true;
            this.defense_group.scaleX = this.defense_group.scaleY = 0.8;
            this.defense_label.text = this._curDefense + "";
            egret.Tween.get(this.defense_group).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.sineInOut);
        }
    };
    HealthCompnent.prototype.setOriginHealth = function (value) {
        if (this.owner.type == 0) {
            this._maxHealth = GameManager.Instance.maxHealth;
            this._curHealth = GameManager.Instance.curHealth;
        }
        else {
            this._maxHealth = this._curHealth = value;
        }
        this.blood_bar.maximum = this._maxHealth;
    };
    HealthCompnent.prototype.addEvent = function () {
        this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
    };
    HealthCompnent.prototype.update = function () {
        this.blood_bar.value = this._curHealth;
    };
    Object.defineProperty(HealthCompnent.prototype, "curHealth", {
        get: function () {
            return this._curHealth;
        },
        set: function (value) {
            if (value > this._curHealth) {
                this.owner.addBuffTips("治愈", 1);
            }
            if (value >= this.maxHealth) {
                this._curHealth = this.maxHealth;
            }
            else {
                this._curHealth = value;
            }
            if (this._curHealth <= 0) {
                if (!this.owner.isDead)
                    this.owner.dead();
            }
            if (this.owner.type == 0)
                GameManager.Instance.curHealth = this._curHealth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HealthCompnent.prototype, "maxHealth", {
        get: function () {
            return this._maxHealth;
        },
        set: function (value) {
            var changeValue = 0;
            changeValue = value - this._maxHealth;
            this._maxHealth = value;
            this.curHealth += changeValue;
            this.blood_bar.maximum = this._maxHealth;
            this.blood_bar.value = this.curHealth;
            if (this.owner.type == 0)
                GameManager.Instance.maxHealth = this._maxHealth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HealthCompnent.prototype, "isCutHp", {
        get: function () {
            return this._isCutHp;
        },
        set: function (isCutHp) {
            this._isCutHp = isCutHp;
        },
        enumerable: true,
        configurable: true
    });
    HealthCompnent.prototype.changeCurHealth = function (damageData) {
        var value = damageData.damageValue;
        if (value < 0) {
            Message.instance.send(MsgCMD.SHAKE_VIEWPORT, { dis: 5, count: Math.floor(Math.random() * 3 + 1) });
        }
        if (this._curDefense > 0) {
            this.owner.addBuffTips("格挡", 2);
            var _data = {
                x: this.owner.x + Math.random() * 30 - 15,
                y: this.owner.y - this.owner.body.height * 0.5 + Math.random() * 30 - 15,
                type: 0,
                img: "10_png"
            };
            UtilManager.Instance.createVfx(_data, 0);
            var damageValue = this._curDefense + value;
            this._curDefense += value;
            if (this._curDefense <= 0) {
                this._curDefense = 0;
            }
            this.updateDefenseUi();
            if (damageValue < 0) {
                this.curHealth += damageValue;
                var data = {
                    type: 0,
                    value: Math.abs(damageValue),
                    x: this.owner.x + Math.floor(Math.random() * 60 - 30),
                    y: this.owner.y + Math.floor(Math.random() * 40 - 20)
                };
                TipsManager.Instance.createViewNumber(data);
                this._isCutHp = true;
            }
        }
        else {
            this.curHealth += value;
            var data = {
                type: 0,
                value: Math.abs(value),
                x: this.owner.x + Math.floor(Math.random() * 60 - 30),
                y: this.owner.y + Math.floor(Math.random() * 40 - 20)
            };
            TipsManager.Instance.createViewNumber(data);
            this._isCutHp = true;
        }
    };
    HealthCompnent.prototype.changeMaxHealth = function (value) {
        if (value < 0) {
            this.maxHealth += value;
            if (this.curHealth > this.maxHealth) {
                this.curHealth = this.maxHealth;
            }
        }
        else {
            this.maxHealth += value;
        }
    };
    return HealthCompnent;
}(BaseModule));
__reflect(HealthCompnent.prototype, "HealthCompnent");
//# sourceMappingURL=HealthCompnent.js.map