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
/**playerUi类 */
var PlayerUi = (function (_super) {
    __extends(PlayerUi, _super);
    function PlayerUi() {
        var _this = _super.call(this) || this;
        _this.heartFilterBlur = 0;
        _this.skinName = "PlayerUiSkin";
        _this.name = egret.getQualifiedClassName(PlayerUi);
        return _this;
    }
    PlayerUi.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.updateHoldCard();
        this.updateHeartGroup();
        this.updateCoinGroup();
        this.updateLayerLabel();
    };
    //接收消息
    PlayerUi.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_HEALTH_CHANGE:
                this.updateHeartGroup();
                break;
            case MsgCMD.PLAYER_COIN_CHANGE:
                this.updateCoinGroup();
                break;
            case MsgCMD.PLAYER_HAVECARD_CHANGE:
                this.updateHoldCard();
                break;
            case MsgCMD.PLAYER_LAYER_CHANGE:
                this.updateLayerLabel();
                break;
        }
    };
    PlayerUi.prototype.addEvent = function () {
        this.addMessage(MsgCMD.PLAYER_HEALTH_CHANGE, this);
        this.addMessage(MsgCMD.PLAYER_COIN_CHANGE, this);
        this.addMessage(MsgCMD.PLAYER_HAVECARD_CHANGE, this);
        this.addMessage(MsgCMD.PLAYER_LAYER_CHANGE, this);
        this.addListener(this.group_holdCard, egret.TouchEvent.TOUCH_TAP, this.openCardGroup, this);
        this.addListener(this.img_map, egret.TouchEvent.TOUCH_TAP, this.openMapUi, this);
        this.addListener(this.btn_option, egret.TouchEvent.TOUCH_TAP, this.openOptionUi, this);
    };
    /**更新持有组 */
    PlayerUi.prototype.updateHoldCard = function () {
        var haveCardArr = CardManager.Instance.haveCardId;
        this.group_holdCard.scaleX = this.group_holdCard.scaleY = 1;
        egret.Tween.get(this.group_holdCard).to({ scaleX: 1.2, scaleY: 1.2 }, 100, egret.Ease.circOut).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.circIn);
        this.label_holdCardCount.text = haveCardArr.length + "";
    };
    /**更新生命组 */
    PlayerUi.prototype.updateHeartGroup = function () {
        var self = this;
        egret.Tween.get(this, { loop: false, onChange: this.changeHeartFilter, onChangeObj: this }).to({ heartFilterBlur: 25 }, 200).to({ heartFilterBlur: 0 }, 200).call(function () {
            self.group_heart.filters = [];
        });
        var curHealth = GameManager.Instance.curHealth;
        var maxHealth = GameManager.Instance.maxHealth;
        if (curHealth <= 0) {
            curHealth = 0;
        }
        if (maxHealth <= 0) {
            maxHealth = 0;
        }
        this.label_heart.text = curHealth + "/" + maxHealth;
    };
    PlayerUi.prototype.changeHeartFilter = function () {
        var glowFilter = new egret.GlowFilter(0xff0000, 0.8, this.heartFilterBlur, this.heartFilterBlur, 2, 3 /* HIGH */, false);
        this.group_heart.filters = [glowFilter];
    };
    /**更新金币组 */
    PlayerUi.prototype.updateCoinGroup = function () {
        this.group_coin.scaleX = this.group_coin.scaleY = 1;
        egret.Tween.get(this.group_coin).to({ scaleX: 1.2, scaleY: 1.2 }, 200, egret.Ease.sineIn);
        this.label_coin.text = GameManager.Instance.curCoin + "";
    };
    /**更新层数 */
    PlayerUi.prototype.updateLayerLabel = function () {
        this.label_layer.text = GameManager.Instance.curLayer + "";
    };
    /**打开卡组 */
    PlayerUi.prototype.openCardGroup = function () {
        UiManager.Instance.addUiToUiLayer(CardShowUi, false, null, 999);
    };
    /**打开地图 */
    PlayerUi.prototype.openMapUi = function () {
        if (SceneManager.Instance.mapScene == null) {
            SceneManager.Instance.addMapScene(new MapScene(true));
        }
    };
    /**打开设置 */
    PlayerUi.prototype.openOptionUi = function () {
        UiManager.Instance.addUiToUiLayer(OptionUi, false);
    };
    /**更新玩家姓名 */
    PlayerUi.prototype.updatePlayerName = function () {
    };
    return PlayerUi;
}(BaseUi));
__reflect(PlayerUi.prototype, "PlayerUi");
//# sourceMappingURL=PlayerUi.js.map