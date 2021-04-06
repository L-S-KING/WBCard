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
var BaseUi = (function (_super) {
    __extends(BaseUi, _super);
    function BaseUi(data, skinName) {
        var _this = _super.call(this) || this;
        if (data) {
            _this.data = data;
        }
        if (skinName) {
            _this.skinName = skinName;
        }
        return _this;
    }
    BaseUi.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setImgIcon();
        this.addEvent();
    };
    BaseUi.prototype.initData = function () {
    };
    BaseUi.prototype.setImgIcon = function () {
    };
    BaseUi.prototype.addEvent = function () {
    };
    return BaseUi;
}(BaseModule));
__reflect(BaseUi.prototype, "BaseUi");
//# sourceMappingURL=BaseUi.js.map