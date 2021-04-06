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
var CursedBook = (function (_super) {
    __extends(CursedBook, _super);
    function CursedBook() {
        var _this = _super.call(this) || this;
        _this.tapNumber = 1;
        return _this;
    }
    //接收消息
    CursedBook.prototype.recvMsg = function (cmd, data) {
    };
    CursedBook.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.addEvent();
        this.initData();
    };
    CursedBook.prototype.initData = function () {
        this.event_img.source = RES.getRes("upupup_jpg");
        this.event_name_label.text = "诅咒书本";
        this.event_label.text = "在一所被遗弃的神庙里，你找到一本翻开着的巨大书本，里边满是神秘的文字。你刚试着想要解读这些复杂的文本，它就自己开始移动变化成了你熟悉的文字。";
        this.chose_1_btn.visible = false;
        this.chose_2_btn.label = "阅读";
        this.leaveHome_btn.visible = false;
    };
    CursedBook.prototype.addEvent = function () {
        this.addListener(this.chose_1_btn, egret.TouchEvent.TOUCH_TAP, this.chose1, this);
        this.addListener(this.chose_2_btn, egret.TouchEvent.TOUCH_TAP, this.chose2, this);
        this.addListener(this.leaveHome_btn, egret.TouchEvent.TOUCH_TAP, this.notConfirm, this);
    };
    CursedBook.prototype.chose1 = function () {
        /**获得遗物 */
        RelicManager.Instance.addRelicToPlayer();
        this.event_label.text = "看完这本书后，先古之民的遗物出现在了你的面前，你将遗物放入自己的口袋。这似乎是对你的一些补偿。";
        GameManager.Instance.curHealth -= 15;
        this.chose_1_btn.visible = false;
        this.chose_2_btn.visible = false;
        this.leaveHome_btn.visible = true;
    };
    CursedBook.prototype.chose2 = function () {
        if (this.tapNumber == 1) {
            this.event_label.text = "真奇怪。这本书的内容似乎是关于先古之民的。这引起了你的兴趣，但你总觉得这本书有点让你不适。";
            this.chose_2_btn.visible = true;
            this.leaveHome_btn.visible = false;
            this.chose_2_btn.label = "[继续]失去2点生命";
            this.tapNumber = 2;
            return;
        }
        if (this.tapNumber == 2) {
            this.event_label.text = "你觉得自己必须要读下去，可是你的身体开始觉得有一点疼痛。";
            GameManager.Instance.curHealth -= 2;
            this.chose_2_btn.label = "[继续]失去4点生命";
            this.tapNumber = 3;
            return;
        }
        if (this.tapNumber == 3) {
            this.event_label.text = "你开始觉得自己非常虚弱和疲劳……";
            GameManager.Instance.curHealth -= 4;
            this.chose_2_btn.label = "[继续]失去6点生命";
            this.tapNumber = 4;
            return;
        }
        if (this.tapNumber == 4) {
            this.event_label.text = "当你快要翻到最后一页时，你的旧伤口似乎要绽开了！";
            GameManager.Instance.curHealth -= 6;
            this.chose_2_btn.label = "[停止]失去8点生命";
            this.chose_1_btn.label = "[获得1件遗物]失去15点生命。";
            this.chose_1_btn.visible = true;
            this.tapNumber = 5;
            return;
        }
        if (this.tapNumber == 5) {
            this.event_img.source = RES.getRes("lowb_png");
            this.event_img.width = 400;
            this.event_img.height = 400;
            this.event_label.text = "你顶着极大的压力，强行用意志力抵抗书本的魔力，砰的一下使劲把书合上了。你觉得自己精疲力尽，此时你的耳边仿佛有人在说你非常的愚蠢。";
            GameManager.Instance.curHealth -= 8;
            this.chose_1_btn.visible = false;
            this.chose_2_btn.visible = false;
            this.leaveHome_btn.visible = true;
            return;
        }
    };
    return CursedBook;
}(BaseSpecialEvent));
__reflect(CursedBook.prototype, "CursedBook");
//# sourceMappingURL=CursedBook.js.map