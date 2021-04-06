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
var TransformingShrines = (function (_super) {
    __extends(TransformingShrines, _super);
    function TransformingShrines() {
        return _super.call(this) || this;
    }
    //接收消息
    TransformingShrines.prototype.recvMsg = function (cmd, data) {
    };
    TransformingShrines.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.addEvent();
        this.initData();
    };
    TransformingShrines.prototype.initData = function () {
        this.event_img.source = RES.getRes("Shrine_png");
        this.event_name_label.text = "金色神龛";
        this.event_label.text = "在你面前是一座古老神灵的精巧神龛。";
        this.chose_1_btn.visible = true;
        this.chose_1_btn.label = "[祈祷]获得100金币。";
        this.chose_2_btn.label = "[亵渎]获得250金币。被诅咒";
        this.leaveHome_btn.visible = true;
    };
    TransformingShrines.prototype.addEvent = function () {
        this.addListener(this.chose_1_btn, egret.TouchEvent.TOUCH_TAP, this.chose1, this);
        this.addListener(this.chose_2_btn, egret.TouchEvent.TOUCH_TAP, this.chose2, this);
        this.addListener(this.leaveHome_btn, egret.TouchEvent.TOUCH_TAP, this.notConfirm, this);
    };
    TransformingShrines.prototype.chose1 = function () {
        this.event_label.text = "当你的手触碰到神龛时，天空中开始掉落金币，赚钱了。";
        GameManager.Instance.curCoin += 100;
        this.chose_1_btn.visible = false;
        this.chose_2_btn.visible = false;
        this.leaveHome_btn.visible = true;
    };
    TransformingShrines.prototype.chose2 = function () {
        this.event_label.text = "你每攻击一次神龛，就会有更多的金币掉落出来！\n当你收起所有钱时，心中有了一种沉重的感觉。";
        GameManager.Instance.curCoin += 250;
        CardManager.Instance.haveCardId.push(8);
        Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
        this.chose_1_btn.visible = false;
        this.chose_2_btn.visible = false;
        this.leaveHome_btn.visible = true;
    };
    return TransformingShrines;
}(BaseSpecialEvent));
__reflect(TransformingShrines.prototype, "TransformingShrines");
//# sourceMappingURL=TransformingShrines.js.map