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
var CardSelectUi = (function (_super) {
    __extends(CardSelectUi, _super);
    function CardSelectUi(idArr) {
        var _this = _super.call(this) || this;
        _this.selectCount = 0;
        _this.randomIdArr = [];
        if (idArr) {
            _this.randomIdArr = idArr;
        }
        _this.skinName = "CardSelectUiSkin";
        return _this;
    }
    CardSelectUi.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.setRandomCard();
        this.addEvent();
    };
    CardSelectUi.prototype.addEvent = function () {
        this.addListener(this.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
    };
    CardSelectUi.prototype.setRandomCard = function () {
        if (this.randomIdArr.length <= 0) {
            for (var i = 0; i < 3; i++) {
                var data = CardManager.Instance.randomGetCardData();
                while (this.randomIdArr.indexOf(data.id) >= 0 || data.getType == 0 || data.getType == 2) {
                    var data = CardManager.Instance.randomGetCardData();
                }
                this.randomIdArr.push(data.id);
                var card = new Card(data, true, true);
                card.y = 360;
                egret.Tween.get(card).to({ x: 640 + (i - 1) * 240 }, 400, egret.Ease.circOut);
                card.touchEnabled = true;
                card.touchChildren = false;
                this.addListener(card, egret.TouchEvent.TOUCH_TAP, this.select, this);
                this.addChild(card);
            }
        }
        else {
            for (var i = 0; i < this.randomIdArr.length; i++) {
                var data = DataManager.Instance.getCardDataByIdKey(this.randomIdArr[i] + "");
                var card = new Card(data, true, true);
                card.y = 360;
                egret.Tween.get(card).to({ x: 640 + (i - 1) * 240 }, 400, egret.Ease.circOut);
                card.touchEnabled = true;
                card.touchChildren = false;
                this.addListener(card, egret.TouchEvent.TOUCH_TAP, this.select, this);
                this.addChild(card);
            }
        }
    };
    CardSelectUi.prototype.select = function (e) {
        if (this.selectCount <= 0) {
            this.selectCount++;
            var card = e.target;
            CardManager.Instance.haveCardId.push(card.cardData.id);
            Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
            Message.instance.send(MsgCMD.REWARD_CARD_SELECT_OVER, this);
            if (this && this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    CardSelectUi.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return CardSelectUi;
}(BaseModule));
__reflect(CardSelectUi.prototype, "CardSelectUi");
//# sourceMappingURL=CardSelectUi.js.map