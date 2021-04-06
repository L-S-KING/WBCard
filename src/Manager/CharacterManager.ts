class CharacterManager
{
    private static _instance:CharacterManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new CharacterManager();
        }
        return this._instance;
    }

    private _monsterArr:BaseMonster[] = [];
    private _player:Player = null;
    private _baseHealth:number = 30;
    private _baseDefense:number = 6;
    private _attributeGain:AttributeGain = null;
    private _playerMaxPP:number = 3;
    private _playerPowerPlus:number = 0;
    public _curPlayerTextureHand:string = null    //当前玩家序列帧头
    public playerImgAnimCount:number = 0;         //当前玩家序列帧图片数量
    //private 
    
    public initData()
    {

    }

    public clearData()
    {
        this._monsterArr = [];
        if(this._player&&this._player.parent)
        {
            this._player.parent.removeChild(this._player);
        }
        this._player = null;
        this._playerPowerPlus = 0;
    }

    public get playerPowerPlus()
    {
        return this._playerPowerPlus;
    }

    public set playerPowerPlus(value:number)
    {
        this._playerPowerPlus += value;
    }

    public get playerMaxPP()
    {
        return this._playerMaxPP;
    }

    public saveCharacterData()
    {
        egret.localStorage.setItem("damageGainData",JSON.stringify(this._attributeGain));
    }

    public get baseHealth()
    {
        return this._baseHealth;
    }

    public get baseDefense()
    {
        return this._baseDefense;
    }

    public get attributeGain()
    {
        return this._attributeGain;
    }

    public get player()
    {
        return this._player;
    }

    

    public get monsterArr()
    {
        return this._monsterArr;
    }

    public pushMonsterToArr(monster:BaseMonster)
    {
        this._monsterArr.push(monster);
        this._monsterArr.sort(function(a,b){return a.x-b.x});
    }

    public createPlayer(sprite:egret.DisplayObjectContainer)
    {
        if(this._player)
        {
            //egret.error("玩家已经存在，创建失败")
        }
        else
        {
            this._player = new Player();
            sprite.addChild(this._player);
            //GlobalManager.Instance.addToLayer(this._player,LayerType.scene);
        }
    }

    /**从怪物数组移除怪物 */
    public removeMonster(obj:BaseMonster)
    {
        if(obj)
        {
            var index = this._monsterArr.indexOf(obj);
            if(index >= 0)
            {
                if(obj&&obj.parent.contains(obj))
                {
                    obj.parent.removeChild(obj);
                    this._monsterArr.splice(index,1);
                    this._monsterArr.sort(function(a,b){return a.x-a.x});
                    if(this._monsterArr.length<=0)
                    {
                        Message.instance.send(MsgCMD.CLEAR_LEVEL);
                        Message.instance.send(MsgCMD.GAME_ROUND_END);
                        GameManager.Instance.levelClear();
                    }
                }
            }
        }
        
    }
    //                             //1                 2           3        4           5      6         7            8            9               10
    // private monsterArrDefine = [DespicableGoblin,FatGoblin,FiregoBlin,GoblinWizard,Fungi,Heretic,MandiBularWorm,Robber,SlavemerChantBlue,SlavemerChantRed,
    // SlimeS,SlimeM,SlimeL,FirstWarrior,Guardian,FireGhost,AngryMan,DragonBoxing,PryingTree,Laguri,PriestTree,Variation]
    // //11      12   13      14       15          16        17     18         19          20          21      22      

    private monsterArrDefine = [DespicableGoblin,FatGoblin,FiregoBlin,GoblinWizard,Fungi,Heretic,MandiBularWorm,Robber,SlavemerChantBlue,SlavemerChantRed,
    SlimeS,SlimeM,SlimeL,FirstWarrior,Guardian,FireGhost,AngryMan,DragonBoxing,PryingTree,Laguri,PriestTree,Variation]
    
    public createMonsterByLevelData(sprite:egret.DisplayObjectContainer,levelNumber:number)
    {
        var levelData:LevelData = DataManager.Instance.getLevelDataByKey(levelNumber+"")
        var monsterData = levelData.monsterData;
        var monsterDataArr = monsterData.split(',');

        if(monsterDataArr.length>0)
        {
            var length = monsterDataArr.length;
            if(length%2 == 0)
            {
                var posX:number = 1000-length*0.5*200;
            }
            else
            {
                var posX:number = 1000-75-Math.floor(length*0.5)*200;
            }

            for(var i in monsterDataArr)
            {
                if(monsterDataArr[i]!="null")
                {
                    var monsterIndex = parseInt(monsterDataArr[i])-1;
                    var className = this.monsterArrDefine[monsterIndex];
                    var _data = {
                        name:null,            //角色的名称
                        originX:posX + parseInt(i)*200,         //角色的初始位置
                        originY:420+(parseInt(i)%2)*40,         
                        health:0,          //角色生命值
                        imgSource:null,       //角色的图片
                    }
                    var monster = new className(_data);
                    sprite.addChild(monster);
                    this._monsterArr.push(monster);
                }
                
            }
        }
    }
}
