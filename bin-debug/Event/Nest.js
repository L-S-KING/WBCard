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
var Nest = (function (_super) {
    __extends(Nest, _super);
    function Nest() {
        return _super.call(this) || this;
    }
    //接收消息
    Nest.prototype.recvMsg = function (cmd, data) {
    };
    Nest.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.addEvent();
        this.initData();
    };
    Nest.prototype.initData = function () {
        this.event_img.source = RES.getRes("e_jpg");
        this.event_name_label.text = "巢穴";
        this.event_label.text = "你看见一长串带着兜帽的人们正鱼贯走进一座开起来没什么特别的大教堂。于是你理所当然地加入了队伍里，很快你的周围就站满了邪教徒！他们似乎没有发现你只是兴奋地呼喊着些什么。你看到面前有一个捐款箱……";
        this.chose_1_btn.label = "[抢了钱就跑]获得99金币";
        this.chose_2_btn.label = "[留在队伍中]获得2张攻击卡。失去6生命。";
        this.leaveHome_btn.visible = false;
    };
    Nest.prototype.addEvent = function () {
        this.addListener(this.chose_1_btn, egret.TouchEvent.TOUCH_BEGIN, this.chose1, this);
        this.addListener(this.chose_2_btn, egret.TouchEvent.TOUCH_BEGIN, this.chose2, this);
        this.addListener(this.leaveHome_btn, egret.TouchEvent.TOUCH_BEGIN, this.notConfirm, this);
    };
    Nest.prototype.chose1 = function () {
        GameManager.Instance.curCoin += 99;
        this.event_label.text = "他们甚至完全没有注意到你的行动。";
        this.event_img.source = RES.getRes("q_jpg");
        this.chose_1_btn.visible = false;
        this.chose_2_btn.visible = false;
        this.leaveHome_btn.visible = true;
    };
    Nest.prototype.chose2 = function () {
        this.event_label.text = "你（可能是出于害怕）决定留在队列中，看看究竟会发生什么。最终你到达了队伍的最前，与邪教徒的领袖面对面。一名身着华服的邪教徒将自己珍藏的卡交给了你。邪教徒们开始对你大喊大叫！你也跟着喊了起来。为什么不呢？";
        this.event_img.source = RES.getRes("w_jpg");
        CardManager.Instance.haveCardId.push(1);
        CardManager.Instance.haveCardId.push(1);
        Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
        GameManager.Instance.curHealth -= 6;
        this.chose_1_btn.visible = false;
        this.chose_2_btn.visible = false;
        this.leaveHome_btn.visible = true;
    };
    return Nest;
}(BaseSpecialEvent));
__reflect(Nest.prototype, "Nest");
//# sourceMappingURL=Nest.js.map