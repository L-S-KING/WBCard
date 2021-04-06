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
var RewardItemType;
(function (RewardItemType) {
    RewardItemType[RewardItemType["coin"] = 0] = "coin";
    RewardItemType[RewardItemType["card"] = 1] = "card";
    RewardItemType[RewardItemType["refilc"] = 2] = "refilc";
})(RewardItemType || (RewardItemType = {}));
var RewardItem = (function (_super) {
    __extends(RewardItem, _super);
    function RewardItem(rewardItemType) {
        var _this = _super.call(this) || this;
        _this.rewardItemType = null;
        _this.randomIdArr = [];
        _this.rewardItemType = rewardItemType;
        _this.skinName = "RewardItemSkin";
        return _this;
    }
    RewardItem.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        switch (this.rewardItemType) {
            case RewardItemType.coin:
                this.setCoinReward();
                break;
            case RewardItemType.card:
                this.setCardReward();
                break;
            case RewardItemType.refilc:
                this.setRelicReward();
                break;
        }
    };
    //接收消息
    RewardItem.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.RELIC_SELECT_OVER:
                if (data.detailName == this.item_label.text) {
                    this.removeSelf();
                }
                break;
            case MsgCMD.REWARD_CARD_SELECT_OVER:
                if (this.item_label.text = "选择一张牌") {
                    this.removeSelf();
                }
                break;
        }
    };
    RewardItem.prototype.setCoinReward = function () {
        var coinCount = Math.floor(Math.random() * 15 + 20);
        this.item_image.source = "gold_png";
        this.item_label.text = "" + coinCount;
        var self = this;
        this.addListener(this, egret.TouchEvent.TOUCH_TAP, function () {
            GameManager.Instance.curCoin += coinCount;
            self.removeSelf();
        }, this);
    };
    RewardItem.prototype.setCardReward = function () {
        var self = this;
        this.item_label.text = "选择一张牌";
        this.addMessage(MsgCMD.REWARD_CARD_SELECT_OVER, this);
        this.addListener(this, egret.TouchEvent.TOUCH_TAP, function () {
            if (self.randomIdArr.length <= 0) {
                for (var i = 0; i < 3; i++) {
                    var data = CardManager.Instance.randomGetCardData();
                    while (self.randomIdArr.indexOf(data.id) >= 0 || data.getType == 0 || data.getType == 2) {
                        var data = CardManager.Instance.randomGetCardData();
                    }
                    self.randomIdArr.push(data.id);
                }
            }
            else { }
            var cardSelectUi = new CardSelectUi(self.randomIdArr);
            GlobalManager.Instance.addToLayer(cardSelectUi, LayerType.ui, 999);
        }, this);
    };
    RewardItem.prototype.setRelicReward = function () {
        var relicName = RelicManager.Instance.randomGetRelicCls();
        if (!relicName) {
            this.removeSelf();
            return;
        }
        var name = egret.getQualifiedClassName(relicName);
        var data = DataManager.Instance.getRelicDataByKey(name);
        this.item_image.source = data.img;
        this.item_label.text = data.detailName;
        this.item_image.x = -24;
        this.item_image.y = -24;
        this.addListener(this, egret.TouchEvent.TOUCH_TAP, select, this);
        this.addMessage(MsgCMD.RELIC_SELECT_OVER, this);
        function select() {
            var _data = {
                img: "l_" + data.img,
                detail: data.detail,
                detailName: data.detailName,
                clsName: relicName,
                relic: null
            };
            var selectUi = new RelicSelectUi(_data);
            GlobalManager.Instance.addToLayer(selectUi, LayerType.ui, 999);
        }
    };
    RewardItem.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return RewardItem;
}(BaseModule));
__reflect(RewardItem.prototype, "RewardItem");
//# sourceMappingURL=RewardItem.js.map