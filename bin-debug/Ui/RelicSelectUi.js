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
var RelicSelectUi = (function (_super) {
    __extends(RelicSelectUi, _super);
    function RelicSelectUi(data) {
        var _this = _super.call(this) || this;
        _this.relic = null;
        if (data) {
            _this.data = data;
        }
        _this.skinName = "RelicSelectUiSkin";
        return _this;
    }
    RelicSelectUi.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.setImgIcon();
        this.addEvent();
    };
    RelicSelectUi.prototype.setImgIcon = function () {
        this.img_relic.source = this.data.img;
        this.label_detail.text = this.data.detail;
        this.label_detailName.text = this.data.detailName;
        this.relic = this.data.relic;
    };
    RelicSelectUi.prototype.addEvent = function () {
        this.addListener(this.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this.addListener(this.btn_ok, egret.TouchEvent.TOUCH_TAP, this.ok, this);
    };
    RelicSelectUi.prototype.ok = function () {
        if (this.relic) {
            this.relic.selectRelic();
        }
        else if (this.data.clsName) {
            if (this.data.coin) {
                if (this.data.coin > GameManager.Instance.curCoin) {
                    TipsManager.Instance.createTips("金币不足");
                    return;
                }
                else {
                    GameManager.Instance.curCoin -= this.data.coin;
                    RelicManager.Instance.addRelic(this.data.clsName);
                    Message.instance.send(MsgCMD.RELIC_SELECT_OVER, this.data);
                }
            }
            else {
                RelicManager.Instance.addRelic(this.data.clsName);
                Message.instance.send(MsgCMD.RELIC_SELECT_OVER, this.data);
            }
        }
        this.removeSelf();
    };
    RelicSelectUi.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return RelicSelectUi;
}(BaseModule));
__reflect(RelicSelectUi.prototype, "RelicSelectUi");
//# sourceMappingURL=RelicSelectUi.js.map