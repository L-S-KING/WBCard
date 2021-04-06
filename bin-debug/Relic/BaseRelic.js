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
var BaseRelic = (function (_super) {
    __extends(BaseRelic, _super);
    function BaseRelic(data, isPlayerHold) {
        var _this = _super.call(this) || this;
        _this._id = 0;
        _this._type = 0;
        _this.isPlayerHold = false;
        _this._canUse = true;
        if (data) {
            _this.data = data;
        }
        if (isPlayerHold) {
            _this.isPlayerHold = isPlayerHold;
        }
        _this.skinName = "RelicUiSkin";
        return _this;
    }
    BaseRelic.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setImgIcon();
        this.addEvent();
        this.setPlayerHoldState();
    };
    /**设置玩家是否持有状态 */
    BaseRelic.prototype.setPlayerHoldState = function () {
        if (!this.isPlayerHold) {
            this.addListener(this, egret.TouchEvent.TOUCH_TAP, this.select, this);
        }
        else {
            RelicManager.Instance.pushRelicToArr(this);
        }
    };
    BaseRelic.prototype.select = function () {
        if (this.isPlayerHold) {
            return;
        }
        var data = {
            img: "l_" + this.data.img,
            detail: this.data.detail,
            detailName: this.data.detailName,
            relic: this
        };
        var selectUi = new RelicSelectUi(data);
        GlobalManager.Instance.addToLayer(selectUi, LayerType.ui, 999);
    };
    BaseRelic.prototype.selectRelic = function () {
        this.isPlayerHold = true;
        RelicManager.Instance.pushRelicToArr(this);
        Message.instance.send(MsgCMD.RELIC_SELECT_OVER, { relic: this });
        this.removeListener(this, egret.TouchEvent.TOUCH_TAP, this.selectRelic, this);
    };
    BaseRelic.prototype.setImgIcon = function () {
        this.relic_img.source = this.data.img;
    };
    BaseRelic.prototype.initData = function () {
        if (this.data) {
            this._type = this.data.type;
            this.detail = this.data.detail;
            this.detailName = this.data.detailName;
        }
    };
    Object.defineProperty(BaseRelic.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRelic.prototype, "canUse", {
        get: function () {
            return this._canUse;
        },
        set: function (value) {
            this._canUse = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseRelic.prototype.addEvent = function () {
        this.addListener(this, egret.TouchEvent.TOUCH_TAP, this.relicDetail, this);
    };
    BaseRelic.prototype.relicDetail = function () {
        if (!this.isPlayerHold) {
            return;
        }
        var data = {
            img: "l_" + this.data.img,
            detail: this.data.detail,
            detailName: this.data.detailName,
            index: RelicManager.Instance.RelicArr.indexOf(this)
        };
        var relicDetail = new RelicDetail(data);
        GlobalManager.Instance.addToLayer(relicDetail, LayerType.ui, 999);
    };
    BaseRelic.prototype.getRelicData = function () {
        var data = {
            img: "l_" + this.data.img,
            detail: this.data.detail,
            detailName: this.data.detailName,
            index: RelicManager.Instance.RelicArr.indexOf(this)
        };
        return data;
    };
    BaseRelic.prototype.relicEffect = function () {
    };
    BaseRelic.prototype.recvMsg = function (cmd, data) {
    };
    /**回合开始效果 */
    BaseRelic.prototype.roundStartEffect = function () {
    };
    /**回合结束效果 */
    BaseRelic.prototype.roundEndEffect = function () {
    };
    /**回合中的效果 */
    BaseRelic.prototype.roundInEffect = function () {
    };
    return BaseRelic;
}(BaseModule));
__reflect(BaseRelic.prototype, "BaseRelic");
//# sourceMappingURL=BaseRelic.js.map