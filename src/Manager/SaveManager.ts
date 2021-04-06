class SaveManager
{
    private static _instance:SaveManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new SaveManager();
        }
        return this._instance;
    }

    public saveHoldCardKey = "holdCard";
    public saveCoinKey = "coin";
    public saveCurHealthKey = "curHealth";
    public saveMaxHealthKey = "maxHealth";
    public saveRelicKey = "relic";
    public saveMapIndexKey = "curMap";
    public saveClearMapKey = "clearMap";
    public isHaveSaveData:boolean = false;
    public userData:UserData;

    public saveGame()
    {
        
        var data:UserData = new UserData();
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
        var userData:IUserData = data;
        var dataValue = JSON.stringify(userData);
        egret.localStorage.setItem("userData",dataValue);
        
    }

    public loadGame()
    {
        var data = JSON.parse(egret.localStorage.getItem("userData"));
        var userData:IUserData = data;
        if(userData)
        {
            this.userData = userData;
        }
        return userData;
    }
}
class UserData
{
    public holdCard:number[];
    public coin:number;
    public curHealth:number;
    public maxHealth:number;
    public relic:number[];
    public curMap:number;
    public clearMap:number[];
    public playerTextureHand:string;
    public playerAnimCount:number;
    public curLayer:number;
    public clearNodeId:number[];
    public floor:number = 0;                                 //攀爬楼层
    public ordinary:number = 0;                              //击杀普通怪个数
    public elite:number = 0;                                 //击杀精英怪个数
    public boss:number = 0;
    public tap:number = 0;;                                       //问号点击次数
}

interface IUserData
{
    holdCard:number[];
    coin:number;
    curHealth:number;
    maxHealth:number;
    relic:number[];
    curMap:number;
    clearMap:number[];
    playerTextureHand:string;
    playerAnimCount:number;
    curLayer:number;
    clearNodeId:number[];
    floor:number;
    ordinary:number;
    elite:number;
    boss:number;
    tap:number;
}