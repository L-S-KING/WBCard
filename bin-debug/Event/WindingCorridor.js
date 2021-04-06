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
var WindingCorridor = (function (_super) {
    __extends(WindingCorridor, _super);
    function WindingCorridor() {
        return _super.call(this) || this;
    }
    //接收消息
    WindingCorridor.prototype.recvMsg = function (cmd, data) {
    };
    WindingCorridor.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.addEvent();
        this.initData();
    };
    WindingCorridor.prototype.initData = function () {
        this.event_img.source = RES.getRes("a_jpg");
        this.event_name_label.text = "蜿蜒走廊";
        this.event_label.text = "你沿着弯曲的道路慢慢前进，却多次发现自己迷失了方向，仿佛墙壁和地面就在你的眼前突然移动了位置。更糟糕的是你的脑中似乎还有许多声音在对你轻声低语。当你经过一个你十分确定之前见过的一个建筑物时，你开始怀疑自己疯了，还是这个地方违背常理的地形让你失去了理智。你需要立即做出一些改变——至少那些声音是这么说的，他们怎么会骗人呢？";
        this.chose_1_btn.label = "[拥抱疯狂]得到1张攻击1张横扫。失去15生命。";
        this.chose_2_btn.label = "[集中精神]被诅咒。恢复25生命。";
        this.leaveHome_btn.visible = false;
    };
    WindingCorridor.prototype.addEvent = function () {
        this.addListener(this.chose_1_btn, egret.TouchEvent.TOUCH_BEGIN, this.chose1, this);
        this.addListener(this.chose_2_btn, egret.TouchEvent.TOUCH_BEGIN, this.chose2, this);
        this.addListener(this.leaveHome_btn, egret.TouchEvent.TOUCH_BEGIN, this.notConfirm, this);
    };
    WindingCorridor.prototype.chose1 = function () {
        this.event_img.source = RES.getRes("b_jpg");
        GameManager.Instance.curHealth -= 15;
        CardManager.Instance.haveCardId.push(1);
        CardManager.Instance.haveCardId.push(4);
        this.event_label.text = "你觉得自己的理智出现了裂缝，只有真正的疯子才能理解这样的地方，于是你拥抱了那些低于的声音，用“全新”的视角继续前进。现在一切似乎都变得合理了。";
        Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
        this.chose_1_btn.visible = false;
        this.chose_2_btn.visible = false;
        this.leaveHome_btn.visible = true;
    };
    WindingCorridor.prototype.chose2 = function () {
        this.event_img.source = RES.getRes("c_jpg");
        this.event_label.text = "你停下脚步，仔细地观察周围这片起伏波动的地貌。在混乱的变化中，你似乎逐渐找到了一些规律。可是那些令人疯狂的声音不停打断着你的思维，你花了极大的努力才强忍着疼痛无视了他们。最终你成功地分析出了一条前进的道路，当你离开时，你觉得自己似乎对这个诡异地方的恶魔本质有了一定的抵抗力。";
        GameManager.Instance.curHealth += 25;
        CardManager.Instance.haveCardId.push(8);
        Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
        this.chose_1_btn.visible = false;
        this.chose_2_btn.visible = false;
        this.leaveHome_btn.visible = true;
    };
    return WindingCorridor;
}(BaseSpecialEvent));
__reflect(WindingCorridor.prototype, "WindingCorridor");
//# sourceMappingURL=WindingCorridor.js.map