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
var EndScene = (function (_super) {
    __extends(EndScene, _super);
    function EndScene() {
        var _this = _super.call(this) || this;
        _this.floorCount = 0;
        _this.floorGrade = 0;
        _this.ordinaryCount = 0;
        _this.ordinaryGrade = 0;
        _this.eliteCount = 0;
        _this.eliteGrade = 0;
        _this.bossCount = 0;
        _this.bossGrade = 0;
        _this.totalGrade = 0;
        egret.localStorage.clear();
        _this.skinName = "EndSceneSkin";
        _this.alpha = 0;
        return _this;
    }
    EndScene.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.addEvent();
        this.initData();
    };
    EndScene.prototype.initData = function () {
        this.floorCount = GameManager.Instance.floor;
        this.floorNum.text = "（" + this.floorCount + "）";
        this.floorGrade = this.floorCount * 5;
        this.floorScore.text = "" + this.floorGrade;
        this.ordinaryCount = GameManager.Instance.ordinary;
        this.ordinaryNum.text = "（" + this.ordinaryCount + "）";
        this.ordinaryGrade = this.ordinaryCount * 10;
        this.ordinaryScore.text = "" + this.ordinaryGrade;
        this.eliteCount = GameManager.Instance.elite;
        this.eliteNum.text = "（" + this.eliteCount + "）";
        this.eliteGrade = this.eliteCount * 20;
        this.eliteScore.text = "" + this.eliteGrade;
        this.bossCount = GameManager.Instance.boss;
        this.bossNum.text = "（" + this.bossCount + "）";
        this.bossGrade = this.bossCount * 50;
        this.bossScore.text = "" + this.bossGrade;
        this.totalGrade = this.floorGrade + this.ordinaryGrade + this.eliteGrade + this.bossGrade;
        this.totalScore.text = "" + this.totalGrade;
    };
    EndScene.prototype.addEvent = function () {
        egret.Tween.get(this).to({ alpha: 1 }, 500, egret.Ease.sineIn);
        this.addListener(this.mainMenu, egret.TouchEvent.TOUCH_TAP, this.backMenu, this);
    };
    EndScene.prototype.backMenu = function () {
        SceneManager.Instance.setCurScene(new MainMenu());
    };
    return EndScene;
}(BaseScene));
__reflect(EndScene.prototype, "EndScene");
//# sourceMappingURL=EndlScene.js.map