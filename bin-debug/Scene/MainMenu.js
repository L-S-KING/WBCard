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
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainMenuSceneSkin";
        return _this;
    }
    MainMenu.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.addEvent();
    };
    MainMenu.prototype.initData = function () {
        egret.Tween.get(this.label_tips, { loop: true }).to({ alpha: 0 }, 1000).to({ alpha: 0.4 }, 1000);
        this.isHaveSaveData = SaveManager.Instance.loadGame();
        if (!this.isHaveSaveData) {
            this.btn_continue.visible = false;
        }
    };
    MainMenu.prototype.addEvent = function () {
        this.addListener(this.btn_start, egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
        this.addListener(this.btn_continue, egret.TouchEvent.TOUCH_TAP, this.gameContinue, this);
        this.addListener(this.btn_end, egret.TouchEvent.TOUCH_TAP, this.endGame, this);
    };
    MainMenu.prototype.gameStart = function () {
        egret.localStorage.clear();
        SceneManager.Instance.setCurScene(new PlayerSelectScene());
    };
    MainMenu.prototype.gameContinue = function () {
        GameManager.Instance.gameContinue();
        this.removeSelf();
    };
    MainMenu.prototype.endGame = function () {
        window.close();
    };
    MainMenu.prototype.removeSelf = function () {
        if (this && this.parent && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return MainMenu;
}(BaseScene));
__reflect(MainMenu.prototype, "MainMenu");
//# sourceMappingURL=MainMenu.js.map