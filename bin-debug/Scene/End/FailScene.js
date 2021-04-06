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
var FailScene = (function (_super) {
    __extends(FailScene, _super);
    function FailScene() {
        return _super.call(this) || this;
    }
    FailScene.prototype.initData = function () {
        this.title.text = "坏  灭";
        _super.prototype.initData.call(this);
    };
    return FailScene;
}(EndScene));
__reflect(FailScene.prototype, "FailScene");
//# sourceMappingURL=FailScene.js.map