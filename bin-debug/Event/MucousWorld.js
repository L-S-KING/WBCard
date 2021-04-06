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
var MucousWorld = (function (_super) {
    __extends(MucousWorld, _super);
    function MucousWorld() {
        return _super.call(this) || this;
    }
    //接收消息
    MucousWorld.prototype.recvMsg = function (cmd, data) {
    };
    MucousWorld.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.addEvent();
        this.initData();
    };
    MucousWorld.prototype.initData = function () {
        this.event_img.source = RES.getRes("world_png");
        this.event_name_label.text = "黏液世界";
        this.event_label.text = "你掉进了一个水坑里。\n可是坑里全都是史莱姆黏液！你感觉这黏液似乎会灼烧你，你拼命想要脱身。爬出来后，你发现自己的金币似乎变少了。你回头一看，发现水坑不但有你掉落的钱，还有不少其他不幸的冒险者们落下的金币。";
        this.chose_1_btn.visible = true;
        this.chose_1_btn.label = "[收集金币]获得75金币。失去11生命";
        this.chose_2_btn.label = "[放手吧]失去39金币。";
        this.leaveHome_btn.visible = false;
    };
    MucousWorld.prototype.addEvent = function () {
        this.addListener(this.chose_1_btn, egret.TouchEvent.TOUCH_TAP, this.chose1, this);
        this.addListener(this.chose_2_btn, egret.TouchEvent.TOUCH_TAP, this.chose2, this);
        this.addListener(this.leaveHome_btn, egret.TouchEvent.TOUCH_TAP, this.notConfirm, this);
    };
    MucousWorld.prototype.chose1 = function () {
        this.event_label.text = "在长时间与黏液接触而导致你的皮肤被烧走之前，你成功捞出了不少金币";
        GameManager.Instance.curCoin += 75;
        GameManager.Instance.curHealth -= 11;
        this.chose_1_btn.visible = false;
        this.chose_2_btn.visible = false;
        this.leaveHome_btn.visible = true;
    };
    MucousWorld.prototype.chose2 = function () {
        if (GameManager.Instance.curCoin >= 39) {
            this.event_label.text = "你决定这样做不值得。";
            GameManager.Instance.curCoin -= 39;
            this.chose_1_btn.visible = false;
            this.chose_2_btn.visible = false;
            this.leaveHome_btn.visible = true;
        }
    };
    return MucousWorld;
}(BaseSpecialEvent));
__reflect(MucousWorld.prototype, "MucousWorld");
//# sourceMappingURL=MucousWorld.js.map