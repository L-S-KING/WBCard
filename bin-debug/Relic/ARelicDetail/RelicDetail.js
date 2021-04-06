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
var RelicDetail = (function (_super) {
    __extends(RelicDetail, _super);
    function RelicDetail(data) {
        var _this = _super.call(this) || this;
        _this.relicIndex = 0;
        if (data) {
            _this.data = data;
        }
        _this.skinName = "RelicDetailSkin";
        return _this;
    }
    RelicDetail.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.setImgIcon();
        this.addEvent();
    };
    RelicDetail.prototype.setImgIcon = function () {
        this.img_relic.source = this.data.img;
        this.label_detail.text = this.data.detail;
        this.label_detailName.text = this.data.detailName;
        this.relicIndex = this.data.index;
    };
    RelicDetail.prototype.addEvent = function () {
        this.addListener(this.btn_left, egret.TouchEvent.TOUCH_BEGIN, this.changeRelic, this);
        this.addListener(this.btn_right, egret.TouchEvent.TOUCH_BEGIN, this.changeRelic, this);
        this.addListener(this.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
    };
    RelicDetail.prototype.changeRelic = function (e) {
        if (e.target == this.btn_left) {
            if (this.relicIndex > 0) {
                this.data = RelicManager.Instance.RelicArr[this.relicIndex - 1].getRelicData();
                this.setImgIcon();
            }
        }
        else if (e.target == this.btn_right) {
            if (this.relicIndex < RelicManager.Instance.RelicArr.length - 1) {
                this.data = RelicManager.Instance.RelicArr[this.relicIndex + 1].getRelicData();
                this.setImgIcon();
            }
        }
    };
    RelicDetail.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return RelicDetail;
}(BaseModule));
__reflect(RelicDetail.prototype, "RelicDetail");
//# sourceMappingURL=RelicDetail.js.map