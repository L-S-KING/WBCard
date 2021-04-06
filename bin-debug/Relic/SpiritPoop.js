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
/**
 * 精灵便便
 * 怎么看都不舒服
 */
var SpiritPoop = (function (_super) {
    __extends(SpiritPoop, _super);
    function SpiritPoop(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(SpiritPoop);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(SpiritPoop);
        return _this;
    }
    SpiritPoop.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    SpiritPoop.prototype.relicEffect = function () {
        if (!this.isPlayerHold) {
            return;
        }
    };
    SpiritPoop.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    return SpiritPoop;
}(BaseRelic));
__reflect(SpiritPoop.prototype, "SpiritPoop");
//# sourceMappingURL=SpiritPoop.js.map