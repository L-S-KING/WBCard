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
/**商店界面 */
var ShopScene = (function (_super) {
    __extends(ShopScene, _super);
    function ShopScene() {
        var _this = _super.call(this) || this;
        _this.randomIdArr = []; //卡牌随机id组
        _this.cardArr = []; //卡牌组
        _this.relicArr = []; //遗物组
        _this.posArr = []; //卡牌位置数组
        _this.selectCard = null; //选择卡牌
        _this.relicDataArr = [];
        _this.relicClsNameArr = [];
        _this.relicImgArr = [];
        _this.coinLabelArr = [];
        _this.isRemoveOver = false;
        _this.skinName = "ShopSceneSkin";
        return _this;
    }
    ShopScene.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.setShopCard();
        this.setShopRelic();
        this.setIndex();
        this.addEvent();
    };
    ShopScene.prototype.removeCard = function () {
        if (this.isRemoveOver) {
            return;
        }
        if (GameManager.Instance.curCoin < parseInt(this.label_removeCardCoin.text)) {
            TipsManager.Instance.createTips("金钱不足");
        }
        else {
            UiManager.Instance.addUiToUiLayer(CardShowUi, false, true, 999);
        }
    };
    //接收消息
    ShopScene.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.RELIC_SELECT_OVER:
                if (data) {
                    for (var i = 0; i < this.relicImgArr.length; i++) {
                        if ("l_" + this.relicImgArr[i].source == data.img) {
                            this.removeListener(this.relicImgArr[i], egret.TouchEvent.TOUCH_TAP, this.selectRelic, this);
                            this.coinLabelArr[i + 6].visible = false;
                            this.relicImgArr[i].visible = false;
                            break;
                        }
                    }
                }
                break;
            case MsgCMD.PLAYER_REMOVECARD_OVER:
                GameManager.Instance.curCoin -= 100;
                this.isRemoveOver = true;
                break;
        }
    };
    ShopScene.prototype.addEvent = function () {
        this.addMessage(MsgCMD.RELIC_SELECT_OVER, this);
        this.addMessage(MsgCMD.PLAYER_REMOVECARD_OVER, this);
        this.addListener(this.img_removeCard, egret.TouchEvent.TOUCH_TAP, this.removeCard, this);
        this.addListener(this.btn_ok, egret.TouchEvent.TOUCH_TAP, this.buyCard, this);
        this.addListener(this.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.cancel, this);
        this.addListener(this.btn_jump, egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        egret.Tween.get(this.main_group).to({ y: 0 }, 800, egret.Ease.backOut);
    };
    ShopScene.prototype.setIndex = function () {
        this.main_group.setChildIndex(this.bg_rect, 999);
        this.main_group.setChildIndex(this.btn_ok, 999);
        this.main_group.setChildIndex(this.btn_cancel, 999);
    };
    ShopScene.prototype.createCoinLabel = function (x, y, text) {
        var coinLabel = new eui.Label();
        this.main_group.addChild(coinLabel);
        this.coinLabelArr.push(coinLabel);
        coinLabel.textColor = 0xFFC372;
        coinLabel.width = 100;
        coinLabel.textAlign = egret.HorizontalAlign.CENTER;
        coinLabel.text = text;
        coinLabel.size = 20;
        coinLabel.x = x;
        coinLabel.y = y;
        coinLabel.anchorOffsetX = coinLabel.width >> 1;
        coinLabel.anchorOffsetY = coinLabel.height >> 1;
    };
    ShopScene.prototype.setShopCard = function () {
        for (var i = 0; i < 6; i++) {
            var data = CardManager.Instance.randomGetCardData();
            while (this.randomIdArr.indexOf(data.id) >= 0 || data.getType == 2 || data.getType == 0) {
                var data = CardManager.Instance.randomGetCardData();
            }
            this.randomIdArr.push(data.id);
            var card = new Card(data, true);
            card.scaleX = card.scaleY = 0.7;
            card.x = 200 + (i % 3) * 250;
            card.y = 180 + Math.floor(i / 3) * 280;
            var pos = new egret.Point(card.x, card.y);
            this.posArr.push(pos);
            card.touchEnabled = true;
            card.touchChildren = false;
            this.addListener(card, egret.TouchEvent.TOUCH_TAP, this.scaleCardToScreenCenter, this);
            this.main_group.addChild(card);
            this.cardArr.push(card);
            var coin = Math.floor(Math.random() * 100 + 60);
            this.createCoinLabel(card.x, card.y + 140, coin + "");
        }
    };
    ShopScene.prototype.scaleCardToScreenCenter = function (e) {
        if (!this.selectCard) {
            var card = e.target;
            var posX = 640;
            var posY = 360;
            this.bg_rect.visible = true;
            this.btn_cancel.visible = true;
            this.btn_ok.visible = true;
            this.main_group.setChildIndex(card, 999);
            this.selectCard = card;
            egret.Tween.get(card).to({ x: posX, y: posY, scaleX: 1.1, scaleY: 1.1 }, 300, egret.Ease.sineIn);
        }
    };
    ShopScene.prototype.buyCard = function () {
        if (this.selectCard) {
            var index = this.cardArr.indexOf(this.selectCard);
            var coinIndex = 0;
            for (var i = 0; i < this.coinLabelArr.length; i++) {
                if (this.coinLabelArr[i].x == this.posArr[index].x && this.coinLabelArr[i].y == (this.posArr[index].y + 140)) {
                    coinIndex = i;
                    var coinValue = parseInt(this.coinLabelArr[i].text);
                    break;
                }
            }
            if (coinValue > GameManager.Instance.curCoin) {
                TipsManager.Instance.createTips("金币不足");
                return;
            }
            else {
                this.coinLabelArr[coinIndex].visible = false;
                GameManager.Instance.curCoin -= coinValue;
                this.bg_rect.visible = false;
                this.btn_cancel.visible = false;
                this.btn_ok.visible = false;
                CardManager.Instance.haveCardId.push(this.selectCard.cardData.id);
                Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
                this.cardArr.splice(index, 1);
                this.posArr.splice(index, 1);
                this.selectCard.parent.removeChild(this.selectCard);
                this.selectCard = null;
            }
        }
    };
    ShopScene.prototype.cancel = function () {
        if (this.selectCard) {
            var self = this;
            this.bg_rect.visible = false;
            this.btn_cancel.visible = false;
            this.btn_ok.visible = false;
            var index = this.cardArr.indexOf(this.selectCard);
            egret.Tween.get(this.selectCard).to({ x: this.posArr[index].x, y: this.posArr[index].y, scaleX: 0.7, scaleY: 0.7 }, 300, egret.Ease.sineOut).call(function () {
                for (var i = 0; i < self.cardArr.length; i++) {
                    self.main_group.setChildIndex(self.cardArr[i], 5 + i);
                }
                self.selectCard = null;
            });
        }
    };
    ShopScene.prototype.setShopRelic = function () {
        var self = this;
        for (var i = 0; i < 3; i++) {
            var relicName = RelicManager.Instance.randomGetRelicCls();
            if (!relicName) {
                return;
            }
            while (this.relicClsNameArr.indexOf(relicName) >= 0) {
                if (this.relicClsNameArr.length + RelicManager.Instance.playerHaveRelicIdArr.length >= RelicManager.Instance.relicNameArr.length) {
                    break;
                }
                var relicName = RelicManager.Instance.randomGetRelicCls();
            }
            this.relicClsNameArr.push(relicName);
            var name = egret.getQualifiedClassName(relicName);
            var data = DataManager.Instance.getRelicDataByKey(name);
            var img = new eui.Image();
            img.source = data.img;
            img.x = 840 + i * 120;
            img.y = 100;
            img.scaleX = img.scaleY = 1;
            this.main_group.addChild(img);
            this.relicImgArr.push(img);
            this.addListener(img, egret.TouchEvent.TOUCH_TAP, this.selectRelic, this);
            this.addMessage(MsgCMD.RELIC_SELECT_OVER, this);
            var coin = Math.floor(Math.random() * 200 + 150);
            this.createCoinLabel(img.x + 60, img.y + 120, coin + "");
            if (this.relicClsNameArr.length + RelicManager.Instance.playerHaveRelicIdArr.length >= RelicManager.Instance.relicNameArr.length) {
                break;
            }
        }
    };
    ShopScene.prototype.selectRelic = function (e) {
        var img = e.target;
        var index = this.relicImgArr.indexOf(img);
        var coin = parseInt(this.coinLabelArr[index + 6].text);
        var relicName = this.relicClsNameArr[index];
        var name = egret.getQualifiedClassName(relicName);
        var data = DataManager.Instance.getRelicDataByKey(name);
        var _data = {
            img: "l_" + data.img,
            detail: data.detail,
            detailName: data.detailName,
            clsName: relicName,
            relic: null,
            coin: coin
        };
        var selectUi = new RelicSelectUi(_data);
        GlobalManager.Instance.addToLayer(selectUi, LayerType.ui, 999);
        return;
    };
    ShopScene.prototype.removeSelf = function () {
        if (this && this.contains(this)) {
            this.parent.removeChild(this);
            GameManager.Instance.addClearNodeToArr();
            SceneManager.Instance.addMapScene(new MapScene());
        }
    };
    return ShopScene;
}(BaseScene));
__reflect(ShopScene.prototype, "ShopScene");
//# sourceMappingURL=ShopScene.js.map