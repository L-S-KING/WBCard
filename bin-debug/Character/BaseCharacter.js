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
var CharacterState;
(function (CharacterState) {
    CharacterState[CharacterState["Default"] = 0] = "Default";
    CharacterState[CharacterState["Attack"] = 1] = "Attack";
    CharacterState[CharacterState["WaitRound"] = 2] = "WaitRound";
    CharacterState[CharacterState["EndRound"] = 3] = "EndRound";
})(CharacterState || (CharacterState = {}));
var BaseCharacter = (function (_super) {
    __extends(BaseCharacter, _super);
    function BaseCharacter(data) {
        var _this = _super.call(this) || this;
        _this._isDead = false;
        _this.healthC = null;
        _this.health = 0;
        _this.bodyImg = null;
        _this.haveBuff = []; //拥有的buff列表
        _this.immunityBuffName = []; //免疫的buff列表
        _this.attack = 0; //攻击力
        _this._powerUpValue = 0; //增加的攻击力
        _this.originX = 0;
        _this.originY = 0;
        _this._defense = 0; //
        _this._type = 0; //0为玩家，1为怪物
        _this._damageTimes = 1; //受伤倍数
        _this._attackTimes = 1; //伤害倍数
        _this._reserveDefense = false; //回合开始是否保留格挡数
        _this._state = CharacterState.Default;
        //选择框
        _this.choseBox = null;
        _this.redColor = [
            1, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        _this.colorFlilter = new egret.ColorMatrixFilter(_this.redColor); //受伤滤镜
        _this.fliterTime = 0;
        _this.fliterDestroyTime = 10;
        _this.buffTipArr = [];
        _this.spBuffArr = [ResultDamageBuff, ResultRandomDamageBuff, ResultDefenseBuff, ResultDrawCardBuff];
        _this.buffScene = null;
        if (data) {
            _this.data = data;
        }
        return _this;
    }
    BaseCharacter.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setBodyImg();
        this.addHealthCompnent();
        this.addEvent();
    };
    BaseCharacter.prototype.initData = function () {
        if (this.data) {
            //设置生命值
            //this.health = this.data.health;
            //this.name = this.data.name;
            this.originX = this.data.originX;
            this.originY = this.data.originY;
            this.touchEnabled = true;
            this.x = this.originX;
            this.y = this.originY;
        }
    };
    BaseCharacter.prototype.setBodyImg = function () {
        if (this.data) {
            var texture = RES.getRes(this.data.imgSource);
            if (texture) {
                this.bodyImg = new egret.Bitmap();
                this.bodyImg.texture = texture;
                this.addChild(this.bodyImg);
                this.bodyImg.anchorOffsetX = this.bodyImg.texture.textureWidth >> 1;
                this.bodyImg.anchorOffsetY = this.bodyImg.texture.textureHeight;
                this.bodyImg.touchEnabled = true;
            }
            else {
                //egret.error("人物body图片资源读取失败")
            }
        }
    };
    BaseCharacter.prototype.addBuffTips = function (text, type) {
        // if(this.buffTipArr.length>0)
        // {
        //     for(var i=0;i<this.buffTipArr.length;i++)
        //     {
        //         this.buffTipArr[i].y = this.buffTipArr[i].y - 50;
        //     }
        // }
        var tipData = {
            x: this.x,
            y: this.y - this.bodyImg.height * 0.5 - 40,
            text: text,
            type: type
        };
        if (type == 2) {
            tipData.y = this.y - 40;
        }
        var tips = new BuffTips(tipData, this);
        // this.buffTipArr.push(tips);
        if (type == 0 || type == 2) {
            GlobalManager.Instance.addToLayer(tips, LayerType.scene);
        }
        else if (type == 1) {
            GlobalManager.Instance.addToLayer(tips, LayerType.tips);
        }
    };
    BaseCharacter.prototype.removeBuffTips = function (tips) {
        var index = this.buffTipArr.indexOf(tips);
        this.buffTipArr.splice(index, 1);
        GlobalManager.Instance.removeObjFromLayer(tips, LayerType.scene);
    };
    BaseCharacter.prototype.addBuffTipsImage = function (texture) {
        var data = {
            x: this.x,
            y: this.y - this.bodyImg.height * 0.5,
            img: texture
        };
        var buffTipsImage = new BuffTipsImage(data);
        GlobalManager.Instance.addToLayer(buffTipsImage, LayerType.scene);
    };
    BaseCharacter.prototype.addBuff = function (data, spBuffCardType) {
        if (this.immunityBuffName.indexOf(data.name) >= 0) {
            this.addBuffTips(data.detailName + "免疫", 0);
            return;
        }
        this.addBuffTips(data.detailName, 0);
        this.addBuffTipsImage(data.img);
        for (var i = 0; i < this.haveBuff.length; i++) {
            if (data.name != "boom" && data.name != "roundPowerUp" && data.name == this.haveBuff[i].name && data.type < 1) {
                this.haveBuff[i].roundCount += data.value;
                return;
            }
        }
        if (data.name == "nextPlusEnergy") {
            var buff = new NextRPlusEnergyBuff(data, this);
            this.healthC.addChild(buff);
            buff.y = 40;
            buff.x = 40 + this.haveBuff.length * 40;
            this.haveBuff.push(buff);
        }
        else if (data.type == 0) {
            var _buff = new BaseBuff(data, this);
            this.healthC.addChild(_buff);
            _buff.y = 40;
            _buff.x = 40 + this.haveBuff.length * 40;
            this.haveBuff.push(_buff);
        }
        else {
            var index = data.type - 1;
            var className = this.spBuffArr[index];
            var buff1 = new className(data, this, spBuffCardType);
            this.healthC.addChild(buff1);
            buff1.y = 40;
            buff1.x = 40 + this.haveBuff.length * 40;
            this.haveBuff.push(buff1);
        }
    };
    /**移除buff */
    BaseCharacter.prototype.removeBuff = function (buff) {
        var index = this.haveBuff.indexOf(buff);
        this.haveBuff.splice(index, 1);
        if (buff && buff.parent.contains(buff)) {
            buff.parent.removeChild(buff);
        }
        for (var i = 0; i < this.haveBuff.length; i++) {
            if (i >= index) {
                //buff.y = 40+Math.floor(this.haveBuff.length/4)*40;
                this.haveBuff[i].x = 40 + i * 40;
                this.haveBuff[i].y = 40;
            }
        }
    };
    BaseCharacter.prototype.removeAllBuff = function () {
        for (var i = 0; i < this.haveBuff.length; i++) {
            this.haveBuff[i].removeSelf();
            this.haveBuff.splice(i, 1);
            i--;
        }
    };
    /**根据增益类型删除buff，0为增益，1为负面buff，2为其他 */
    BaseCharacter.prototype.removeBuffByGainType = function (gainType) {
        for (var i = 0; i < this.haveBuff.length; i++) {
            if (this.haveBuff[i].gainType == gainType) {
                this.haveBuff[i].removeSelf();
                this.haveBuff.splice(i, 1);
                i--;
            }
        }
    };
    /**被选中 */
    BaseCharacter.prototype.selected = function () {
        //this.filters = [new egret.GlowFilter(0xffffff,0.8,8,8,2,egret.BitmapFilterQuality.LOW,false,false)]
        //添加选框
        if (!this.choseBox) {
            this.choseBox = new ChoseBox(this);
            GlobalManager.Instance.addToLayer(this.choseBox, LayerType.effect);
        }
    };
    BaseCharacter.prototype.canselSelected = function () {
        this.filters = null;
        //移除选框
        if (this.choseBox) {
            this.choseBox.parent.removeChild(this.choseBox);
            this.choseBox = null;
        }
    };
    Object.defineProperty(BaseCharacter.prototype, "reserveDefense", {
        get: function () {
            return this._reserveDefense;
        },
        set: function (value) {
            this._reserveDefense = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCharacter.prototype, "attackValue", {
        get: function () {
            return this.attack;
        },
        set: function (value) {
            this.attack = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCharacter.prototype, "powerUpValue", {
        get: function () {
            return this._powerUpValue;
        },
        set: function (value) {
            this._powerUpValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCharacter.prototype, "body", {
        get: function () {
            return this.bodyImg;
        },
        enumerable: true,
        configurable: true
    });
    BaseCharacter.prototype.changeDefense = function (value) {
        if (this.certainHasBuff("destroyArmor")) {
            value = Math.floor(value * 0.75);
        }
        if (value > 0) {
            this.addBuffTipsImage("defense_img_png");
        }
        this.healthC.curDefense += value;
    };
    /**确定目标身上的Buff */
    BaseCharacter.prototype.certainHasBuff = function (name) {
        for (var i = 0; i < this.haveBuff.length; i++) {
            if (this.haveBuff[i].name == name) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    BaseCharacter.prototype.addHealthCompnent = function () {
        var _data = {
            x: 0,
            y: 60,
            width: this.bodyImg.width + 40,
            health: this.health
        };
        this.healthC = new HealthCompnent(_data, this);
        this.addChild(this.healthC);
    };
    BaseCharacter.prototype.changeCurHealth = function (value) {
        this.healthC.curHealth += value;
    };
    BaseCharacter.prototype.changeMaxHealth = function (value) {
        this.healthC.maxHealth += value;
    };
    BaseCharacter.prototype.changeState = function (state) {
    };
    Object.defineProperty(BaseCharacter.prototype, "healthCom", {
        get: function () {
            return this.healthC;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCharacter.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCharacter.prototype, "type", {
        /**type:0玩家，1怪物 */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCharacter.prototype, "damageTimes", {
        get: function () {
            return this._damageTimes;
        },
        set: function (value) {
            this._damageTimes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCharacter.prototype, "attackTimes", {
        get: function () {
            return this._attackTimes;
        },
        set: function (value) {
            this._attackTimes = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseCharacter.prototype.damaged = function (damageData) {
        if (damageData.damageEffect) {
            var _data = {
                x: this.x,
                y: this.y - this.bodyImg.height * 0.5,
                type: 0,
                img: damageData.damageEffect
            };
            UtilManager.Instance.createVfx(_data);
        }
        var damageValue = Math.floor(damageData.damageValue * this._damageTimes);
        var _damageData = new DamageData();
        _damageData.damageType = damageData.damageType;
        _damageData.damageValue = -damageValue;
        _damageData.damageEffect = damageData.damageEffect;
        this.healthC.changeCurHealth(_damageData);
        if (this.bodyImg.filters == null) {
            this.bodyImg.filters = [this.colorFlilter];
        }
        if (this._type == 0) {
            if (this.healthC.isCutHp) {
                Message.instance.send(MsgCMD.PLAYER_UNDERATTACK);
                this.healthC.isCutHp = false;
            }
        }
    };
    BaseCharacter.prototype.dead = function () {
    };
    BaseCharacter.prototype.getimmunityBuffName = function () {
        return this.immunityBuffName;
    };
    BaseCharacter.prototype.getHaveBuff = function () {
        return this.haveBuff;
    };
    BaseCharacter.prototype.addEvent = function () {
        // this.addListener(this.bodyImg,mouse.MouseEvent.MOUSE_OVER,this.selected,this);
        // this.addListener(this.bodyImg,mouse.MouseEvent.MOUSE_OUT,this.canselSelected,this);
        //this.addListener(this.bodyImg,egret.TouchEvent.TOUCH_END,this.canselSelected,this);
        this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
        this.addListener(this, egret.TouchEvent.TOUCH_BEGIN, this.addBuffScene, this);
        this.addListener(GameConst.stage, egret.TouchEvent.TOUCH_END, this.removeBuffScene, this);
    };
    BaseCharacter.prototype.update = function () {
        if (this.bodyImg.filters != null) {
            this.fliterTime++;
            if (this.fliterTime % this.fliterDestroyTime == 0) {
                this.bodyImg.filters = null;
                this.fliterTime = 0;
            }
        }
    };
    /**卡牌攻击角色 */
    BaseCharacter.prototype.cardAttackCaracter = function () {
        var card = GameManager.Instance.curSelectCard;
        if (card) {
            card.beginEffect({ character: this });
        }
    };
    Object.defineProperty(BaseCharacter.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    BaseCharacter.prototype.addBuffScene = function (e) {
        // if(Math.abs(e.stageX - this.x)<=this.bodyImg.width*0.5 && Math.abs(e.stageY - (this.y-this.bodyImg.height*0.5))<=this.bodyImg.height*0.5)
        // {
        if (this.haveBuff.length > 0) {
            this.buffScene = new BuffScene(this);
            this.buffScene.x = this.x - (this.bodyImg.width >> 1) - 120;
            this.buffScene.y = this.y - (this.bodyImg.height * 0.8);
            GlobalManager.Instance.addToLayer(this.buffScene, LayerType.ui);
        }
        // }
    };
    BaseCharacter.prototype.removeBuffScene = function () {
        if (this.buffScene && this.buffScene.parent) {
            if (this.buffScene.parent.contains(this.buffScene))
                this.buffScene.parent.removeChild(this.buffScene);
        }
        else {
            ;
        }
    };
    BaseCharacter.prototype.removeSelf = function () {
        this.removeBuffScene();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return BaseCharacter;
}(BaseSprite));
__reflect(BaseCharacter.prototype, "BaseCharacter");
//# sourceMappingURL=BaseCharacter.js.map