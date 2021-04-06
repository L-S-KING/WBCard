var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RelicManager = (function () {
    function RelicManager() {
        this._relicNameArr = [BirdUrn, BlackBlood, BombEgg, ClericFace, CoffeeDripper, Ginger, GremlinHorn, IceCream, LizardTail, Marbles, Orichalcum,
            Pantograph, PaperFrog, RedSkull, Shovel, SnakeSkull, SneckoEye, SpiritPoop, Strawberry];
        this.haveRelicId = [];
        this.relicArr = [];
        this.selectRelic = [];
        this._canSelectRelicCount = 1;
    }
    Object.defineProperty(RelicManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new RelicManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    RelicManager.prototype.clearData = function () {
        this.haveRelicId = [];
        for (var i = 0; i < this.relicArr.length; i++) {
            if (this.relicArr[i] && this.relicArr[i].parent && this.relicArr[i].parent.contains(this.relicArr[i])) {
                this.relicArr[i].parent.removeChild(this.relicArr[i]);
                this.relicArr.splice(i, 1);
                i--;
            }
        }
        this.relicArr = [];
        for (var i = 0; i < this.selectRelic.length; i++) {
            if (this.selectRelic[i] && this.selectRelic[i].parent && this.selectRelic[i].parent.contains(this.selectRelic[i])) {
                this.selectRelic[i].parent.removeChild(this.selectRelic[i]);
                this.selectRelic.splice(i, 1);
                i--;
            }
        }
        this.selectRelic = [];
        this._canSelectRelicCount = 1;
    };
    Object.defineProperty(RelicManager.prototype, "playerHaveRelicIdArr", {
        get: function () {
            return this.haveRelicId;
        },
        set: function (value) {
            this.haveRelicId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RelicManager.prototype, "relicNameArr", {
        get: function () {
            return this._relicNameArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RelicManager.prototype, "RelicArr", {
        get: function () {
            return this.relicArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RelicManager.prototype, "canSelectRelicCount", {
        get: function () {
            return this._canSelectRelicCount;
        },
        set: function (value) {
            this._canSelectRelicCount = value;
        },
        enumerable: true,
        configurable: true
    });
    /**添加装备到玩家 */
    RelicManager.prototype.addRelicToPlayer = function () {
        if (this.haveRelicId.length >= this._relicNameArr.length) {
            TipsManager.Instance.createTips("遗物获得上限");
            return;
        }
        var index = Math.floor(Math.random() * this.relicNameArr.length);
        while (this.haveRelicId.indexOf(index) >= 0) {
            index = Math.floor(Math.random() * this.relicNameArr.length);
        }
        var clsName = this.relicNameArr[index];
        var data = DataManager.Instance.getRelicDataByKey(egret.getQualifiedClassName(clsName));
        var relic = new clsName(data, true);
        GlobalManager.Instance.addToLayer(relic, LayerType.ui, 5);
        return relic;
    };
    RelicManager.prototype.addRelicToPlayerById = function (id) {
        if (this.haveRelicId.length >= this._relicNameArr.length) {
            TipsManager.Instance.createTips("遗物获得上限");
            return;
        }
        var clsName = this.relicNameArr[id];
        var data = DataManager.Instance.getRelicDataByKey(egret.getQualifiedClassName(clsName));
        var relic = new clsName(data, true);
        GlobalManager.Instance.addToLayer(relic, LayerType.ui, 5);
        return relic;
    };
    /**添加选择装备 */
    RelicManager.prototype.createSelectRelic = function () {
        if (this.haveRelicId.length >= this._relicNameArr.length) {
            TipsManager.Instance.createTips("遗物获得上限");
            return;
        }
        var index = Math.floor(Math.random() * this.relicNameArr.length);
        while (this.haveRelicId.indexOf(index) >= 0) {
            index = Math.floor(Math.random() * this.relicNameArr.length);
        }
        var clsName = this.relicNameArr[index];
        var data = DataManager.Instance.getRelicDataByKey(egret.getQualifiedClassName(clsName));
        var relic = new clsName(data, false);
        GlobalManager.Instance.addToLayer(relic, LayerType.ui, 5);
        return relic;
    };
    RelicManager.prototype.randomGetRelicCls = function () {
        if (this.haveRelicId.length >= this._relicNameArr.length) {
            TipsManager.Instance.createTips("遗物获得上限");
            return;
        }
        var index = Math.floor(Math.random() * this.relicNameArr.length);
        while (this.haveRelicId.indexOf(index) >= 0) {
            index = Math.floor(Math.random() * this.relicNameArr.length);
        }
        var clsName = this.relicNameArr[index];
        return clsName;
    };
    RelicManager.prototype.getRelicArr = function () {
        return this.relicArr;
    };
    /**添加一个装备到玩家持有数组 */
    RelicManager.prototype.pushRelicToArr = function (relic) {
        if (this.haveRelicId.length >= this._relicNameArr.length) {
            TipsManager.Instance.createTips("遗物获得上限");
            return;
        }
        this.relicArr.push(relic);
        this.haveRelicId.push(relic.id);
        var posX = 20 + (this.relicArr.length - 1) * 30;
        var posY = 30;
        Message.instance.send(MsgCMD.ITEM_GET, relic.name);
        egret.Tween.get(relic).to({ x: posX, y: posY, scaleX: 1, scaleY: 1 }, 300, egret.Ease.sineIn);
    };
    /**添加装备 */
    RelicManager.prototype.addRelic = function (cls) {
        if (this.haveRelicId.length >= this._relicNameArr.length) {
            TipsManager.Instance.createTips("遗物获得上限");
            return;
        }
        if (cls) {
            var key = egret.getQualifiedClassName(cls);
            var data = DataManager.Instance.getRelicDataByKey(key);
            var relic = new cls(data, true);
            GlobalManager.Instance.addToLayer(relic, LayerType.ui, 5);
        }
    };
    RelicManager._instance = null;
    return RelicManager;
}());
__reflect(RelicManager.prototype, "RelicManager");
//# sourceMappingURL=RelicManager.js.map