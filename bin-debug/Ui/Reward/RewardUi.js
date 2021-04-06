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
var RewardType;
(function (RewardType) {
    RewardType[RewardType["normal"] = 0] = "normal";
    RewardType[RewardType["card"] = 1] = "card";
    RewardType[RewardType["relic"] = 2] = "relic";
})(RewardType || (RewardType = {}));
var RewardUi = (function (_super) {
    __extends(RewardUi, _super);
    function RewardUi(data, rewardType) {
        if (rewardType === void 0) { rewardType = RewardType.normal; }
        var _this = _super.call(this) || this;
        _this.rewardCount = 0;
        _this.rewardType = null;
        _this.isRemove = false;
        if (data) {
            _this.data = data;
        }
        _this.rewardType = rewardType;
        _this.skinName = "RewardUiSkin";
        _this.main_group.y = -720;
        return _this;
    }
    RewardUi.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setReward();
        this.addEvent();
    };
    RewardUi.prototype.initData = function () {
        egret.Tween.get(this.main_group).to({ y: 0 }, 1300, egret.Ease.backOut);
        egret.Tween.get(this.btn_jump).to({ x: 1100 }, 1300, egret.Ease.backOut);
    };
    RewardUi.prototype.addEvent = function () {
        this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
        this.addListener(this.btn_jump, egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
    };
    RewardUi.prototype.setReward = function () {
        switch (this.rewardType) {
            case RewardType.normal:
                this.setCoinReward();
                this.setCardReward();
                switch (GameManager.Instance.curLevelType) {
                    case 1:
                        this.setRelicReward();
                        break;
                    case 2:
                        this.setRelicReward();
                        break;
                }
                break;
        }
    };
    RewardUi.prototype.setCoinReward = function () {
        var item = new RewardItem(RewardItemType.coin);
        this.reward_group.addChild(item);
    };
    RewardUi.prototype.setCardReward = function () {
        var item = new RewardItem(RewardItemType.card);
        this.reward_group.addChild(item);
    };
    RewardUi.prototype.setRelicReward = function () {
        var item = new RewardItem(RewardItemType.refilc);
        this.reward_group.addChild(item);
    };
    RewardUi.prototype.update = function () {
        if (this.reward_group.numChildren <= 0) {
            if (!this.isRemove)
                this.removeSelf();
        }
    };
    RewardUi.prototype.removeSelf = function () {
        EventManager.Instance.tapCount = 0;
        if (egret.localStorage.getItem("userData")) {
            var userData = SaveManager.Instance.loadGame();
            userData.tap = 0;
        }
        SaveManager.Instance.saveGame();
        this.isRemove = true;
        var self = this;
        this.main_group.touchEnabled = false;
        this.main_group.touchChildren = false;
        egret.Tween.get(this.btn_jump).to({ x: 2000 }, 800, egret.Ease.quintIn);
        egret.Tween.get(this.main_group).to({ y: -720 }, 800, egret.Ease.quintIn).call(function () {
            self.remove();
        });
    };
    RewardUi.prototype.remove = function () {
        if (this && this.parent && this.parent.contains(this)) {
            this.parent.removeChild(this);
            this.changeMapScene(null);
        }
    };
    RewardUi.prototype.changeMapScene = function (e) {
        if (GameManager.Instance.curLevelType == 2) {
            GameManager.Instance.gameClear();
        }
        else {
            GameManager.Instance.addClearNodeToArr();
            SceneManager.Instance.removeCurScene();
            SceneManager.Instance.addMapScene(new MapScene());
        }
    };
    return RewardUi;
}(BaseModule));
__reflect(RewardUi.prototype, "RewardUi");
//# sourceMappingURL=RewardUi.js.map