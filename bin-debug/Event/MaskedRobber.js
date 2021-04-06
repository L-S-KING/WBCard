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
 * 蒙面强盗
 * 战斗或者失去所以金币离开
 */
var MaskedRobber = (function (_super) {
    __extends(MaskedRobber, _super);
    function MaskedRobber() {
        return _super.call(this) || this;
    }
    MaskedRobber.prototype.initData = function () {
        //得到玩家
        this.player.source = CharacterManager.Instance._curPlayerTextureHand + "0_png";
        this.img.source = "lose_png";
        this.img.x = 720;
        this.img.y = 320;
        this.buttonUp.label = "[付钱] 失去所有金币";
        this.buttonDown.label = "[战斗！]";
        this.chat.text = "你遇见一群戴着大红面具的强盗。“你好啊，留下买路钱······价格公道只要身上所有的金币就行！嘿嘿嘿！”";
    };
    MaskedRobber.prototype.buttonUpTap = function () {
        GameManager.Instance.curCoin = 0;
        this.buttonUp.alpha = 0;
        this.buttonUp.touchEnabled = false;
        this.buttonDown.label = "[继续]";
        this.chat.text = "嘿嘿嘿······谢谢你的金币啦！哎呀，我最喜欢金币了，那是多好的东西啊。闪闪亮亮的小可爱们！";
    };
    MaskedRobber.prototype.buttonDownTap = function () {
        if (this.buttonUp.touchEnabled == false) {
            this.clicks++;
            if (this.clicks == 1) {
                this.chat.text = "喂，熊，喂！这家伙居然把他的金币全给我们了！太蠢了是吧？你猜怎么着我只是好声好气的问了一下就拿到了，谁会知道啊？！我反正不知道！真是个冤大头！";
            }
            if (this.clicks == 2) {
                this.chat.text = "小的们，这么好的事儿，我们可得一起好好笑一笑！哈哈哈	吼吼吼嚯嚯	哔哈哈";
                this.buttonDown.label = "[离开]";
            }
            if (this.clicks == 3) {
                this.removeSelf();
            }
        }
        else {
            SceneManager.Instance.setCurScene(new GameScene({ id: 36 }));
            UiManager.Instance.addUiToUiLayer(GameSceneCardUi, false);
            Message.instance.send(MsgCMD.PLAYER_ROUND_START);
            if (this && this.parent != null) {
                this.parent.removeChild(this);
            }
        }
    };
    return MaskedRobber;
}(BaseAttackEvent));
__reflect(MaskedRobber.prototype, "MaskedRobber");
//# sourceMappingURL=MaskedRobber.js.map