var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UtilManager = (function () {
    function UtilManager() {
    }
    Object.defineProperty(UtilManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new UtilManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 特效类，data的
     * x,y:位置
     * img:图片资源路径
     * type:类型
     */
    UtilManager.prototype.createVfx = function (data, depth) {
        var vfx = new Vfx(data);
        GlobalManager.Instance.addToLayer(vfx, LayerType.effect, depth);
    };
    UtilManager._instance = null;
    return UtilManager;
}());
__reflect(UtilManager.prototype, "UtilManager");
//# sourceMappingURL=UtilManager.js.map