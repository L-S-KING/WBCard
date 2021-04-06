class DataManager
{
    private static _instance:DataManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new DataManager();
        }
        return this._instance;
    }

    public levelDataList:any;
    public cardDataList:any;
    public PlayerDataList:any;
    public buffDataList:any;
    public MonsterActionDataList:any;
    public relicDataList:any;
    public mapData1List:any;
    public mapData2List:any;
    public mapData3List:any;
    public mapData4List:any;

    public initData()
    {
        this.levelDataList = RES.getRes("LevelDefine_json");
        this.cardDataList = RES.getRes("CardDefine_json");
        this.PlayerDataList = RES.getRes("PlayerDefine_json")
        this.buffDataList = RES.getRes("BuffDefine_json");
        this.MonsterActionDataList = RES.getRes("MonsterActionDefine_json");
        this.relicDataList = RES.getRes("RelicDefine_json");
        this.mapData1List = RES.getRes("Map1Define_json");
        this.mapData2List = RES.getRes("Map2Define_json");
        this.mapData3List = RES.getRes("Map3Define_json");
        this.mapData4List = RES.getRes("Map4Define_json");
    }

    /**取得对应地图的节点数 */
    public getMapNodeCount(map:number):number
    {
        switch(map)
        {
            case 1:
            var count = this.mapData1List["nodeCount"]
            break;
            case 2:
            var count = this.mapData2List["nodeCount"]
            break;
            case 3:
            var count = this.mapData3List["nodeCount"]
            break;
            case 4:
            var count = this.mapData4List["nodeCount"]
            break;
        }
        return count;
    }

    /**根据id取得地图节点的节点数据 */
    public getMapNodeDataById(id:string):MapNodeData
    {
        switch(GameManager.Instance.curGameMapIndex)
        {
            case 1:
            var mapNodeData:MapNodeData = this.mapData1List[id];
            break;
            case 2:
            var mapNodeData:MapNodeData = this.mapData2List[id];
            break;
            case 3:
            var mapNodeData:MapNodeData = this.mapData3List[id];
            break;
            case 4:
            var mapNodeData:MapNodeData = this.mapData4List[id];
            break;
        }
        if(mapNodeData)
        {
            return mapNodeData;
        }
        else
        {
            //egret.error("找不到1地图"+id+"节点数据")
            return null;
        }
    }

    public getRelicDataByKey(key:string):RelicData
    {
        var relicData:RelicData = this.relicDataList[key];
        if(relicData)
        {
            return relicData;
        }
        else
        {
            //egret.error("没有" + key + "遗物数据");
            return null;
        }
    }

    public getMonsterActionDataById(id:string)
    {
        var monsterActionData:MonsterActionData = this.MonsterActionDataList[id];
        if(monsterActionData)
        {
            return monsterActionData;
        }
        else
        {
            //egret.error("找不到"+id+"monsterAction数据");
            return null;
        }
    }

    public getBuffDataByName(name:string)
    {
        var buffData:BuffData = this.buffDataList[name];
        if(buffData)
        {
            return buffData;
        }
        else
        {
            //egret.error("找不到"+name+"buff数据。");
            return null;
        }
    }

    public getPlayerDataByName(name:string)
    {
        var playerData:CharacterData = this.PlayerDataList[name];
        if(playerData)
        {
            return playerData;
        }
        else
        {
            //egret.error("没有"+name+"角色信息")
            return null;
        }
    }

    public getLevelDataByKey(key:string)
    {
        var levelData:LevelData = this.levelDataList[key];
        if(levelData)
        {
            return levelData;
        }
        else
        {
            //egret.error("没有"+key+"关卡信息");
            return null;
        }
    }

    public getCardDataByIdKey(key:string):CardData
    {
        var cardData:CardData = this.cardDataList[key];
        if(cardData)
        {
            return cardData;
        }
        else
        {
           // egret.error("没有"+key+"卡数据");
            return null;
        }
    }
}

interface MapNodeData
{
    id:number,
    posX:number,
    posY:number,
    nodeType:string,
    frondNode:string,
    layer:number,
    levelId:number
}

interface CharacterData
{
    name:string,            //角色的名称
    originX:number,         //角色的初始位置
    originY:number,         
    health:number,          //角色生命值
    imgSource:string,       //角色的图片
}

interface LevelData
{
    id:number,              
    levelType:number,       //0为普通怪物，1为精英怪，2为boss
    monsterData:string,
    rewardsData:string,
}

interface CardData
{
    id:number,              //id
    pp:number,              //卡牌消耗的PP点
    type:number,            //0为指向性牌，1为非指向性牌
    cardEffectType:number,  //0为攻击牌，1为效果牌，2为能力牌
    getType:number,         //0为基础牌，1为稀有牌，2位非卖牌
    name:string,            //卡牌名字
    imgIcon:string,         //卡牌显示的图片
    buff:string,            //卡牌所有的buff数据
    buffValue:string,       //卡牌所有的buff对应的buff数值
    damageType:string,      //卡牌所有的伤害类型
    damageValue:string,     //卡牌所有的伤害类型所对应的伤害值
    damageVfx:string,       //卡牌对应的伤害特效
    imgPortrait:string,     //卡骗展示图片
    sp:string,              //卡牌的特殊类型功能
    spValue:string          //卡牌特殊类型对应的数值
}

interface BuffData
{
    name:string,
    detailName:string,
    type:number,
    detail:string,
    img:string,
    value:number,
    gainType:number
}

interface MonsterActionData
{
    id:number,
    detail:string,
    img:string
}


interface RelicData
{
    name:string,
    detailName:string,
    type:number,
    detail:string,
    img:string
}
