var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CharacterManager = (function () {
    function CharacterManager() {
        this._monsterArr = [];
        this._player = null;
        this._baseHealth = 30;
        this._baseDefense = 6;
        this._attributeGain = null;
        this._playerMaxPP = 3;
        this._playerPowerPlus = 0;
        this._curPlayerTextureHand = null; //当前玩家序列帧头
        this.playerImgAnimCount = 0; //当前玩家序列帧图片数量
        //                             //1                 2           3        4           5      6         7            8            9               10
        // private monsterArrDefine = [DespicableGoblin,FatGoblin,FiregoBlin,GoblinWizard,Fungi,Heretic,MandiBularWorm,Robber,SlavemerChantBlue,SlavemerChantRed,
        // SlimeS,SlimeM,SlimeL,FirstWarrior,Guardian,FireGhost,AngryMan,DragonBoxing,PryingTree,Laguri,PriestTree,Variation]
        // //11      12   13      14       15          16        17     18         19          20          21      22      
        this.monsterArrDefine = [DespicableGoblin, FatGoblin, FiregoBlin, GoblinWizard, Fungi, Heretic, MandiBularWorm, Robber, SlavemerChantBlue, SlavemerChantRed,
            SlimeS, SlimeM, SlimeL, FirstWarrior, Guardian, FireGhost, AngryMan, DragonBoxing, PryingTree, Laguri, PriestTree, Variation];
    }
    Object.defineProperty(CharacterManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new CharacterManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //private 
    CharacterManager.prototype.initData = function () {
    };
    CharacterManager.prototype.clearData = function () {
        this._monsterArr = [];
        if (this._player && this._player.parent) {
            this._player.parent.removeChild(this._player);
        }
        this._player = null;
        this._playerPowerPlus = 0;
    };
    Object.defineProperty(CharacterManager.prototype, "playerPowerPlus", {
        get: function () {
            return this._playerPowerPlus;
        },
        set: function (value) {
            this._playerPowerPlus += value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterManager.prototype, "playerMaxPP", {
        get: function () {
            return this._playerMaxPP;
        },
        enumerable: true,
        configurable: true
    });
    CharacterManager.prototype.saveCharacterData = function () {
        egret.localStorage.setItem("damageGainData", JSON.stringify(this._attributeGain));
    };
    Object.defineProperty(CharacterManager.prototype, "baseHealth", {
        get: function () {
            return this._baseHealth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterManager.prototype, "baseDefense", {
        get: function () {
            return this._baseDefense;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterManager.prototype, "attributeGain", {
        get: function () {
            return this._attributeGain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterManager.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterManager.prototype, "monsterArr", {
        get: function () {
            return this._monsterArr;
        },
        enumerable: true,
        configurable: true
    });
    CharacterManager.prototype.pushMonsterToArr = function (monster) {
        this._monsterArr.push(monster);
        this._monsterArr.sort(function (a, b) { return a.x - b.x; });
    };
    CharacterManager.prototype.createPlayer = function (sprite) {
        if (this._player) {
            //egret.error("玩家已经存在，创建失败")
        }
        else {
            this._player = new Player();
            sprite.addChild(this._player);
            //GlobalManager.Instance.addToLayer(this._player,LayerType.scene);
        }
    };
    /**从怪物数组移除怪物 */
    CharacterManager.prototype.removeMonster = function (obj) {
        if (obj) {
            var index = this._monsterArr.indexOf(obj);
            if (index >= 0) {
                if (obj && obj.parent.contains(obj)) {
                    obj.parent.removeChild(obj);
                    this._monsterArr.splice(index, 1);
                    this._monsterArr.sort(function (a, b) { return a.x - a.x; });
                    if (this._monsterArr.length <= 0) {
                        Message.instance.send(MsgCMD.CLEAR_LEVEL);
                        Message.instance.send(MsgCMD.GAME_ROUND_END);
                        GameManager.Instance.levelClear();
                    }
                }
            }
        }
    };
    CharacterManager.prototype.createMonsterByLevelData = function (sprite, levelNumber) {
        var levelData = DataManager.Instance.getLevelDataByKey(levelNumber + "");
        var monsterData = levelData.monsterData;
        var monsterDataArr = monsterData.split(',');
        if (monsterDataArr.length > 0) {
            var length = monsterDataArr.length;
            if (length % 2 == 0) {
                var posX = 1000 - length * 0.5 * 200;
            }
            else {
                var posX = 1000 - 75 - Math.floor(length * 0.5) * 200;
            }
            for (var i in monsterDataArr) {
                if (monsterDataArr[i] != "null") {
                    var monsterIndex = parseInt(monsterDataArr[i]) - 1;
                    var className = this.monsterArrDefine[monsterIndex];
                    var _data = {
                        name: null,
                        originX: posX + parseInt(i) * 200,
                        originY: 420 + (parseInt(i) % 2) * 40,
                        health: 0,
                        imgSource: null,
                    };
                    var monster = new className(_data);
                    sprite.addChild(monster);
                    this._monsterArr.push(monster);
                }
            }
        }
    };
    CharacterManager._instance = null;
    return CharacterManager;
}());
__reflect(CharacterManager.prototype, "CharacterManager");
//# sourceMappingURL=CharacterManager.js.map