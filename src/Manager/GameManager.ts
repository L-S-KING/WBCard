enum GameState
{
    Default,
    GameStart,
    PlayerRoundStart,
    PlayerRoundEnd,
    EnemyRoundStart,
    EnemyRoundEnd,
    GameEnd
}
class GameManager
{
    private static _instance:GameManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new GameManager();
        }
        return this._instance;
    }

    private _pause:boolean = false;                         //暂停
    private _curSelectCard:Card = null;                     //当前选择的卡片
    private _curPlayerPP:number = 0;                        //当前玩家的PP值
    private _canTouchCard:boolean = true                    //能否触摸卡牌
    private _curHandCardCount:number = 6;                  //当前手牌张数
    private _gameState:GameState = GameState.Default;       //当前游戏状态
    private _curSelectMonster:BaseMonster = null;           //当前选择的monster

    private _skipPlayerTurn:boolean=false;                  //是否跳过玩家回合 false不跳过 true跳过
    private _skipMonsterTurn:boolean=false;                 //是否跳过怪物回合 false不跳过 true跳过
    private _roundCount:number = 0;                         //回合次数
    /**跳过玩家回合次数 */
    public skipPlayerNumber:number=0;
    /**跳过怪物回合次数 */
    public skipEnemyNumber:number=0;

    private _curHealth:number = 90;                          //玩家当前血量
    private _maxHealth:number = 90;                          //玩家最大血量

    private _curCoin:number = 99;                            //玩家金币
    private _curLayer:number = 1;                            //当前层数
    private _curLevelType:number = 0;                        //当前关卡类型,0:普通怪物关，1：精英怪物关，2：boss
    public curSelectNodeId:number = 0;                       //当前选择的节点id
    public clearNodeIdArr:number[] = []                      //已经通关的节点id

    public curGameSceneBgTexture:string = null               //当前游戏背景纹理
    public curGameMapIndex:number = 1;
    public clearMapId:number[] = [];
    public mapIdArr:number[] = [1,2,3,4]

    public floor:number = 0;                                 //攀爬楼层
    public ordinary:number = 0;                              //击杀普通怪个数
    public elite:number = 0;                                 //击杀精英怪个数
    public boss:number = 0;                                  //击杀boss个数


    public gameContinue()
    {
        var userData:IUserData =  SaveManager.Instance.loadGame();
        this.clearMapId =  userData.clearMap;
        this.curCoin =  userData.coin;
        this.curHealth =  userData.curHealth;
        this.maxHealth = userData.maxHealth;
        this.curLayer = userData.curLayer;
        this.clearNodeIdArr = userData.clearNodeId;
        this.floor = userData.floor;
        this.ordinary = userData.ordinary;
        this.elite = userData.elite;
        this.boss = userData.boss;

        CharacterManager.Instance._curPlayerTextureHand = userData.playerTextureHand;
        CharacterManager.Instance.playerImgAnimCount = userData.playerAnimCount;
        this.curGameMapIndex =  userData.curMap;
        CardManager.Instance.haveCardId =  userData.holdCard;
        RelicManager.Instance.clearData();
        CardManager.Instance.initData();
        UiManager.Instance.addUiToUiLayer(PlayerUi,false,null,999)
        var relicIdArr:number[] = [];
        for(var i=0;i<userData.relic.length;i++)
        {
            relicIdArr.push(userData.relic[i]);
        }
        for(var i=0;i<relicIdArr.length;i++)
        {
            RelicManager.Instance.addRelicToPlayerById(relicIdArr[i]);
        }
        // RelicManager.Instance.playerHaveRelicIdArr =  userData.relic;
        SceneManager.Instance.addMapScene(new MapScene());
    }

    public gameClear()
    {
        SceneManager.Instance.removeCurScene();
        this.clearMapId.push(this.curGameMapIndex)
        if(this.clearMapId.length>=3)
        {
            egret.log("胜利")
            GlobalManager.Instance.removeAllObj();
            SceneManager.Instance.setCurScene(new SuccessScene());
            //添加胜利场景
        }
        else
        {
            this.initData();
            this.randomMapOpen();
        }
    }

    /**随机打开一张没有玩过的地图 */
    public randomMapOpen()
    {
        var randomIndex = Math.floor(Math.random()*this.mapIdArr.length);
        var mapId:number = this.mapIdArr[randomIndex];
        while(this.clearMapId.indexOf(mapId)>=0)
        {
            var randomIndex = Math.floor(Math.random()*this.mapIdArr.length);
            var mapId:number = this.mapIdArr[randomIndex];
        }
        this.curGameMapIndex = mapId;
        SceneManager.Instance.addMapScene(new MapScene())
    }

    /**加入通关的地图节点 */
    public addClearNodeToArr()
    {
        this.floor++;
        this.curLayer ++ ;
        this.clearNodeIdArr.push(this.curSelectNodeId)
    }

    public gameStart()
    {
        this.initData();
        UiManager.Instance.addUiToUiLayer(PlayerUi,false,null,999)
        this.randomMapOpen();
    }

    public levelClear()
    {
        var rewardUi = new RewardUi();
        GlobalManager.Instance.addToLayer(rewardUi,LayerType.ui,999);
        if(this._curLevelType == 2)
        {
            this.boss++;
            this.floor++;
        }
    }

    public set curLevelType(value:number)
    {
        this._curLevelType = value;
    }

    public get curLevelType()
    {
        return this._curLevelType;
    }

    public set curLayer(value:number)
    {
        this._curLayer = value;
        Message.instance.send(MsgCMD.PLAYER_LAYER_CHANGE);
    }

    public get curLayer()
    {
        return this._curLayer;
    }

    public set curCoin(value:number)
    {
        this._curCoin = Math.floor(value);
        Message.instance.send(MsgCMD.PLAYER_COIN_CHANGE);
    }

    public get curCoin()
    {
        return this._curCoin;
    }

    public set curHealth(value:number)
    {
        if(value>=this._maxHealth)
        {
            this._curHealth = this._maxHealth;
        }
        else
        {
            this._curHealth = value;
        }
        Message.instance.send(MsgCMD.PLAYER_HEALTH_CHANGE);
        if(!CharacterManager.Instance.player&&this._curHealth<=0)
        {
            Message.instance.send(MsgCMD.GAME_OVER);
            egret.Tween.get(this).to({},400).call(function(){
                GlobalManager.Instance.removeAllObj();
                SceneManager.Instance.setCurScene(new FailScene());
            })
            return;
        }
    }

    public get curHealth()
    {
        return this._curHealth;
    }

    public set maxHealth(value:number)
    {
        var changeValue = value - this._maxHealth;
        this._maxHealth = value;
        if(changeValue>0)
        {
            this.curHealth+=changeValue;
        }
        
        Message.instance.send(MsgCMD.PLAYER_HEALTH_CHANGE);
    }

    public get maxHealth()
    {
        return this._maxHealth;
    }

    public set roundCount(value:number)
    {
        this._roundCount = value;
    }

    public get roundCount()
    {
        return this._roundCount;
    }

    public set skipPlayerTurn(bol:boolean)
    {
        this._skipPlayerTurn = bol;
    }
    public get skipPlayerTurn()
    {
        return  this._skipPlayerTurn;
    }

    public set skipMonsterTurn(bol:boolean)
    {
        this._skipMonsterTurn = bol;
    }
    public get skipMonsterTurn()
    {
        return  this._skipMonsterTurn;
    }

    public get curSelectMonster()
    {
        return this._curSelectMonster;
    }

    public set curSelectMonster(value:BaseMonster)
    {
        this._curSelectMonster = value;
    }
    public set curHandCardCount(value:number)
    {
        this._curHandCardCount = value;
    }

    public get curHandCardCount()
    {
        return this._curHandCardCount;
    }

    public get canTouchCard()
    {
        return this._canTouchCard;
    }

    public set canTouchCard(bol:boolean)
    {
        this._canTouchCard = bol;
    }

    public set curPlayerPP(value:number)
    {
        this._curPlayerPP = value;
    }
    public get curPlayerPP()
    {
        return this._curPlayerPP;
    }
    
    public setCurSelectCard(card:Card)
    {
        this._curSelectCard = card;
    }

    public get curSelectCard()
    {
        return this._curSelectCard;
    }

    public get pause()
    {
        return this._pause;
    }

    public get gameState()
    {
        return this._gameState
    }

    public changeGameStart(state:GameState)
    {
        switch(state)
        {
            case GameState.GameStart:
            this._gameState = GameState.GameStart;
            break;
            case GameState.GameEnd:
            this._gameState = GameState.GameEnd;
            break;
            case GameState.PlayerRoundStart:
            this._gameState = GameState.PlayerRoundStart;
            break;
            case GameState.PlayerRoundEnd:
            this._gameState = GameState.PlayerRoundEnd;
            Message.instance.send(MsgCMD.PLAYER_ROUND_END);
            break;
            case GameState.EnemyRoundStart:
            this._gameState = GameState.EnemyRoundStart;

            Message.instance.send(MsgCMD.ENEMY_ROUND_START);
                
            break;
            case GameState.EnemyRoundEnd:
            this._gameState = GameState.EnemyRoundEnd;
            CardManager.Instance.isDoubleEffect = false;
            this._roundCount ++ ;
            Message.instance.send(MsgCMD.ENEMY_ROUND_END);
            Message.instance.send(MsgCMD.PLAYER_ROUND_START);
            
            break;
        }
    }



    public initData()
    {
        this.curLayer = 1;                            //当前层数
        this._curLevelType = 0;                        //当前关卡类型,0:普通怪物关，1：精英怪物关，2：boss
        this.curSelectNodeId = 0;                       //当前选择的节点id
        this.clearNodeIdArr = []                      //已经通关的节点id
        this._gameState = GameState.Default;
        CardManager.Instance.initData();
    }
}