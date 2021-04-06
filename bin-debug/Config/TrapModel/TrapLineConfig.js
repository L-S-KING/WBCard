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
var TrapLineConfig = (function (_super) {
    __extends(TrapLineConfig, _super);
    function TrapLineConfig() {
        return _super.call(this) || this;
    }
    Object.defineProperty(TrapLineConfig, "instnace", {
        get: function () {
            if (this._instance == null) {
                this._instance = new TrapLineConfig();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    TrapLineConfig.prototype.initLevelData = function (value) {
        this.dataList = [];
        _super.prototype.init.call(this, "trap_" + value + "_txt", TrapLineConfigModel, this.dataList);
    };
    TrapLineConfig.prototype.getTrapArr = function () {
        return this.dataList;
    };
    TrapLineConfig.prototype.getExamnpleById = function (id) {
        for (var i = 0; i < this.dataList.length; ++i) {
            if (this.dataList[i].id == id) {
                return this.dataList[i];
            }
        }
        return null;
    };
    return TrapLineConfig;
}(BaseConfig));
__reflect(TrapLineConfig.prototype, "TrapLineConfig");
//# sourceMappingURL=TrapLineConfig.js.map