var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameState;
(function (GameState) {
    GameState[GameState["Default"] = 0] = "Default";
    GameState[GameState["GameStart"] = 1] = "GameStart";
    GameState[GameState["PlayerRoundStart"] = 2] = "PlayerRoundStart";
    GameState[GameState["PlayerRoundEnd"] = 3] = "PlayerRoundEnd";
    GameState[GameState["EnemyRoundStart"] = 4] = "EnemyRoundStart";
    GameState[GameState["EnemyRoundEnd"] = 5] = "EnemyRoundEnd";
    GameState[GameState["GameEnd"] = 6] = "GameEnd";
})(GameState || (GameState = {}));
var GameManager = (function () {
    function GameManager() {
        this._pause = false; //暂停
        this._curSelectCard = null; //当前选择的卡片
        this._curPlayerPP = 0; //当前玩家的PP值
        this._canTouchCard = true; //能否触摸卡牌
        this._curHandCardCount = 6; //当前手牌张数
        this._gameState = GameState.Default; //当前游戏状态
        this._curSelectMonster = null; //当前选择的monster
        this._skipPlayerTurn = false; //是否跳过玩家回合 false不跳过 true跳过
        this._skipMonsterTurn = false; //是否跳过怪物回合 false不跳过 true跳过
        this._roundCount = 0; //回合次数
        /**跳过玩家回合次数 */
        this.skipPlayerNumber = 0;
        /**跳过怪物回合次数 */
        this.skipEnemyNumber = 0;
        this._curHealth = 90; //玩家当前血量
        this._maxHealth = 90; //玩家最大血量
        this._curCoin = 99; //玩家金币
        this._curLayer = 1; //当前层数
        this._curLevelType = 0; //当前关卡类型,0:普通怪物关，1：精英怪物关，2：boss
        this.curSelectNodeId = 0; //当前选择的节点id
        this.clearNodeIdArr = []; //已经通关的节点id
        this.curGameSceneBgTexture = null; //当前游戏背景纹理
        this.curGameMapIndex = 1;
        this.clearMapId = [];
        this.mapIdArr = [1, 2, 3, 4];
        this.floor = 0; //攀爬楼层
        this.ordinary = 0; //击杀普通怪个数
        this.elite = 0; //击杀精英怪个数
        this.boss = 0; //击杀boss个数
    }
    Object.defineProperty(GameManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new GameManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameManager.prototype.gameContinue = function () {
        var userData = SaveManager.Instance.loadGame();
        this.clearMapId = userData.clearMap;
        this.curCoin = userData.coin;
        this.curHealth = userData.curHealth;
        this.maxHealth = userData.maxHealth;
        this.curLayer = userData.curLayer;
        this.clearNodeIdArr = userData.clearNodeId;
        this.floor = userData.floor;
        this.ordinary = userData.ordinary;
        this.elite = userData.elite;
        this.boss = userData.boss;
        CharacterManager.Instance._curPlayerTextureHand = userData.playerTextureHand;
        CharacterManager.Instance.playerImgAnimCount = userData.playerAnimCount;
        this.curGameMapIndex = userData.curMap;
        CardManager.Instance.haveCardId = userData.holdCard;
        RelicManager.Instance.clearData();
        CardManager.Instance.initData();
        UiManager.Instance.addUiToUiLayer(PlayerUi, false, null, 999);
        var relicIdArr = [];
        for (var i = 0; i < userData.relic.length; i++) {
            relicIdArr.push(userData.relic[i]);
        }
        for (var i = 0; i < relicIdArr.length; i++) {
            RelicManager.Instance.addRelicToPlayerById(relicIdArr[i]);
        }
        // RelicManager.Instance.playerHaveRelicIdArr =  userData.relic;
        SceneManager.Instance.addMapScene(new MapScene());
    };
    GameManager.prototype.gameClear = function () {
        SceneManager.Instance.removeCurScene();
        this.clearMapId.push(this.curGameMapIndex);
        if (this.clearMapId.length >= 3) {
            egret.log("胜利");
            GlobalManager.Instance.removeAllObj();
            SceneManager.Instance.setCurScene(new SuccessScene());
            //添加胜利场景
        }
        else {
            this.initData();
            this.randomMapOpen();
        }
    };
    /**随机打开一张没有玩过的地图 */
    GameManager.prototype.randomMapOpen = function () {
        var randomIndex = Math.floor(Math.random() * this.mapIdArr.length);
        var mapId = this.mapIdArr[randomIndex];
        while (this.clearMapId.indexOf(mapId) >= 0) {
            var randomIndex = Math.floor(Math.random() * this.mapIdArr.length);
            var mapId = this.mapIdArr[randomIndex];
        }
        this.curGameMapIndex = mapId;
        SceneManager.Instance.addMapScene(new MapScene());
    };
    /**加入通关的地图节点 */
    GameManager.prototype.addClearNodeToArr = function () {
        this.floor++;
        this.curLayer++;
        this.clearNodeIdArr.push(this.curSelectNodeId);
    };
    GameManager.prototype.gameStart = function () {
        this.initData();
        UiManager.Instance.addUiToUiLayer(PlayerUi, false, null, 999);
        this.randomMapOpen();
    };
    GameManager.prototype.levelClear = function () {
        var rewardUi = new RewardUi();
        GlobalManager.Instance.addToLayer(rewardUi, LayerType.ui, 999);
        if (this._curLevelType == 2) {
            this.boss++;
            this.floor++;
        }
    };
    Object.defineProperty(GameManager.prototype, "curLevelType", {
        get: function () {
            return this._curLevelType;
        },
        set: function (value) {
            this._curLevelType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "curLayer", {
        get: function () {
            return this._curLayer;
        },
        set: function (value) {
            this._curLayer = value;
            Message.instance.send(MsgCMD.PLAYER_LAYER_CHANGE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "curCoin", {
        get: function () {
            return this._curCoin;
        },
        set: function (value) {
            this._curCoin = Math.floor(value);
            Message.instance.send(MsgCMD.PLAYER_COIN_CHANGE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "curHealth", {
        get: function () {
            return this._curHealth;
        },
        set: function (value) {
            if (value >= this._maxHealth) {
                this._curHealth = this._maxHealth;
            }
            else {
                this._curHealth = value;
            }
            Message.instance.send(MsgCMD.PLAYER_HEALTH_CHANGE);
            if (!CharacterManager.Instance.player && this._curHealth <= 0) {
                Message.instance.send(MsgCMD.GAME_OVER);
                egret.Tween.get(this).to({}, 400).call(function () {
                    GlobalManager.Instance.removeAllObj();
                    SceneManager.Instance.setCurScene(new FailScene());
                });
                return;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "maxHealth", {
        get: function () {
            return this._maxHealth;
        },
        set: function (value) {
            var changeValue = value - this._maxHealth;
            this._maxHealth = value;
            if (changeValue > 0) {
                this.curHealth += changeValue;
            }
            Message.instance.send(MsgCMD.PLAYER_HEALTH_CHANGE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "roundCount", {
        get: function () {
            return this._roundCount;
        },
        set: function (value) {
            this._roundCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "skipPlayerTurn", {
        get: function () {
            return this._skipPlayerTurn;
        },
        set: function (bol) {
            this._skipPlayerTurn = bol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "skipMonsterTurn", {
        get: function () {
            return this._skipMonsterTurn;
        },
        set: function (bol) {
            this._skipMonsterTurn = bol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "curSelectMonster", {
        get: function () {
            return this._curSelectMonster;
        },
        set: function (value) {
            this._curSelectMonster = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "curHandCardCount", {
        get: function () {
            return this._curHandCardCount;
        },
        set: function (value) {
            this._curHandCardCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "canTouchCard", {
        get: function () {
            return this._canTouchCard;
        },
        set: function (bol) {
            this._canTouchCard = bol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "curPlayerPP", {
        get: function () {
            return this._curPlayerPP;
        },
        set: function (value) {
            this._curPlayerPP = value;
        },
        enumerable: true,
        configurable: true
    });
    GameManager.prototype.setCurSelectCard = function (card) {
        this._curSelectCard = card;
    };
    Object.defineProperty(GameManager.prototype, "curSelectCard", {
        get: function () {
            return this._curSelectCard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "pause", {
        get: function () {
            return this._pause;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "gameState", {
        get: function () {
            return this._gameState;
        },
        enumerable: true,
        configurable: true
    });
    GameManager.prototype.changeGameStart = function (state) {
        switch (state) {
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
                this._roundCount++;
                Message.instance.send(MsgCMD.ENEMY_ROUND_END);
                Message.instance.send(MsgCMD.PLAYER_ROUND_START);
                break;
        }
    };
    GameManager.prototype.initData = function () {
        this.curLayer = 1; //当前层数
        this._curLevelType = 0; //当前关卡类型,0:普通怪物关，1：精英怪物关，2：boss
        this.curSelectNodeId = 0; //当前选择的节点id
        this.clearNodeIdArr = []; //已经通关的节点id
        this._gameState = GameState.Default;
        CardManager.Instance.initData();
    };
    GameManager._instance = null;
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map