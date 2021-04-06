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
 * 草莓
 * 拾起时，玩家最大生命值增加7
 */
var Strawberry = (function (_super) {
    __extends(Strawberry, _super);
    function Strawberry(data, isPlayerHold) {
        var _this = _super.call(this, data, isPlayerHold) || this;
        _this.name = egret.getQualifiedClassName(Strawberry);
        _this.id = RelicManager.Instance.relicNameArr.indexOf(Strawberry);
        return _this;
    }
    Strawberry.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addMessage(MsgCMD.ITEM_GET, this);
    };
    Strawberry.prototype.relicEffect = function () {
        GameManager.Instance.maxHealth += 7;
    };
    Strawberry.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.ITEM_GET:
                if (SaveManager.Instance.userData) {
                    var userRelicIdArr = SaveManager.Instance.userData.relic;
                    if (userRelicIdArr.indexOf(this.id) >= 0) {
                        return;
                    }
                }
                if (data == this.name)
                    this.relicEffect();
                break;
        }
    };
    return Strawberry;
}(BaseRelic));
__reflect(Strawberry.prototype, "Strawberry");
//# sourceMappingURL=Strawberry.js.map