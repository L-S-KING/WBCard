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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(data) {
        var _this = _super.call(this, data) || this;
        // protected relicArr:BaseRelic[] = [];                //玩家拥有的装备数组
        _this.bodyImgAnim = null;
        return _this;
    }
    Player.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    Player.prototype.initData = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
        this._type = 0;
        this.health = CharacterManager.Instance.baseHealth;
        this._defense = CharacterManager.Instance.baseDefense;
        this.originX = 280;
        this.originY = 460;
        this.x = this.originX;
        this.y = this.originY;
    };
    Player.prototype.setBodyImg = function () {
        var texture = RES.getRes(CharacterManager.Instance._curPlayerTextureHand + "0_png");
        if (texture) {
            this.bodyImg = new egret.Bitmap();
            this.bodyImg.texture = texture;
            this.addChild(this.bodyImg);
            this.bodyImg.anchorOffsetX = this.bodyImg.texture.textureWidth >> 1;
            this.bodyImg.anchorOffsetY = this.bodyImg.texture.textureHeight;
            this.bodyImg.touchEnabled = true;
        }
        else {
            //egret.error("人物body图片资源读取失败")
        }
        // this.bodyImg.scaleX = -1;
        this.setImgAnim();
    };
    Player.prototype.setImgAnim = function () {
        this.bodyImgAnim = new ImgAnim();
        var textureHand = CharacterManager.Instance._curPlayerTextureHand;
        var animCount = CharacterManager.Instance.playerImgAnimCount;
        this.bodyImgAnim.initData(textureHand, animCount, this.bodyImg, 6, false, true);
        this.bodyImgAnim.playAnim();
    };
    //接收消息
    Player.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                if (!this._reserveDefense) {
                    this.healthC.curDefense -= this.healthC.curDefense;
                }
                break;
            case MsgCMD.PLAYER_ATTACK:
                // if(data.cardEffectType == 0)
                // {
                this.attackMonster();
                // }
                break;
            case MsgCMD.CLEAR_LEVEL:
                this.removeAllBuff();
                break;
        }
    };
    Player.prototype.attackMonster = function () {
        var posX = 35;
        var originX = 0;
        egret.Tween.get(this.bodyImg).to({ x: posX }, 100, egret.Ease.backOut).to({ x: originX }, 100, egret.Ease.sineOut);
    };
    Player.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.CLEAR_LEVEL, this);
        this.addMessage(MsgCMD.PLAYER_ATTACK, this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START, this);
    };
    Player.prototype.update = function () {
        if (GameManager.Instance.pause) {
            return;
        }
        _super.prototype.update.call(this);
    };
    Player.prototype.damaged = function (damageData) {
        _super.prototype.damaged.call(this, damageData);
        var self = this;
        self.skewX = 0;
        this.bodyImg.x = 0;
        var posX = -10;
        egret.Tween.get(this.bodyImg).to({ skewX: -10, x: posX }, 100, egret.Ease.sineIn).to({ skewX: 0, x: 0 }, 150);
    };
    /**玩家死亡 */
    Player.prototype.dead = function () {
        if (this._isDead) {
            return;
        }
        var relicArr = RelicManager.Instance.RelicArr;
        for (var i = 0; i < relicArr.length; i++) {
            if (relicArr[i].name == "LizardTail" && relicArr[i].canUse == true) {
                Message.instance.send(MsgCMD.PLAYER_DEAD);
                return;
            }
        }
        this._isDead = true;
        Message.instance.send(MsgCMD.GAME_OVER);
        egret.Tween.get(this).to({}, 400).call(function () {
            GlobalManager.Instance.removeAllObj();
            //添加失败场景
            SceneManager.Instance.setCurScene(new FailScene());
        });
    };
    Player.prototype.removeFromViewPort = function (e) {
        _super.prototype.removefromViewPort.call(this, e);
        this.removeBuffScene();
    };
    return Player;
}(BaseCharacter));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map