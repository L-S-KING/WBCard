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
var SuccessScene = (function (_super) {
    __extends(SuccessScene, _super);
    function SuccessScene() {
        return _super.call(this) || this;
    }
    SuccessScene.prototype.initData = function () {
        this.title.text = "N   B";
        _super.prototype.initData.call(this);
    };
    return SuccessScene;
}(EndScene));
__reflect(SuccessScene.prototype, "SuccessScene");
//# sourceMappingURL=SuccessScene.js.map