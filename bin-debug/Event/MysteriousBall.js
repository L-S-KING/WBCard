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
/**
 * 神秘圆球
 * 战斗奖励稀有遗物或者离开
 */
var MysteriousBall = (function (_super) {
    __extends(MysteriousBall, _super);
    function MysteriousBall() {
        return _super.call(this) || this;
    }
    MysteriousBall.prototype.initData = function () {
        //得到玩家
        this.player.source = CharacterManager.Instance._curPlayerTextureHand + "0_png";
        this.img.source = "ball_png";
        this.img.x = 640;
        this.img.y = 240;
        this.buttonUp.label = "[打开圆球] 战斗。	奖励：稀有遗物";
        this.buttonDown.label = "[离开]";
        this.chat.text = "在四周混乱的地形中间，一个骨质圆球伫立在地上，似乎包裹着一样神秘的发光物体。你很好奇里面有什么东西，但你注意到周围有一些哨兵在看守。";
    };
    MysteriousBall.prototype.buttonUpTap = function () {
        this.buttonUp.alpha = 0;
        this.buttonUp.touchEnabled = false;
        this.buttonDown.label = "[战斗]";
        this.chat.text = "你刚一砸开圆球，那些看守就立即动了起来！";
    };
    MysteriousBall.prototype.buttonDownTap = function () {
        if (this.buttonUp.touchEnabled == false && this.clicks <= 0) {
            SceneManager.Instance.setCurScene(new GameScene({ id: 37 }));
            UiManager.Instance.addUiToUiLayer(GameSceneCardUi, false);
            Message.instance.send(MsgCMD.PLAYER_ROUND_START);
            if (this && this.parent != null) {
                this.parent.removeChild(this);
            }
        }
        else {
            this.clicks++;
            if (this.clicks == 1) {
                this.buttonUp.alpha = 0;
                this.buttonUp.touchEnabled = false;
                this.chat.text = "做人不能太贪。";
            }
            else {
                this.removeSelf();
            }
        }
    };
    return MysteriousBall;
}(BaseAttackEvent));
__reflect(MysteriousBall.prototype, "MysteriousBall");
//# sourceMappingURL=MysteriousBall.js.map