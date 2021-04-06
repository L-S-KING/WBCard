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
var MonsterActionTip = (function (_super) {
    __extends(MonsterActionTip, _super);
    //private attackLabel
    function MonsterActionTip(owner) {
        var _this = _super.call(this) || this;
        _this.owner = null;
        _this.tipImg = [];
        _this.data = [];
        _this.originX = 0;
        _this.originY = 0;
        _this.tipsText = null;
        _this.attackCount = null;
        if (owner) {
            _this.owner = owner;
        }
        return _this;
    }
    MonsterActionTip.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.init();
    };
    MonsterActionTip.prototype.init = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
        this.width = 50;
        this.height = 50;
        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;
        var self = this;
        this.originX = 0;
        this.originY = -this.owner.body.height - 80;
        this.x = this.originX;
        this.y = this.originY;
        for (var i = 0; i < 2; i++) {
            var img = new egret.Bitmap();
            this.addChild(img);
            this.tipImg.push(img);
            img.visible = false;
            img.touchEnabled = false;
        }
        this.attackCount = new eui.Label();
        this.addChild(this.attackCount);
        this.attackCount.width = 50;
        this.attackCount.anchorOffsetX = this.attackCount.width * 0.5;
        this.attackCount.height = 21;
        this.attackCount.size = 20;
        this.attackCount.textColor = 0xff0000;
        this.attackCount.textAlign = egret.HorizontalAlign.CENTER;
        this.attackCount.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.attackCount.y = 50;
        this.attackCount.x = 25;
        this.attackCount.visible = false;
        this.tipsText = new TipsText();
        GlobalManager.Instance.addToLayer(this.tipsText, LayerType.ui);
        this.tipsText.x = this.owner.x - 80;
        this.tipsText.y = this.owner.y - this.owner.body.height - 60;
        var posY = this.originY + 40;
        egret.Tween.get(this, { loop: true }).to({ y: posY }, 1000, egret.Ease.sineOut).to({ y: this.originY }, 1000, egret.Ease.sineIn);
        // this.addListener(this,egret.TouchEvent.TOUCH_BEGIN,function(){
        //         self.textVisible(true);
        // },this);
        this.addListener(GameConst.stage, egret.TouchEvent.TOUCH_END, function () {
            self.textVisible(false);
        }, this);
    };
    MonsterActionTip.prototype.changePos = function () {
        this.tipsText.x = this.owner.x - 80;
        this.tipsText.y = this.owner.y - this.owner.body.height - 60;
        this.originX = 0;
        this.originY = -this.owner.body.height - 80;
        this.x = this.originX;
        this.y = this.originY;
        egret.Tween.removeTweens(this);
        var posY = this.originY + 40;
        egret.Tween.get(this, { loop: true }).to({ y: posY }, 1000, egret.Ease.sineOut).to({ y: this.originY }, 1000, egret.Ease.sineIn);
    };
    MonsterActionTip.prototype.textVisible = function (value) {
        if (this.tipsText) {
            this.tipsText.visible = value;
        }
    };
    MonsterActionTip.prototype.updateTips = function () {
        this.data = [];
        for (var i = 0; i < this.tipImg.length; i++) {
            this.tipImg[i].texture = null;
            this.tipImg[i].visible = false;
            this.tipImg[i].touchEnabled = false;
        }
        for (var i = 0; i < this.owner.actionArr.length; i++) {
            var _data = DataManager.Instance.getMonsterActionDataById(this.owner.actionArr[i] + "");
            if (!_data) {
                var _data = DataManager.Instance.getMonsterActionDataById(6 + "");
            }
            this.data.push(_data);
            this.tipImg[i].texture = RES.getRes(_data.img);
            this.tipImg[i].name = _data.img;
            //    this.tipImg[i].anchorOffsetX = this.tipImg[i].width>>1;
            //    this.tipImg[i].anchorOffsetY = this.tipImg[i].height>>1;
            this.tipImg[i].visible = true;
            this.tipImg[i].touchEnabled = true;
        }
        if (this.data.length > 1) {
            this.tipsText.updateText("这名敌人" + this.data[0].detail + "与" + this.data[1].detail + "。");
        }
        else {
            this.tipsText.updateText("这名敌人" + this.data[0].detail + "。");
        }
        this.attackCount.visible = false;
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == 2) {
                this.attackCount.visible = true;
                var attackValue = Math.floor(this.owner.attackValue * this.owner.attackTimes);
                if (this.owner.attackCounts > 1) {
                    this.attackCount.text = attackValue + "x" + this.owner.attackCounts;
                }
                else {
                    this.attackCount.text = attackValue + "";
                }
            }
        }
    };
    MonsterActionTip.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    MonsterActionTip.prototype.removefromViewPort = function (e) {
        this.tipsText.removeSelf();
        _super.prototype.removefromViewPort.call(this, e);
    };
    return MonsterActionTip;
}(BaseSprite));
__reflect(MonsterActionTip.prototype, "MonsterActionTip");
//# sourceMappingURL=MonsterActionTip.js.map