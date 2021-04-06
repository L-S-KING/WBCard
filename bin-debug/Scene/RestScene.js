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
/**休息处可以回复玩家25%的血量 */
var RestScene = (function (_super) {
    __extends(RestScene, _super);
    function RestScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "RestSceneSkin";
        return _this;
    }
    RestScene.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.addEvent();
        this.rest_btn.enabled = true;
        this.go_group.visible = true;
        this.isUseRest();
    };
    RestScene.prototype.isUseRest = function () {
        var player = CharacterManager.Instance.player;
        //判断是否有咖啡滤杯，如果有则不能休息。
        for (var i = 0; i < RelicManager.Instance.RelicArr.length; i++) {
            if (RelicManager.Instance.RelicArr[i].name == "CoffeeDripper") {
                // this.rest_btn.visible = false;
                this.rest_btn.enabled = false;
                return;
            }
            else {
                this.rest_btn.visible = true;
                this.rest_btn.enabled = true;
            }
        }
    };
    //接收消息
    RestScene.prototype.recvMsg = function (cmd, data) {
    };
    RestScene.prototype.addEvent = function () {
        this.addListener(this.rest_btn, egret.TouchEvent.TOUCH_BEGIN, this.rest, this);
        this.addListener(this.go_btn, egret.TouchEvent.TOUCH_BEGIN, this.goNext, this);
    };
    RestScene.prototype.rest = function () {
        var self = this;
        //玩家回复25%的生命值
        var value = GameManager.Instance.maxHealth;
        GameManager.Instance.curHealth += (Math.floor(value * 0.25));
        this.whiteRect.visible = true;
        self.rest_btn.enabled = false;
        egret.Tween.get(this.whiteRect).to({ alpha: 0 }, 800, egret.Ease.quartIn).call(show);
        function show() {
            self.whiteRect.visible = false;
            self.removeSelf();
        }
    };
    RestScene.prototype.goNext = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 800).call(this.removeSelf);
    };
    RestScene.prototype.removeSelf = function () {
        if (this.parent && this.parent.contains(this)) {
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
    return RestScene;
}(BaseScene));
__reflect(RestScene.prototype, "RestScene");
//# sourceMappingURL=RestScene.js.map