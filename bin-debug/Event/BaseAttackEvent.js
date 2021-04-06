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
var BaseAttackEvent = (function (_super) {
    __extends(BaseAttackEvent, _super);
    function BaseAttackEvent() {
        var _this = _super.call(this) || this;
        _this.clicks = 0; //点击次数
        _this.skinName = "AttackEvent";
        return _this;
    }
    BaseAttackEvent.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.addEvent();
        this.initData();
    };
    BaseAttackEvent.prototype.initData = function () {
    };
    BaseAttackEvent.prototype.addEvent = function () {
        this.addListener(this.buttonUp, egret.TouchEvent.TOUCH_BEGIN, this.buttonUpTap, this);
        this.addListener(this.buttonDown, egret.TouchEvent.TOUCH_BEGIN, this.buttonDownTap, this);
    };
    BaseAttackEvent.prototype.buttonUpTap = function () {
    };
    BaseAttackEvent.prototype.buttonDownTap = function () {
    };
    BaseAttackEvent.prototype.removeSelf = function () {
        if (this && this.parent != null) {
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
    return BaseAttackEvent;
}(BaseScene));
__reflect(BaseAttackEvent.prototype, "BaseAttackEvent");
//# sourceMappingURL=BaseAttackEvent.js.map