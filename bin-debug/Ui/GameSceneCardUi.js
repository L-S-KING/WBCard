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
var GameSceneCardUi = (function (_super) {
    __extends(GameSceneCardUi, _super);
    function GameSceneCardUi() {
        var _this = _super.call(this) || this;
        _this.holdCardCount = 0; //牌组卡牌数量
        _this.discardCount = 0; //弃牌堆卡牌数量
        _this.drawCardTimer = null; //抽取卡牌计时器
        _this.isBeginDrawCard = false; //是否是第一回合抽牌
        _this.skipStart = false;
        _this.extraDraw = false;
        _this.curCount = 0;
        _this.curAngle = 0;
        _this.angle = 6;
        _this.handCardCount = 0;
        _this.offsetX = 3;
        _this.offsetY = 10;
        _this.bgRect = null;
        _this.name = egret.getQualifiedClassName(GameSceneCardUi);
        _this.skinName = "GameSceneCardUiSkin";
        return _this;
    }
    GameSceneCardUi.prototype.initData = function () {
        var arrow = new Arrow();
        this.top_group.addChild(arrow);
        this.group_holdCard.scaleX = this.group_holdCard.scaleY = 0.6;
        this.group_discard.scaleX = this.group_discard.scaleY = 0.6;
        // var posY1:number = this.group_holdCard.y-40;
        // var originY1:number = this.group_holdCard.y;
        // egret.Tween.get(this.group_holdCard,{loop:true}).to({y:posY1},300).to({y:originY1},300);
        //this.addChild(arrow);
    };
    /**设置皮肤显示 */
    GameSceneCardUi.prototype.setImgIcon = function () {
        var cardArr_hold = CardManager.Instance.cardArr_holdId;
        this.holdCardCount = cardArr_hold.length;
        this.label_holdCard.text = cardArr_hold.length + "";
        var cardArr_discard = CardManager.Instance.cardArr_discardId;
        this.discardCount = cardArr_discard.length;
        this.label_discardCard.text = cardArr_discard.length + "";
        var playerMaxPP = CharacterManager.Instance.playerMaxPP;
        GameManager.Instance.curPlayerPP = playerMaxPP;
        var curPlayerPP = GameManager.Instance.curPlayerPP;
        this.label_pp.text = curPlayerPP + "/" + playerMaxPP;
    };
    /**更新弃牌堆显示 */
    GameSceneCardUi.prototype.updateDiscardGroup = function () {
        var cardArr_discard = CardManager.Instance.cardArr_discardId;
        egret.Tween.removeTweens(this.group_discard);
        egret.Tween.get(this.group_discard).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.circOut).to({ scaleX: 0.6, scaleY: 0.6 }, 100, egret.Ease.circIn);
        this.label_discardCard.text = cardArr_discard.length + "";
    };
    /**更新PP显示 */
    GameSceneCardUi.prototype.updatePPLabel = function (pp) {
        GameManager.Instance.curPlayerPP -= pp;
        var playerMaxPP = CharacterManager.Instance.playerMaxPP;
        var curPlayerPP = GameManager.Instance.curPlayerPP;
        this.label_pp.text = curPlayerPP + "/" + playerMaxPP;
        this.label_pp.scaleX = this.label_pp.scaleY = 1;
        egret.Tween.get(this.label_pp).to({ scaleX: 1.5, scaleY: 1.5 }, 100, egret.Ease.circOut).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.circIn);
    };
    /**更新牌堆显示 */
    GameSceneCardUi.prototype.updateHoldCardGroup = function () {
        var cardArr_hold = CardManager.Instance.cardArr_holdId;
        egret.Tween.removeTweens(this.group_holdCard);
        egret.Tween.get(this.group_holdCard).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.circOut).to({ scaleX: 0.6, scaleY: 0.6 }, 100, egret.Ease.circIn);
        this.label_holdCard.text = cardArr_hold.length + "";
    };
    /**根据count抽取相应数量的卡牌 */
    GameSceneCardUi.prototype.drawCardByCount = function (count) {
        GameManager.Instance.canTouchCard = false;
        if (this.drawCardTimer) {
            if (this.drawCardTimer.hasEventListener(egret.TimerEvent.TIMER)) {
                this.drawCardTimer.removeEventListener(egret.TimerEvent.TIMER, this.initCard, this);
                this.drawCardTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerEnd, this);
                this.drawCardTimer.stop();
                this.drawCardTimer = null;
            }
        }
        if (count) {
            this.drawCardTimer = new egret.Timer(300, count + 1);
            this.handCardCount = CardManager.Instance.handCard.length + count;
            this.isBeginDrawCard = false;
            this.curCount = CardManager.Instance.handCard.length;
            this.updateHandCard(count);
            var totleAngle = this.angle * (this.handCardCount - 1);
            this.curAngle = -90 - totleAngle * 0.5 + this.angle * (CardManager.Instance.handCard.length);
        }
        else {
            this.drawCardTimer = new egret.Timer(300, GameManager.Instance.curHandCardCount + 1);
            this.isBeginDrawCard = true;
            this.handCardCount = GameManager.Instance.curHandCardCount;
            var totleAngle = this.angle * (this.handCardCount - 1);
            this.curAngle = -90 - totleAngle * 0.5;
        }
        this.addListener(this.drawCardTimer, egret.TimerEvent.TIMER, this.initCard, this);
        this.addListener(this.drawCardTimer, egret.TimerEvent.TIMER_COMPLETE, this.timerEnd, this);
        this.drawCardTimer.start();
    };
    /**更新手牌位置 */
    GameSceneCardUi.prototype.updateHandCard = function (count) {
        if (count === void 0) { count = 0; }
        var cardArr = CardManager.Instance.handCard;
        var cardCount = cardArr.length + count;
        var totleAngle = this.angle * (cardCount - 1);
        this.curAngle = -90 - totleAngle * 0.5;
        var posX = 640 - cardCount * 0.5 * (100 - cardCount * this.offsetX) + 50;
        if (cardCount % 2 == 0) {
            var posY = 650 + (cardCount * 0.5 - 1) * this.offsetY;
            var halfCount = cardCount * 0.5;
        }
        else {
            var posY = 650 + Math.floor(cardCount * 0.5) * this.offsetY;
            var halfCount = Math.floor(cardCount * 0.5);
        }
        //card.moveAnim(posX+(100-this.handCardCount*4)*this.curCount,600-20*Math.sin(curRadius),this.curAngle+90,400)
        for (var i = 0; i < cardCount; i++) {
            var curRadius = this.curAngle * Math.PI / 180;
            ///cardArr[i].moveAnim(640+900*Math.cos(curRadius),600+20*Math.sin(curRadius),this.curAngle+90,250)
            if (cardArr[i]) {
                var y = posY - this.offsetY * i;
                if (y < 650) {
                    y = 650 + this.offsetY * (i - halfCount);
                }
                if (cardCount % 2 == 0) {
                    if (this.curCount == halfCount || this.curCount == (halfCount - 1)) {
                        y = 650;
                    }
                }
                //cardArr[i].moveAnim(posX+(100-cardCount*4)*i,600-20*Math.sin(curRadius),this.curAngle+90,250);
                cardArr[i].moveAnim(posX + (100 - cardCount * this.offsetX) * i, y, this.curAngle + 90, 250);
                cardArr[i].setOriginRotation(this.curAngle + 90);
                this.curAngle += this.angle;
            }
        }
        cardArr.sort(function (a, b) { return a.getOriginX() - b.getOriginX(); });
        for (var i = 0; i < cardArr.length; i++) {
            cardArr[i].parent.setChildIndex(cardArr[i], 5 + i);
        }
    };
    /**抽牌结束 */
    GameSceneCardUi.prototype.timerEnd = function () {
        this.drawCardTimer.stop();
        this.drawCardTimer = null;
        this.curCount = 0;
        this.curAngle = 0;
        GameManager.Instance.canTouchCard = true;
        //egret.log("抽牌结束")
        this.updateHandCard();
        if (GameManager.Instance.skipPlayerTurn && this.skipStart) {
            this.endPlayerRound();
        }
        this.skipStart = false;
    };
    /**生成卡牌 */
    GameSceneCardUi.prototype.initCard = function () {
        if (this.curCount >= this.handCardCount) {
            return;
        }
        var cardArr = CardManager.Instance.handCard;
        if (cardArr.length > 10) {
            TipsManager.Instance.createTips("无法抽取更多的牌");
            return;
        }
        var _holdCardIdArr = CardManager.Instance.cardArr_holdId;
        if (_holdCardIdArr.length <= 0) {
            TipsManager.Instance.createTips("没有更多的牌");
            return;
        }
        // var index = Math.floor(Math.random()*_holdCardIdArr.length);
        var _data = DataManager.Instance.getCardDataByIdKey(_holdCardIdArr[0] + "");
        var player = CharacterManager.Instance.player;
        if (player.getHaveBuff().length > 0) {
            for (var i = 0; i < player.getHaveBuff().length; i++) {
                if (player.getHaveBuff()[i].name == "chaos") {
                    var pp = Math.floor(Math.random() * 4);
                    break;
                }
                else {
                    var pp = _data.pp;
                }
            }
        }
        else {
            var pp = _data.pp;
        }
        var cardData = {
            id: _data.id,
            pp: pp,
            type: _data.type,
            name: _data.name,
            cardEffectType: _data.cardEffectType,
            getType: _data.getType,
            imgIcon: _data.imgIcon,
            buff: _data.buff,
            buffValue: _data.buffValue,
            damageType: _data.damageType,
            damageValue: _data.damageValue,
            damageVfx: _data.damageVfx,
            imgPortrait: _data.imgPortrait,
            sp: _data.sp,
            spValue: _data.spValue
        };
        var card = new Card(cardData);
        this.main_group.addChild(card);
        CardManager.Instance.handCard.push(card);
        CardManager.Instance.cardArr_holdId.splice(0, 1);
        if (CardManager.Instance.cardArr_holdId.length <= 0) {
            var temp = [];
            while (CardManager.Instance.cardArr_discardId.length > 0) {
                var index = Math.floor(Math.random() * CardManager.Instance.cardArr_discardId.length);
                temp.push(CardManager.Instance.cardArr_discardId[index]);
                CardManager.Instance.cardArr_discardId.splice(index, 1);
            }
            CardManager.Instance.cardArr_holdId = temp;
            this.updateDiscardGroup();
        }
        this.updateHoldCardGroup();
        card.x = 100;
        card.y = 600;
        var posX = 640 - this.handCardCount * 0.5 * (100 - this.handCardCount * this.offsetX) + 50;
        if (this.handCardCount % 2 == 0) {
            var posY = 650 + (this.handCardCount * 0.5 - 1) * this.offsetY;
            var halfCount = this.handCardCount * 0.5;
        }
        else {
            var posY = 650 + Math.floor(this.handCardCount * 0.5) * this.offsetY;
            var halfCount = Math.floor(this.handCardCount * 0.5);
        }
        var y = posY - this.offsetY * this.curCount;
        if (y < 650) {
            y = 650 + this.offsetY * (this.curCount - halfCount);
        }
        if (this.handCardCount % 2 == 0) {
            if (this.curCount == halfCount || this.curCount == (halfCount - 1)) {
                y = 650;
            }
        }
        var curRadius = this.curAngle * Math.PI / 180;
        card.moveAnim(posX + (100 - this.handCardCount * this.offsetX) * this.curCount, y, this.curAngle + 90, 300);
        card.setOriginRotation(this.curAngle + 90);
        this.curAngle += this.angle;
        this.curCount++;
        if (SceneManager.Instance.getAbandonScene) {
            card.startAbandon = true;
        }
    };
    /**更新状态 */
    GameSceneCardUi.prototype.update = function () {
        this.pp_img.rotation += 1.5;
        if (GameManager.Instance.gameState == GameState.PlayerRoundEnd) {
            var cardArr = CardManager.Instance.handCard;
            for (var i = 0; i < cardArr.length; i++) {
                if (cardArr[i].isEffecting) {
                    return;
                }
            }
            for (var j = 0; j < cardArr.length; j++) {
                cardArr[j].abandonCard();
                j--;
            }
            GameManager.Instance.changeGameStart(GameState.EnemyRoundStart);
        }
    };
    //接收消息
    GameSceneCardUi.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.CLEAR_LEVEL:
                UiManager.Instance.removeUiFromLayer(this);
                break;
            case MsgCMD.PLAYER_ROUND_START:
                var timer = new egret.Timer(500, 1);
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.startPlayerRound, this);
                timer.start();
                break;
            case MsgCMD.PLAYER_ROUND_END:
                break;
            case MsgCMD.CARD_USE:
                this.updatePPLabel(data.pp);
                break;
            case MsgCMD.CARD_ABANDON:
                if (data.updateDiscardGroup)
                    this.updateDiscardGroup();
                this.updateHandCard();
                break;
            case MsgCMD.ADD_CARD:
                for (var i = 0; i < 2; i++) {
                    var _data = DataManager.Instance.getCardDataByIdKey("44");
                    var cardArr = CardManager.Instance.handCard;
                    var card = new Card(_data);
                    this.main_group.addChild(card);
                    CardManager.Instance.handCard.push(card);
                    card.x = 500 + i * 280;
                    card.y = 360;
                    card.scaleX = 1;
                    card.scaleY = 1;
                }
                break;
            case MsgCMD.SET_CARD:
                for (var i = 0; i < 2; i++) {
                    var _data = DataManager.Instance.getCardDataByIdKey(data.setCardId + "");
                    var cardArr = CardManager.Instance.handCard;
                    var dacard = new Card(_data);
                    this.main_group.addChild(dacard);
                    dacard.touchEnabled = false;
                    dacard.touchChildren = false;
                    //CardManager.Instance.handCard.push(dacard);
                    dacard.x = 500 + i * 280;
                    dacard.y = 360;
                    dacard.scaleX = 0.8;
                    dacard.scaleY = 0.8;
                    egret.Tween.get(dacard).wait(500).call(dacard.abandonCard);
                }
                break;
            case MsgCMD.DRAW_CARD:
                this.drawCardByCount(data);
                break;
            case MsgCMD.ABANDON_CARD:
                this.extraDraw = true;
                if (!SceneManager.Instance.getAbandonScene) {
                    var abandonScene = new AbandonScene();
                    SceneManager.Instance.abandonScene = abandonScene;
                    this.addChildAt(abandonScene, 0);
                    this.main_group.touchEnabled = false;
                    this.top_group.touchEnabled = false;
                    this.button_round.touchEnabled = false;
                }
                break;
            case MsgCMD.ABANDON_END:
                this.button_round.touchEnabled = true;
                break;
            case MsgCMD.SELECT_CARD:
                this.bgRect = new eui.Rect();
                this.main_group.addChild(this.bgRect);
                this.bgRect.width = GameConst.stage.stageWidth;
                this.bgRect.height = GameConst.stage.stageHeight;
                this.bgRect.alpha = 0.5;
                var cardId = [];
                for (var i = 0; i < 3; i++) {
                    var cardDataArr = DataManager.Instance.cardDataList;
                    var _data = CardManager.Instance.randomGetCardData();
                    var cardData = {
                        id: _data.id,
                        pp: 0,
                        type: _data.type,
                        name: _data.name,
                        cardEffectType: _data.cardEffectType,
                        getType: _data.getType,
                        imgIcon: _data.imgIcon,
                        buff: _data.buff,
                        buffValue: _data.buffValue,
                        damageType: _data.damageType,
                        damageValue: _data.damageValue,
                        damageVfx: _data.damageVfx,
                        imgPortrait: _data.imgPortrait,
                        sp: _data.sp,
                        spValue: _data.spValue
                    };
                    var cardArr = CardManager.Instance.handCard;
                    var card = new Card(cardData);
                    this.main_group.addChild(card);
                    // card.touchEnabled = false;
                    // card.touchChildren = false;
                    CardManager.Instance.selectCard.push(card);
                    card.x = 360 + i * 280;
                    card.y = 360;
                    card.scaleX = 1;
                    card.scaleY = 1;
                    card.isSelect = true;
                }
                break;
            case MsgCMD.CARD_UPDATE:
                this.main_group.removeChild(this.bgRect);
                this.bgRect = null;
                this.updateHandCard();
                for (var i = 0; i < CardManager.Instance.selectCard.length; i++) {
                    CardManager.Instance.selectCard[i].parent.removeChild(CardManager.Instance.selectCard[i]);
                    CardManager.Instance.selectCard.splice(i, 1);
                    i--;
                }
                for (var i = 0; i < CardManager.Instance.handCard.length; i++) {
                    CardManager.Instance.handCard[i].isSelect = false;
                }
                break;
            case MsgCMD.GAME_OVER:
                this.touchEnabled = false;
                this.touchChildren = false;
                break;
        }
    };
    GameSceneCardUi.prototype.addEvent = function () {
        this.addMessage(MsgCMD.GAME_OVER, this);
        this.addMessage(MsgCMD.CLEAR_LEVEL, this);
        this.addMessage(MsgCMD.CARD_UPDATE, this);
        this.addMessage(MsgCMD.SELECT_CARD, this);
        this.addMessage(MsgCMD.ABANDON_END, this);
        this.addMessage(MsgCMD.ABANDON_CARD, this);
        this.addMessage(MsgCMD.DRAW_CARD, this);
        this.addMessage(MsgCMD.SET_CARD, this);
        this.addMessage(MsgCMD.ADD_CARD, this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
        this.addMessage(MsgCMD.CARD_ABANDON, this);
        this.addMessage(MsgCMD.CARD_USE, this);
        this.addMessage(MsgCMD.PLAYER_ROUND_END, this);
        this.addListener(GameConst.stage, egret.TouchEvent.TOUCH_BEGIN, this.aa, this);
        this.addListener(this.button_round, egret.TouchEvent.TOUCH_TAP, this.endPlayerRound, this);
        this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
    };
    GameSceneCardUi.prototype.aa = function (e) {
        if (e.stageY < 200)
            //this.drawCardByCount(3)
            for (var i = 0; i < CardManager.Instance.handCard.length; i++) {
            }
    };
    /**结束玩家回合 */
    GameSceneCardUi.prototype.endPlayerRound = function () {
        if (!GameManager.Instance.canTouchCard) {
            return;
        }
        this.button_round.enabled = false;
        GameManager.Instance.canTouchCard = false;
        GameManager.Instance.changeGameStart(GameState.PlayerRoundEnd);
        this.touchChildren = false;
        this.touchEnabled = false;
    };
    /**开始玩家回合 */
    GameSceneCardUi.prototype.startPlayerRound = function () {
        if (GameManager.Instance.skipPlayerNumber <= 0) {
            GameManager.Instance.skipPlayerTurn = false;
        }
        if (GameManager.Instance.skipPlayerNumber > 0) {
            GameManager.Instance.skipPlayerNumber--;
            this.skipStart = true;
        }
        this.button_round.enabled = true;
        GameManager.Instance.curPlayerPP = CharacterManager.Instance.playerMaxPP;
        this.updatePPLabel(0);
        this.drawCardByCount();
        this.touchChildren = true;
        this.touchEnabled = true;
    };
    return GameSceneCardUi;
}(BaseUi));
__reflect(GameSceneCardUi.prototype, "GameSceneCardUi");
//# sourceMappingURL=GameSceneCardUi.js.map