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
var BaseSpecialEvent = (function (_super) {
    __extends(BaseSpecialEvent, _super);
    function BaseSpecialEvent() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "SpecialEventSkin";
        _this.y = 50;
        return _this;
    }
    //接收消息
    BaseSpecialEvent.prototype.recvMsg = function (cmd, data) {
    };
    BaseSpecialEvent.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.addEvent();
        this.initData();
    };
    BaseSpecialEvent.prototype.initData = function () {
    };
    BaseSpecialEvent.prototype.addEvent = function () {
    };
    BaseSpecialEvent.prototype.notConfirm = function () {
        this.removeSelf();
    };
    BaseSpecialEvent.prototype.removefromViewPort = function (e) {
        _super.prototype.removefromViewPort.call(this, e);
    };
    BaseSpecialEvent.prototype.removeSelf = function () {
        if (this && this.parent && this.parent.contains(this)) {
            EventManager.Instance.tapCount = 0;
            if (egret.localStorage.getItem("userData")) {
                var userData = SaveManager.Instance.loadGame();
                userData.tap = 0;
            }
            SaveManager.Instance.saveGame();
            this.parent.removeChild(this);
            GameManager.Instance.addClearNodeToArr();
            SceneManager.Instance.addMapScene(new MapScene());
        }
    };
    return BaseSpecialEvent;
}(BaseModule));
__reflect(BaseSpecialEvent.prototype, "BaseSpecialEvent");
//# sourceMappingURL=BaseSpecialEvent.js.map