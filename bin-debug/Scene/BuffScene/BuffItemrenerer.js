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
var BuffItemrenerer = (function (_super) {
    __extends(BuffItemrenerer, _super);
    function BuffItemrenerer(data) {
        var _this = _super.call(this) || this;
        _this.buffName = null;
        _this.buffDetail = null; //detail
        if (data) {
            _this.data = data;
        }
        _this.skinName = "BuffItemrenererSkin";
        return _this;
    }
    BuffItemrenerer.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.buffDetail = this.data.detail;
        this.buffName = this.data.name;
        if (this.buffName && this.buffDetail) {
            this.buffDetailLabel.text = this.buffName + ":" + this.buffDetail;
            this.height = this.buffDetailLabel.height + 15;
            this.rect.y = this.buffDetailLabel.y - 5;
            this.rect.height = this.height - 2.5;
        }
        else {
            ;
        }
    };
    return BuffItemrenerer;
}(BaseModule));
__reflect(BuffItemrenerer.prototype, "BuffItemrenerer");
//# sourceMappingURL=BuffItemrenerer.js.map