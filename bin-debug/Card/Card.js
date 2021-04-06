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
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(data, show, isShop) {
        if (show === void 0) { show = false; }
        if (isShop === void 0) { isShop = false; }
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.cardEffect = []; //卡牌效果
        _this.oldIndex = 0;
        _this._type = 1; //0为指向牌，1为非指向牌
        _this.targetX = 0;
        _this.targetY = 0;
        _this.originRotation = 0;
        _this.originX = 0;
        _this.originY = 0;
        _this._isMove = false;
        _this._cardEffectType = 0; //0为攻击卡，1为效果卡
        _this.cardDetailLabel = null; //卡牌描述
        _this._isEffecting = false; //正在使用中
        _this._startAbandon = false; //是否在丢弃中
        _this._isSelect = false; //是否是在选牌阶段
        _this._effectTimes = 0; //卡牌作用次数
        _this.show = false; //是否是展示卡牌
        _this._isShop = false; //贩卖中
        _this.f = 0;
        _this.abandonX = 0;
        _this.abandonY = 0;
        _this.abandonP1X = 0;
        _this.abandonP1Y = 0;
        _this.abandonRotate = 0;
        if (data) {
            _this.data = data;
        }
        _this.show = show;
        _this._isShop = isShop;
        _this.skinName = "CardUiSkin";
        return _this;
    }
    Card.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.addEvent();
        this.setCardIcon();
        this.judgeIsShow();
    };
    Card.prototype.judgeIsShow = function () {
        if (this.show) {
            for (var i = 0; i < this.cardEffect.length; i++) {
                this.cardEffect[i].removeSelf();
                this.cardEffect.splice(i, 1);
                i--;
            }
        }
    };
    Card.prototype.setOriginRotation = function (value) {
        this.originRotation = value;
    };
    Object.defineProperty(Card.prototype, "cardData", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    Card.prototype.setCardIcon = function () {
        this.label_pp.text = this.data.pp + "";
        this.label_icon.text = this.data.name;
        switch (this.cardData.cardEffectType) {
            case 0:
                var text = "攻击";
                break;
            case 1:
                var text = "效果";
                break;
            case 2:
                var text = "能力";
                break;
        }
        this.label_cardEffectType.text = text;
        this.img_cardPortrait.source = this.cardData.imgPortrait;
        this.img_cardBox.source = "bottom_" + this.cardData.cardEffectType + "_png";
        if (this.cardData.getType > 1) {
            this.img_cardBg.source = "sp_cardBg_" + this.cardData.cardEffectType + "_png";
        }
        else {
            this.img_cardBg.source = "normal_cardBg_" + this.cardData.cardEffectType + "_png";
        }
        this.img_cardNameBg.source = "cardName_" + this.cardData.cardEffectType + "_png";
    };
    Card.prototype.initData = function () {
        egret.Tween.get(this.shader, { loop: true }).to({ alpha: 0.7 }, 800).to({ alpha: 1 }, 800);
        this.id = this.data.id;
        this.cardDetailLabel = new game.Label();
        this.addChild(this.cardDetailLabel);
        this.cardDetailLabel.x = 28;
        this.cardDetailLabel.y = 199;
        this.cardDetailLabel.width = 170;
        this.cardDetailLabel.height = 90;
        this.cardDetailLabel.size = 32;
        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;
        if (!this.show) {
            this.scaleX = this.scaleY = 0.1;
        }
        this._type = this.data.type;
        this.name = this.data.name;
        this._cardEffectType = this.data.cardEffectType;
        if (this.data.sp != "null") {
            var sp = this.data.sp.split(',');
            var spValue = this.data.spValue.split(',');
            if (sp[0] == "confrontationCard") {
                var confrontationCardData = {
                    sp: sp[0],
                    spValue: spValue[0]
                };
                var confrontationCard = new ConfrontationCardEffect(confrontationCardData, this);
                GlobalManager.Instance.addToLayer(confrontationCard, LayerType.scene);
                this.cardEffect.push(confrontationCard);
            }
        }
        if (this.data.buff != "null") {
            var buff = this.data.buff.split(',');
            var buffValue = this.data.buffValue.split(',');
            for (var i in buff) {
                if (buff[i] == "defense") {
                    var _data = {
                        defenseValue: buffValue[i]
                    };
                    var defenseEffect = new DefenseCardEffect(_data, this);
                    GlobalManager.Instance.addToLayer(defenseEffect, LayerType.scene);
                    this.cardEffect.push(defenseEffect);
                }
                else if (buff[i] == "nextPlusEnergy") {
                    var buffData = DataManager.Instance.getBuffDataByName(buff[i]);
                    buffData.value = parseInt(buffValue[i]);
                    var nextPlusEnergy = new NextRPECardEffect(buffData, this);
                    GlobalManager.Instance.addToLayer(nextPlusEnergy, LayerType.scene);
                    this.cardEffect.push(nextPlusEnergy);
                }
                else if (buff[i] == "ResultCardEffect") {
                    var bdata = {
                        buff: buff[i],
                        buffValue: buffValue[i]
                    };
                    var buffEffect2 = new ResultCardEffect(bdata, this);
                    GlobalManager.Instance.addToLayer(buffEffect2, LayerType.scene);
                    this.cardEffect.push(buffEffect2);
                }
                else {
                    var buffData = DataManager.Instance.getBuffDataByName(buff[i]);
                    buffData.value = parseInt(buffValue[i]);
                    var buffEffect = new BuffCardEffect(buffData, this);
                    GlobalManager.Instance.addToLayer(buffEffect, LayerType.scene);
                    this.cardEffect.push(buffEffect);
                }
            }
        }
        if (this.data.sp != "null") {
            var sp = this.data.sp.split(',');
            var spValue = this.data.spValue.split(',');
            for (var i in sp) {
                if (sp[i] == "jumpEnemyRound" || sp[i] == "jumpPlayerRound") {
                    var spData = {
                        sp: Sp[sp[i]],
                        spValue: spValue[i]
                    };
                    var spEffect = new JumpRoundCardEffect(spData, this);
                    GlobalManager.Instance.addToLayer(spEffect, LayerType.scene);
                    this.cardEffect.push(spEffect);
                }
                if (sp[i] == "drawCard" || sp[i] == "abandonCard") {
                    var spData1 = {
                        sp: Sp[sp[i]],
                        spValue: spValue[i]
                    };
                    var spEffect1 = new AbandonCardEffect(spData1, this);
                    GlobalManager.Instance.addToLayer(spEffect1, LayerType.scene);
                    this.cardEffect.push(spEffect1);
                }
                if (sp[i] == "consume") {
                    var noCardEffect = new NoCardEffect(this.data, this);
                    GlobalManager.Instance.addToLayer(noCardEffect, LayerType.scene);
                    this.cardEffect.push(noCardEffect);
                }
                if (sp[i] == "extra") {
                    var additionalCardEffect = new AdditionalCardEffect(this.data, this);
                    GlobalManager.Instance.addToLayer(additionalCardEffect, LayerType.scene);
                    this.cardEffect.push(additionalCardEffect);
                }
                if (sp[i] == "plusEnergy") {
                    var data = {
                        spValue: spValue[i]
                    };
                    var plusEnergy = new PlusEnergyCardEffect(data, this);
                    GlobalManager.Instance.addToLayer(plusEnergy, LayerType.scene);
                    this.cardEffect.push(plusEnergy);
                }
                if (sp[i] == "expends") {
                    var expendsCard = new ExpendsCardEffect(this.data, this);
                    GlobalManager.Instance.addToLayer(expendsCard, LayerType.scene);
                    this.cardEffect.push(expendsCard);
                }
                if (sp[i] == "selectionCard") {
                    var selectionCardEffect = new SelectionCardEffect(this.data, this);
                    GlobalManager.Instance.addToLayer(selectionCardEffect, LayerType.scene);
                    this.cardEffect.push(selectionCardEffect);
                }
                if (sp[i] == "heavyBlade") {
                    var HBladeCardEffect = new HeavyBladeCardEffect(this.data, this);
                    GlobalManager.Instance.addToLayer(HBladeCardEffect, LayerType.scene);
                    this.cardEffect.push(HBladeCardEffect);
                }
                if (sp[i] == "doubleEffect") {
                    var doubleHairCardEffect = new DoubleHairCardEffect(this.data, this);
                    GlobalManager.Instance.addToLayer(doubleHairCardEffect, LayerType.scene);
                    this.cardEffect.push(doubleHairCardEffect);
                }
            }
        }
        if (this.data.damageType != "null") {
            var damageEffect = new DamageCardEffect(this.data, this);
            GlobalManager.Instance.addToLayer(damageEffect, LayerType.scene);
            this.cardEffect.push(damageEffect);
        }
        this.setCardDetail();
    };
    //接收消息
    Card.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_POWER_CHANGE:
                // for(var i=0;i<this.cardEffect.length;i++)
                // {
                //     this.cardEffect[i].name == "DamageCardEffect";
                //     this.cardEffect[i].changeDamageValue({value:CharacterManager.Instance.player.powerUpValue});
                // }
                break;
        }
        if (data.setCardDetail) {
            this.setCardDetail();
        }
    };
    Card.prototype.setCardDetail = function () {
        while (this.cardDetailLabel.textFlow.length > 0) {
            this.cardDetailLabel.textFlow.splice(0, 1);
        }
        for (var i = 0; i < this.cardEffect.length; i++) {
            this.cardEffect[i].setCardDetail();
        }
    };
    /**设置卡牌描述 */
    Card.prototype.addCardDetail = function (text) {
        this.cardDetailLabel.addTextFlow(text, 0xffffff, 18, "Arial", false, 1, 2);
    };
    Card.prototype.addEvent = function () {
        if (!this.show) {
            this.addMessage(MsgCMD.PLAYER_POWER_CHANGE, this);
            this.addListener(this, egret.TouchEvent.TOUCH_END, this.touchCancelSelect, this);
            this.addListener(this, egret.TouchEvent.TOUCH_BEGIN, this.select, this);
        }
    };
    /**卡牌移动动画 */
    Card.prototype.moveAnim = function (targetX, targetY, targetRotation, changeTime) {
        this.touchEnabled = false;
        this.touchChildren = false;
        this.originRotation = targetRotation;
        this.originX = targetX;
        this.originY = targetY;
        egret.Tween.get(this).to({ x: targetX, y: targetY, rotation: targetRotation, scaleX: 0.6, scaleY: 0.6 }, changeTime, egret.Ease.circOut).call(this.resetTouch);
    };
    /**结束移动 */
    Card.prototype.resetTouch = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
    };
    /**卡牌选中 */
    Card.prototype.select = function () {
        if (!GameManager.Instance.canTouchCard) {
            return;
        }
        var oldSelectCard = GameManager.Instance.curSelectCard;
        if (oldSelectCard) {
            oldSelectCard.cancelSelect();
        }
        // this.oldIndex = this.parent.getChildIndex(this);
        this.parent.setChildIndex(this, 999);
        if (this._isSelect == true) {
            CardManager.Instance.handCard.push(this);
            var a = CardManager.Instance.handCard.indexOf(this);
            var index = CardManager.Instance.selectCard.indexOf(this);
            CardManager.Instance.selectCard.splice(index, 1);
            Message.instance.send(MsgCMD.CARD_UPDATE);
            GameManager.Instance.setCurSelectCard(null);
            return;
        }
        if (this._startAbandon) {
            this.abandonState();
        }
        else if (!this._startAbandon || SceneManager.Instance.getAbandonScene.card.length >= 2) {
            var posX = this.x;
            var posY = GameConst.stage.stageHeight - this.height * 0.5 * 0.8;
            egret.Tween.get(this).to({ x: posX, y: posY, scaleX: 0.8, scaleY: 0.8, rotation: 0, }, 80, egret.Ease.sineOut);
            GameManager.Instance.setCurSelectCard(this);
        }
        if (this._type == 0) {
        }
    };
    Card.prototype.abandonState = function () {
        var _self = this;
        var cardCount = CardManager.Instance.abandonCardCount;
        var posX = 0;
        var posY = 0;
        if (cardCount == 1) {
            posX = 650;
            posY = 160;
            if (SceneManager.Instance.getAbandonScene.card.length >= 1) {
                var card = SceneManager.Instance.getAbandonScene.card[0];
                posX = card.x;
                posY = card.y;
            }
        }
        else if (cardCount == 2) {
            if (SceneManager.Instance.getAbandonScene.card.length >= 2) {
                var card = SceneManager.Instance.getAbandonScene.card[0];
                posX = card.x;
                posY = card.y;
            }
            else if (SceneManager.Instance.getAbandonScene.card.length > 0) {
                posX = 800;
                posY = 160;
            }
            else {
                posX = 500;
                posY = 160;
            }
        }
        _self.touchEnabled = false;
        _self.touchChildren = false;
        egret.Tween.get(this).to({ x: posX, y: posY, rotation: 0 }, 200, egret.Ease.sineOut).call(this.cardToAbandonScene);
    };
    Card.prototype.cardToAbandonScene = function () {
        var _self = this;
        var cardCount = CardManager.Instance.abandonCardCount;
        if (SceneManager.Instance.getAbandonScene) {
            if (cardCount == 1) {
                _self.x = 650;
                _self.y = 160;
                if (SceneManager.Instance.getAbandonScene.card.length >= 1) {
                    var card = SceneManager.Instance.getAbandonScene.card[0];
                    var posx = card.x;
                    var posy = card.y;
                    card.moveAnim(card.originX, card.originY, card.originRotation, 300);
                    var cardArr = CardManager.Instance.handCard;
                    SceneManager.Instance.getAbandonScene.card.splice(0, 1);
                    cardArr.push(card);
                    card._startAbandon = true;
                    _self.x = posx;
                    _self.y = posy;
                }
            }
            else if (cardCount == 2) {
                if (SceneManager.Instance.getAbandonScene.card.length >= 2) {
                    var card = SceneManager.Instance.getAbandonScene.card[0];
                    var posx = card.x;
                    var posy = card.y;
                    card.moveAnim(card.originX, card.originY, card.originRotation, 300);
                    var cardArr = CardManager.Instance.handCard;
                    SceneManager.Instance.getAbandonScene.card.splice(0, 1);
                    cardArr.push(card);
                    card._startAbandon = true;
                    _self.x = posx;
                    _self.y = posy;
                }
                else if (SceneManager.Instance.getAbandonScene.card.length > 0) {
                    _self.x = 800;
                    _self.y = 160;
                }
                else {
                    _self.x = 500;
                    _self.y = 160;
                }
            }
            SceneManager.Instance.getAbandonScene.card.push(this);
            var cardArr = CardManager.Instance.handCard;
            cardArr.splice(cardArr.indexOf(this), 1);
            _self._startAbandon = false;
            cardArr.sort(function (a, b) { return a.originX - b.originX; });
            for (var i = 0; i < cardArr.length; i++) {
                cardArr[i].parent.setChildIndex(cardArr[i], 5 + i);
            }
            //CardManager.Instance.handCard.splice(CardManager.Instance.handCard.indexOf(this),1);
            //egret.log(CardManager.Instance.handCard)
        }
    };
    Card.prototype.touchCancelSelect = function (e) {
        if (e.stageY >= this.y) {
            this.cancelSelect();
        }
    };
    /**取消选中 */
    Card.prototype.cancelSelect = function () {
        if (this._isSelect == true) {
            return;
        }
        if (!GameManager.Instance.canTouchCard) {
            return;
        }
        var card = GameManager.Instance.curSelectCard;
        if (card == this) {
            this.touchEnabled = false;
            egret.Tween.get(this).to({ x: this.originX, y: this.originY, scaleX: 0.6, scaleY: 0.6, rotation: this.originRotation }, 80, egret.Ease.sineIn).call(setIndex);
            GameManager.Instance.setCurSelectCard(null);
        }
        function setIndex() {
            var cardArr = CardManager.Instance.handCard;
            cardArr.sort(function (a, b) { return a.originX - b.originX; });
            for (var i = 0; i < cardArr.length; i++) {
                cardArr[i].parent.setChildIndex(cardArr[i], 5 + i);
            }
            this.touchEnabled = true;
        }
    };
    /**卡牌开始执行效果 */
    Card.prototype.beginEffect = function (data) {
        if (this._isSelect == true) {
            return;
        }
        var self = this;
        var player = CharacterManager.Instance.player;
        GameManager.Instance.canTouchCard = false;
        if (GameManager.Instance.curPlayerPP >= this.data.pp) {
            for (var i = 0; i < player.getHaveBuff().length; i++) {
                if (player.getHaveBuff()[i].name == "Twining") {
                    if (this.cardEffecType == 0) {
                        TipsManager.Instance.createTips("攻击牌无法使用");
                        GameManager.Instance.canTouchCard = true;
                        this.cancelSelect();
                        return;
                    }
                }
            }
            if (this.data.damageType != "null" && CardManager.Instance.isDoubleEffect) {
                this._effectTimes = 2;
            }
            else {
                this._effectTimes = 1;
            }
            for (var j = 0; j < this._effectTimes; j++) {
                for (var i = 0; i < this.cardEffect.length; i++) {
                    if (this.cardEffect[0].name == "ConfrontationCardEffect") {
                        //egret.log(":thrthy")
                        if (!this.cardEffect[0].useCardEffect(data.character)) {
                            TipsManager.Instance.createTips("无法打出");
                            GameManager.Instance.canTouchCard = true;
                            this.cancelSelect();
                            return;
                        }
                    }
                    // else
                    // {
                    //     this.cardEffect[i].useCardEffect(data.character);
                    // }
                    this.cardEffect[i].useCardEffect(data.character);
                }
                if (CardManager.Instance.isDoubleEffect && self.data.damageType != "null") {
                    CardManager.Instance.isDoubleEffect = false;
                }
            }
            var spArr = this.data.sp.split(',');
            // if(spArr.indexOf("confrontationCard")<0)
            // {
            if (spArr.indexOf("expends") >= 0) {
                egret.Tween.get(this).to({ x: 640, y: 360, scaleX: 0.8, scaleY: 0.8, rotation: 0 }, 300, egret.Ease.sineOut).to({ alpha: 0 }, 650, egret.Ease.quartOut).call(this.remove);
            }
            else {
                egret.Tween.get(this).to({ x: 640, y: 360, scaleX: 0.8, scaleY: 0.8, rotation: 0 }, 300, egret.Ease.sineOut).to({}, 150).call(this.abandonCard);
            }
            var player = CharacterManager.Instance.player;
            var monsterArr = CharacterManager.Instance.monsterArr;
            for (var i = 0; i < monsterArr.length; i++) {
                for (var j = 0; j < monsterArr[i].getHaveBuff().length; j++) {
                    if (monsterArr[i].getHaveBuff()[j].name == "damageAdd") {
                        monsterArr[i].attackTimes += 0.1;
                        monsterArr[i].getHaveBuff()[j].roundCount++;
                    }
                }
            }
            // }
            Message.instance.send(MsgCMD.CARD_USE, this.data);
            GameManager.Instance.setCurSelectCard(null);
        }
        else {
            TipsManager.Instance.createTips("PP不足");
            GameManager.Instance.canTouchCard = true;
            this.cancelSelect();
        }
    };
    /**卡牌使用一次后删除卡牌 */
    Card.prototype.remove = function () {
        GameManager.Instance.canTouchCard = true;
        var _index = CardManager.Instance.handCard.indexOf(this);
        CardManager.Instance.handCard.splice(_index, 1);
        this.parent.removeChild(this);
        Message.instance.send(MsgCMD.CARD_ABANDON, { updateDiscardGroup: false });
    };
    /**丢弃卡牌 */
    Card.prototype.abandonCard = function () {
        this.touchEnabled = false;
        this.touchChildren = false;
        //var spArr = this.data.sp.split(',');
        // if(spArr.indexOf("expends")>=0)
        // {
        //     egret.Tween.get(this).to({x:640,y:360,scaleX:0.8,scaleY:0.8,rotation:0},300,egret.Ease.sineOut).to({alpha:0},300).call(this.remove);
        //     return;
        // }
        this.abandonX = this.x;
        this.abandonY = this.y;
        this.abandonP1X = this.x - Math.floor(Math.random() * (240) + 160);
        this.abandonP1Y = this.y - Math.floor(Math.random() * (360) + 160);
        var kx = 1170 - this.x;
        var ky = 590 - this.y;
        var k = ky / kx;
        var radius = Math.atan(k);
        this.abandonRotate = radius * 180 / Math.PI + 90;
        var _index = CardManager.Instance.handCard.indexOf(this);
        if (_index >= 0) {
            CardManager.Instance.handCard.splice(_index, 1);
        }
        egret.Tween.get(this, { onChange: this.move, onChangeObj: this }).to({ scaleX: 0.1, scaleY: 0.1, f: 1 }, 500, egret.Ease.sineIn).call(this.cardToDiscard);
    };
    /**卡牌的丢弃移动 */
    Card.prototype.move = function () {
        if (this.f <= 1) {
            this.rotation = this.abandonRotate * this.f;
            this.f += 0.05;
            this.x = (1 - this.f) * (1 - this.f) * this.abandonX + 2 * this.f * (1 - this.f) * this.abandonP1X + this.f * this.f * 1170;
            this.y = (1 - this.f) * (1 - this.f) * this.abandonY + 2 * this.f * (1 - this.f) * this.abandonP1Y + this.f * this.f * 590;
        }
    };
    /**卡牌到了弃牌堆 */
    Card.prototype.cardToDiscard = function () {
        GameManager.Instance.canTouchCard = true;
        CardManager.Instance.cardArr_discardId.push(this.id);
        this.parent.removeChild(this);
        Message.instance.send(MsgCMD.CARD_ABANDON, { updateDiscardGroup: true });
    };
    Object.defineProperty(Card.prototype, "isEffecting", {
        get: function () {
            return this._isEffecting;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "cardEffecType", {
        get: function () {
            return this._cardEffectType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "startAbandon", {
        get: function () {
            return this._startAbandon;
        },
        set: function (value) {
            this._startAbandon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "isSelect", {
        get: function () {
            return this._isSelect;
        },
        set: function (value) {
            this._isSelect = value;
        },
        enumerable: true,
        configurable: true
    });
    Card.prototype.getOriginX = function () {
        return this.originX;
    };
    Card.prototype.getOriginY = function () {
        return this.originY;
    };
    return Card;
}(BaseModule));
__reflect(Card.prototype, "Card");
//# sourceMappingURL=Card.js.map