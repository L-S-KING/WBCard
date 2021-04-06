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
/**收获日 */
var HarvestDayEvent = (function (_super) {
    __extends(HarvestDayEvent, _super);
    function HarvestDayEvent() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.probability = 0;
        _this.skinName = "SpecialEventSkin";
        _this.name = egret.getQualifiedClassName(HarvestDayEvent);
        return _this;
    }
    HarvestDayEvent.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.addEvent();
    };
    HarvestDayEvent.prototype.initData = function () {
        this.chose_1_btn.visible = false;
        this.probability = 25;
        this.setDetail();
    };
    HarvestDayEvent.prototype.setDetail = function () {
        this.event_img.source = RES.getRes("acdc_jpg");
        this.event_name_label.text = "收获日";
        this.event_label.text = "失去6点生命，" + this.probability + "%" + "的概率获得一件遗物";
        this.chose_2_btn.labelDisplay.text = "继续";
    };
    HarvestDayEvent.prototype.addEvent = function () {
        this.addListener(this.chose_1_btn, egret.TouchEvent.TOUCH_BEGIN, this.confirm, this);
        this.addListener(this.chose_2_btn, egret.TouchEvent.TOUCH_BEGIN, this.confirm, this);
        this.addListener(this.leaveHome_btn, egret.TouchEvent.TOUCH_BEGIN, this.notConfirm, this);
    };
    HarvestDayEvent.prototype.confirm = function () {
        if (this.probability > 0) {
            var random = Math.random();
            if (random <= this.probability / 100) {
                //获得一件遗物
                RelicManager.Instance.addRelicToPlayer();
                this.removeSelf();
            }
            else {
                this.probability += 25;
            }
            //失去6点生命
            GameManager.Instance.curHealth -= 6;
            this.event_label.text = "失去6点生命，" + this.probability + "%" + "的概率获得一件遗物";
        }
    };
    HarvestDayEvent.prototype.notConfirm = function () {
        this.removeSelf();
    };
    HarvestDayEvent.prototype.removeSelf = function () {
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
    return HarvestDayEvent;
}(BaseModule));
__reflect(HarvestDayEvent.prototype, "HarvestDayEvent");
//# sourceMappingURL=HarvestDayEvent.js.map