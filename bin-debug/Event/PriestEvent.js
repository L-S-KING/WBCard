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
/**牧师 */
var PriestEvent = (function (_super) {
    __extends(PriestEvent, _super);
    function PriestEvent() {
        var _this = _super.call(this) || this;
        _this.eventDetailArr = [];
        _this.index = 0;
        _this.skinName = "SpecialEventSkin";
        _this.name = egret.getQualifiedClassName(PriestEvent);
        return _this;
    }
    PriestEvent.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.addEvent();
    };
    PriestEvent.prototype.initData = function () {
        this.chose_1_btn.visible = false;
        this.eventDetailArr.push(string);
        var string = "一个带着金头盔（？）的奇怪蓝色人型生物脸上带着大大的微笑走到了你的面前。" + ",“你好啊朋友！我是牧师！想不想试试我的服务啊？！”"
            + ",一道温暖的金光笼罩了你。\n牧师最强奶妈，祝你路途愉快！";
        this.eventDetailArr = string.split(',');
        this.setDetail();
    };
    PriestEvent.prototype.setDetail = function () {
        this.event_img.source = RES.getRes("jieGe_jpg");
        this.event_name_label.text = "牧师";
        this.event_label.text = this.eventDetailArr[0];
    };
    PriestEvent.prototype.removefromViewPort = function (e) {
        _super.prototype.removefromViewPort.call(this, e);
    };
    PriestEvent.prototype.addEvent = function () {
        this.addListener(this.chose_1_btn, egret.TouchEvent.TOUCH_BEGIN, this.confirm, this);
        this.addListener(this.chose_2_btn, egret.TouchEvent.TOUCH_BEGIN, this.confirm, this);
        this.addListener(this.leaveHome_btn, egret.TouchEvent.TOUCH_BEGIN, this.notConfirm, this);
    };
    PriestEvent.prototype.confirm = function () {
        this.setEventLabel();
        if (this.index == 1) {
            this.chose_2_btn.label = "花费35金币，回复10滴血。";
        }
        else if (this.index == 2) {
            var coin = GameManager.Instance.curCoin;
            if (coin >= 35) {
                GameManager.Instance.curCoin -= 35;
                GameManager.Instance.curHealth += 10;
                this.chose_2_btn.visible = false;
            }
            else {
                //不执行效果
            }
            //减35金币
            //加10滴血
        }
    };
    PriestEvent.prototype.notConfirm = function () {
        this.removeSelf();
    };
    PriestEvent.prototype.setEventLabel = function () {
        this.index = this.eventDetailArr.indexOf(this.event_label.text) + 1;
        if (this.eventDetailArr.length > this.index) {
            this.event_label.text = this.eventDetailArr[this.index];
        }
        else {
            // this.removeSelf();
        }
    };
    PriestEvent.prototype.removeSelf = function () {
        if (this.parent && this.parent.contains(this)) {
            EventManager.Instance.tapCount = 0;
            if (egret.localStorage.getItem("userData")) {
                var userData = SaveManager.Instance.loadGame();
                userData.tap = 0;
            }
            SaveManager.Instance.saveGame();
            this.parent.removeChild(this);
            GameManager.Instance.addClearNodeToArr();
            SceneManager.Instance.addMapScene(new MapScene());
        }
    };
    return PriestEvent;
}(BaseModule));
__reflect(PriestEvent.prototype, "PriestEvent");
//# sourceMappingURL=PriestEvent.js.map