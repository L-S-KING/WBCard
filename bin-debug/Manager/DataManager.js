var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataManager = (function () {
    function DataManager() {
    }
    Object.defineProperty(DataManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new DataManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    DataManager.prototype.initData = function () {
        this.levelDataList = RES.getRes("LevelDefine_json");
        this.cardDataList = RES.getRes("CardDefine_json");
        this.PlayerDataList = RES.getRes("PlayerDefine_json");
        this.buffDataList = RES.getRes("BuffDefine_json");
        this.MonsterActionDataList = RES.getRes("MonsterActionDefine_json");
        this.relicDataList = RES.getRes("RelicDefine_json");
        this.mapData1List = RES.getRes("Map1Define_json");
        this.mapData2List = RES.getRes("Map2Define_json");
        this.mapData3List = RES.getRes("Map3Define_json");
        this.mapData4List = RES.getRes("Map4Define_json");
    };
    /**取得对应地图的节点数 */
    DataManager.prototype.getMapNodeCount = function (map) {
        switch (map) {
            case 1:
                var count = this.mapData1List["nodeCount"];
                break;
            case 2:
                var count = this.mapData2List["nodeCount"];
                break;
            case 3:
                var count = this.mapData3List["nodeCount"];
                break;
            case 4:
                var count = this.mapData4List["nodeCount"];
                break;
        }
        return count;
    };
    /**根据id取得地图节点的节点数据 */
    DataManager.prototype.getMapNodeDataById = function (id) {
        switch (GameManager.Instance.curGameMapIndex) {
            case 1:
                var mapNodeData = this.mapData1List[id];
                break;
            case 2:
                var mapNodeData = this.mapData2List[id];
                break;
            case 3:
                var mapNodeData = this.mapData3List[id];
                break;
            case 4:
                var mapNodeData = this.mapData4List[id];
                break;
        }
        if (mapNodeData) {
            return mapNodeData;
        }
        else {
            //egret.error("找不到1地图"+id+"节点数据")
            return null;
        }
    };
    DataManager.prototype.getRelicDataByKey = function (key) {
        var relicData = this.relicDataList[key];
        if (relicData) {
            return relicData;
        }
        else {
            //egret.error("没有" + key + "遗物数据");
            return null;
        }
    };
    DataManager.prototype.getMonsterActionDataById = function (id) {
        var monsterActionData = this.MonsterActionDataList[id];
        if (monsterActionData) {
            return monsterActionData;
        }
        else {
            //egret.error("找不到"+id+"monsterAction数据");
            return null;
        }
    };
    DataManager.prototype.getBuffDataByName = function (name) {
        var buffData = this.buffDataList[name];
        if (buffData) {
            return buffData;
        }
        else {
            //egret.error("找不到"+name+"buff数据。");
            return null;
        }
    };
    DataManager.prototype.getPlayerDataByName = function (name) {
        var playerData = this.PlayerDataList[name];
        if (playerData) {
            return playerData;
        }
        else {
            //egret.error("没有"+name+"角色信息")
            return null;
        }
    };
    DataManager.prototype.getLevelDataByKey = function (key) {
        var levelData = this.levelDataList[key];
        if (levelData) {
            return levelData;
        }
        else {
            //egret.error("没有"+key+"关卡信息");
            return null;
        }
    };
    DataManager.prototype.getCardDataByIdKey = function (key) {
        var cardData = this.cardDataList[key];
        if (cardData) {
            return cardData;
        }
        else {
            // egret.error("没有"+key+"卡数据");
            return null;
        }
    };
    DataManager._instance = null;
    return DataManager;
}());
__reflect(DataManager.prototype, "DataManager");
//# sourceMappingURL=DataManager.js.map