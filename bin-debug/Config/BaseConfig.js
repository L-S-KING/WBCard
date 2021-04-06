var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseConfig = (function () {
    function BaseConfig() {
    }
    BaseConfig.prototype.init = function (configName, cls, collect) {
        var str = RES.getRes(configName);
        var row = str.split("\n");
        for (var i = 1; i < row.length; ++i) {
            var colum = row[i].split("\t");
            collect.push(new cls(colum));
        }
    };
    return BaseConfig;
}());
__reflect(BaseConfig.prototype, "BaseConfig");
//# sourceMappingURL=BaseConfig.js.map