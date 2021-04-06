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
var CardShowUi = (function (_super) {
    __extends(CardShowUi, _super);
    function CardShowUi(isRemoveCardShow) {
        if (isRemoveCardShow === void 0) { isRemoveCardShow = false; }
        var _this = _super.call(this) || this;
        _this.isRemoveCardShow = false;
        _this.isRemoveOver = false;
        _this.isRemoveCardShow = isRemoveCardShow;
        _this.skinName = "CardShowUiSkin";
        _this.name = egret.getQualifiedClassName(CardShowUi);
        return _this;
    }
    CardShowUi.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    CardShowUi.prototype.initData = function () {
        var haveCard = CardManager.Instance.haveCardId;
        var cardArr = [];
        for (var i = 0; i < haveCard.length; i++) {
            cardArr.push(haveCard[i]);
        }
        cardArr.sort(function (a, b) { return a - b; });
        for (var i = 0; i < cardArr.length; i++) {
            var data = DataManager.Instance.getCardDataByIdKey(cardArr[i] + "");
            var card = new Card(data, true);
            this.group_card.addChild(card);
            card.touchEnabled = true;
            card.touchChildren = false;
            if (this.isRemoveCardShow) {
                this.addListener(card, egret.TouchEvent.TOUCH_TAP, this.removeCard, this);
                this.label_title.text = "选择一张牌删除";
            }
        }
        egret.Tween.get(this.scroller_card).to({ y: 150 }, 600, egret.Ease.sineIn);
        egret.Tween.get(this.btn_cancel).to({ x: -15 }, 600, egret.Ease.quintIn);
    };
    CardShowUi.prototype.removeCard = function (e) {
        if (this.isRemoveOver) {
            return;
        }
        var card = e.target;
        var index = CardManager.Instance.haveCardId.indexOf(card.cardData.id);
        CardManager.Instance.haveCardId.splice(index, 1);
        egret.Tween.get(card).to({ alpha: 0 }, 500, egret.Ease.sineIn).call(function () {
            if (card && card.parent.contains(card)) {
                card.parent.removeChild(card);
            }
        });
        this.isRemoveOver = true;
        Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
        Message.instance.send(MsgCMD.PLAYER_REMOVECARD_OVER);
    };
    CardShowUi.prototype.setImgIcon = function () {
    };
    CardShowUi.prototype.addEvent = function () {
        this.addListener(this.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
    };
    CardShowUi.prototype.removeSelf = function () {
        UiManager.Instance.removeUiFromLayer(this);
    };
    return CardShowUi;
}(BaseUi));
__reflect(CardShowUi.prototype, "CardShowUi");
//# sourceMappingURL=CardShowUi.js.map