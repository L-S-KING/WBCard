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
var PauseUi = (function (_super) {
    __extends(PauseUi, _super);
    function PauseUi(data) {
        var _this = _super.call(this, data, "PauseUiSkin") || this;
        _this.name = egret.getQualifiedClassName(PauseUi);
        return _this;
    }
    PauseUi.prototype.addToViewPort = function () {
    };
    return PauseUi;
}(BaseUi));
__reflect(PauseUi.prototype, "PauseUi");
//# sourceMappingURL=PauseUi.js.map