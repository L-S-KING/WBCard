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
var AbandonScene = (function (_super) {
    __extends(AbandonScene, _super);
    function AbandonScene() {
        var _this = _super.call(this) || this;
        _this.card = [];
        _this.abandonCount = 0;
        _this.skinName = "AbandonSceneSkin";
        _this.x = 400;
        _this.y = 50;
        _this.addListener(_this.confirm_btn, egret.TouchEvent.TOUCH_TAP, _this.abandon, _this);
        _this.addMessage(MsgCMD.START_ABANDON, _this);
        _this.name = egret.getQualifiedClassName(AbandonScene);
        _this.initData();
        return _this;
    }
    AbandonScene.prototype.initData = function () {
        //开始丢弃
        for (var i = 0; i < CardManager.Instance.handCard.length; i++) {
            if (!CardManager.Instance.handCard[i].startAbandon)
                CardManager.Instance.handCard[i].startAbandon = true;
        }
    };
    /**点击确定 */
    AbandonScene.prototype.abandon = function () {
        if (this.parent && this.parent.contains(this)) {
            var handCard = CardManager.Instance.handCard;
            if (this.card.length <= 0) {
                if (handCard.length <= 0) {
                    for (var j = 0; j < CardManager.Instance.handCard.length; j++) {
                        CardManager.Instance.handCard[j].startAbandon = false;
                    }
                    SceneManager.Instance.abandonScene = null;
                    Message.instance.send(MsgCMD.ABANDON_END);
                    this.parent.removeChild(this);
                    return;
                }
                else {
                    TipsManager.Instance.createTips("请舍弃" + CardManager.Instance.abandonCardCount + "张牌");
                }
            }
            else if (this.card.length > 0) {
                if (this.card.length == CardManager.Instance.abandonCardCount) {
                    for (var j = 0; j < CardManager.Instance.handCard.length; j++) {
                        CardManager.Instance.handCard[j].startAbandon = false;
                    }
                    for (var i = 0; i < this.card.length; i++) {
                        this.card[i].abandonCard();
                        this.card.splice(i, 1);
                        i--;
                    }
                    SceneManager.Instance.abandonScene = null;
                    Message.instance.send(MsgCMD.ABANDON_END);
                    this.parent.removeChild(this);
                }
                else {
                    if (handCard.length <= 0) {
                        for (var j = 0; j < CardManager.Instance.handCard.length; j++) {
                            CardManager.Instance.handCard[j].startAbandon = false;
                        }
                        for (var i = 0; i < this.card.length; i++) {
                            this.card[i].abandonCard();
                            this.card.splice(i, 1);
                            i--;
                        }
                        SceneManager.Instance.abandonScene = null;
                        Message.instance.send(MsgCMD.ABANDON_END);
                        this.parent.removeChild(this);
                        return;
                    }
                    else {
                        TipsManager.Instance.createTips("请舍弃" + CardManager.Instance.abandonCardCount + "张牌");
                    }
                }
            }
        }
    };
    //接收消息
    AbandonScene.prototype.recvMsg = function (cmd, data) {
    };
    return AbandonScene;
}(BaseScene));
__reflect(AbandonScene.prototype, "AbandonScene");
//# sourceMappingURL=AbandonScene.js.map