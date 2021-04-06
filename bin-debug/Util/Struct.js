var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AttributeGain = (function () {
    function AttributeGain() {
    }
    return AttributeGain;
}());
__reflect(AttributeGain.prototype, "AttributeGain");
var DamageData = (function () {
    function DamageData() {
        this.damageType = null;
        this.damageValue = 0;
    }
    return DamageData;
}());
__reflect(DamageData.prototype, "DamageData");
//# sourceMappingURL=Struct.js.map