var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SaveManager = (function () {
    function SaveManager() {
        this.saveHoldCardKey = "holdCard";
        this.saveCoinKey = "coin";
        this.saveCurHealthKey = "curHealth";
        this.saveMaxHealthKey = "maxHealth";
        this.saveRelicKey = "relic";
        this.saveMapIndexKey = "curMap";
        this.saveClearMapKey = "clearMap";
        this.isHaveSaveData = false;
    }
    Object.defineProperty(SaveManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new SaveManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SaveManager.prototype.saveGame = function () {
        var data = new UserData();
        data.clearMap = GameManager.Instance.clearMapId;
        data.coin = GameManager.Instance.curCoin;
        data.curHealth = GameManager.Instance.curHealth;
        data.curMap = GameManager.Instance.curGameMapIndex;
        data.holdCard = CardManager.Instance.haveCardId;
        data.maxHealth = GameManager.Instance.maxHealth;
        data.relic = RelicManager.Instance.playerHaveRelicIdArr;
        data.playerTextureHand = CharacterManager.Instance._curPlayerTextureHand;
        data.playerAnimCount = CharacterManager.Instance.playerImgAnimCount;
        data.clearNodeId = GameManager.Instance.clearNodeIdArr;
        data.curLayer = GameManager.Instance.curLayer;
        data.floor = GameManager.Instance.floor;
        data.ordinary = GameManager.Instance.ordinary;
        data.elite = GameManager.Instance.elite;
        data.boss = GameManager.Instance.boss;
        data.tap = EventManager.Instance.tapCount;
        var userData = data;
        var dataValue = JSON.stringify(userData);
        egret.localStorage.setItem("userData", dataValue);
    };
    SaveManager.prototype.loadGame = function () {
        var data = JSON.parse(egret.localStorage.getItem("userData"));
        var userData = data;
        if (userData) {
            this.userData = userData;
        }
        return userData;
    };
    SaveManager._instance = null;
    return SaveManager;
}());
__reflect(SaveManager.prototype, "SaveManager");
var UserData = (function () {
    function UserData() {
        this.floor = 0; //攀爬楼层
        this.ordinary = 0; //击杀普通怪个数
        this.elite = 0; //击杀精英怪个数
        this.boss = 0;
        this.tap = 0;
    }
    ; //问号点击次数
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
//# sourceMappingURL=SaveManager.js.map