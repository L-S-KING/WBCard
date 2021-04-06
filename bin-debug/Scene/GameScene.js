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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(data) {
        var _this = _super.call(this, data) || this;
        _this.shacking = false;
        _this.shackTime = 0;
        _this.shackBi = 0;
        _this.shackDura = 0;
        _this.shackX = 0;
        _this.shackY = 0;
        _this.shackCount = 0;
        _this.sDistance = 0;
        _this.skinName = "GameSceneSkin";
        return _this;
    }
    GameScene.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.addEvent();
    };
    GameScene.prototype.initData = function () {
        GameManager.Instance.roundCount = 0;
        CardManager.Instance.initData();
        CharacterManager.Instance.clearData();
        this.round_group.visible = false;
        var levelData = DataManager.Instance.getLevelDataByKey(this.data.id + "");
        GameManager.Instance.curLevelType = levelData.levelType;
        this.round_group.alpha = 0;
        CharacterManager.Instance.createPlayer(this.character_group);
        CharacterManager.Instance.createMonsterByLevelData(this.character_group, this.data.id);
    };
    GameScene.prototype.addEvent = function () {
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
        this.addMessage(MsgCMD.ENEMY_ROUND_START, this);
        this.addMessage(MsgCMD.SHAKE_VIEWPORT, this);
        this.addListener(egret.MainContext.instance.stage, egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
    };
    GameScene.prototype.update = function () {
        this.updateShake();
    };
    GameScene.prototype.updateShake = function () {
        if (this.shacking) {
            var layerAll = this;
            if (this.shackTime--) {
                this.shackBi = this.shackTime / this.shackDura;
                layerAll.x = this.shackX * this.shackBi;
                layerAll.y = this.shackY * this.shackBi;
            }
            else {
                if (this.shackCount--) {
                    this.shackTime = this.shackDura = 5;
                    this.shackX = (Math.random() > .5 ? 1 : -1) * (Math.random() * this.sDistance + 8);
                    this.shackY = (Math.random() > .5 ? 1 : -1) * (Math.random() * this.sDistance + 8);
                    layerAll.x = this.shackX;
                    layerAll.y = this.shackY;
                }
                else {
                    this.shacking = false;
                }
            }
        }
    };
    GameScene.prototype.cameraShake = function (dis, count) {
        if (count === void 0) { count = 1; }
        this.sDistance = dis;
        this.shacking = true;
        this.shackCount = count;
        this.shackTime = 0;
    };
    GameScene.prototype.touchEnd = function (e) {
        var card = GameManager.Instance.curSelectCard;
        if (card) {
            if (e.stageY >= 530) {
                card.cancelSelect();
            }
            else {
                if (card.type == 1) {
                    card.beginEffect({ character: CharacterManager.Instance.player });
                }
            }
        }
    };
    //接收消息
    GameScene.prototype.recvMsg = function (cmd, data) {
        var self = this;
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                this.round_group.visible = true;
                this.round_label.text = "玩家回合";
                var self = this;
                egret.Tween.get(this.round_group).to({ alpha: 1 }, 200, egret.Ease.sineOut).wait(100).call(function () {
                    egret.Tween.get(self.round_label).to({ x: -500 }, 1000, egret.Ease.sineInOut).call(function () {
                        self.round_group.visible = false;
                        self.round_group.alpha = 0;
                        self.round_label.x = 520;
                    });
                });
                break;
            case MsgCMD.ENEMY_ROUND_START:
                this.round_group.visible = true;
                this.round_label.text = "敌人回合";
                CharacterManager.Instance.monsterArr.sort(function (a, b) { return a.x - b.x; });
                egret.Tween.get(this.round_group).to({ alpha: 1 }, 100, egret.Ease.sineOut).wait(100).to({ alpha: 0 }, 600, egret.Ease.sineIn).wait(100).call(function () {
                    self.round_group.visible = false;
                    self.round_group.alpha = 0;
                    self.round_label.x = 520;
                    Message.instance.send(MsgCMD.NEXT_MONSTER_ACTION, { target: CharacterManager.Instance.monsterArr[0] });
                });
                break;
            case MsgCMD.SHAKE_VIEWPORT:
                this.cameraShake(data.dis, data.count);
                break;
        }
    };
    GameScene.prototype.removefromViewPort = function (e) {
        _super.prototype.removefromViewPort.call(this, e);
        CharacterManager.Instance.clearData();
        GameManager.Instance.curLevelType = 0;
    };
    return GameScene;
}(BaseScene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map