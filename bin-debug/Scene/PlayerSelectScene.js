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
var PlayerSelectScene = (function (_super) {
    __extends(PlayerSelectScene, _super);
    function PlayerSelectScene() {
        var _this = _super.call(this) || this;
        _this.playerIndex = 0;
        _this.roleHealth = [85, 70, 90];
        _this.roleRefilc = [BlackBlood, IceCream, Orichalcum];
        _this.roleTextureHand = ["man_", "Asu000_0", "ichi_"];
        _this.roleAnimImgCount = [9, 8, 12];
        _this.skinName = "PlayerSelectSceneSkin";
        return _this;
    }
    PlayerSelectScene.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.addEvent();
    };
    PlayerSelectScene.prototype.initData = function () {
        this.playerIndex = 0;
        this.roleHealth = [85, 70, 90];
        this.roleRefilc = [BlackBlood, IceCream, Orichalcum];
        this.roleTextureHand = ["man_", "Asu000_0", "ichi_"];
        this.roleAnimImgCount = [9, 8, 12];
    };
    PlayerSelectScene.prototype.addEvent = function () {
        this.addListener(this.radioBtn.group, eui.UIEvent.CHANGE, this.select, this);
        this.addListener(this.btn_ok, egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
    };
    PlayerSelectScene.prototype.select = function (e) {
        var radioGroup = e.target;
        if (RES.getRes("role_" + radioGroup.selectedValue + "_bg_png")) {
            this.role_bg.source = "role_" + radioGroup.selectedValue + "_bg_png";
        }
        else {
            this.role_bg.source = null;
        }
        this.label_heart.text = this.roleHealth[radioGroup.selectedValue] + "/" + this.roleHealth[radioGroup.selectedValue];
        var refilcName = egret.getQualifiedClassName(this.roleRefilc[radioGroup.selectedValue]);
        var data = DataManager.Instance.getRelicDataByKey(refilcName);
        this.label_reflic.text = data.detail;
        this.img_refilc.source = data.img;
        this.playerIndex = radioGroup.selectedValue;
    };
    PlayerSelectScene.prototype.gameStart = function () {
        EventManager.Instance.tapCount = 0;
        if (egret.localStorage.getItem("userData")) {
            var userData = SaveManager.Instance.loadGame();
            userData.tap = 0;
        }
        SaveManager.Instance.saveGame();
        GameManager.Instance.floor = 0;
        GameManager.Instance.ordinary = 0;
        GameManager.Instance.elite = 0;
        GameManager.Instance.boss = 0;
        var that = this;
        GameManager.Instance.maxHealth = that.roleHealth[that.playerIndex];
        GameManager.Instance.curHealth = that.roleHealth[that.playerIndex];
        CharacterManager.Instance._curPlayerTextureHand = that.roleTextureHand[that.playerIndex];
        CharacterManager.Instance.playerImgAnimCount = that.roleAnimImgCount[that.playerIndex];
        GameManager.Instance.curCoin = 99;
        GameManager.Instance.clearMapId = [];
        RelicManager.Instance.clearData();
        CardManager.Instance.haveCardId = [1, 1, 1, 1, 1, 2, 2, 2, 2];
        var data = CardManager.Instance.randomGetCardData();
        while (data.id == 1 || data.id == 2) {
            var data = CardManager.Instance.randomGetCardData();
        }
        CardManager.Instance.haveCardId.push(data.id);
        GameManager.Instance.gameStart();
        RelicManager.Instance.addRelic(that.roleRefilc[that.playerIndex]);
        this.parent.removeChild(this);
    };
    return PlayerSelectScene;
}(BaseScene));
__reflect(PlayerSelectScene.prototype, "PlayerSelectScene");
//# sourceMappingURL=PlayerSelectScene.js.map