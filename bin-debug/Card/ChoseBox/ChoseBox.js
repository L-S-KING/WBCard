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
var ChoseBox = (function (_super) {
    __extends(ChoseBox, _super);
    function ChoseBox(choseObj) {
        var _this = _super.call(this) || this;
        //选择对象
        _this.choseObj = null;
        _this.img = null;
        _this.choseObj = choseObj;
        //选框创建
        if (choseObj) {
            _this.x = _this.choseObj.x;
            _this.y = _this.choseObj.y - _this.choseObj.body.height * 0.5;
            _this.img = new egret.Bitmap(RES.getRes("choseBox_png"));
            _this.addChild(_this.img);
            _this.img.width = _this.choseObj.body.width + 15;
            _this.img.height = _this.choseObj.body.height + 15;
            _this.img.anchorOffsetX = _this.img.width * 0.5;
            _this.img.anchorOffsetY = _this.img.height * 0.5;
        }
        //选择框呼吸
        egret.Tween.get(_this, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1.0, scaleY: 1.0 }, 200);
        return _this;
    }
    /**移除 */
    ChoseBox.prototype.removefromViewPort = function (e) {
        _super.prototype.removefromViewPort.call(this, e);
        egret.Tween.removeTweens(this);
    };
    return ChoseBox;
}(BaseSprite));
__reflect(ChoseBox.prototype, "ChoseBox");
//# sourceMappingURL=ChoseBox.js.map