var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TipsManager = (function () {
    function TipsManager() {
        this.tipsArr = [];
    }
    Object.defineProperty(TipsManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new TipsManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    TipsManager.prototype.createTips = function (text) {
        var tips = new Tips(text);
        egret.MainContext.instance.stage.addChild(tips);
        if (this.tipsArr.length > 0) {
            for (var i = 0; i < this.tipsArr.length; i++) {
                this.tipsArr[i].y = this.tipsArr[i].y - 30;
            }
        }
        tips.y = 300;
        this.tipsArr.push(tips);
    };
    TipsManager.prototype.removeTips = function (obj) {
        if (obj) {
            var index = this.tipsArr.indexOf(obj);
            this.tipsArr[index].parent.removeChild(this.tipsArr[index]);
            this.tipsArr.splice(index, 1);
        }
    };
    /**伤害，治疗显示数字
     * data:value:伤害或治疗量
     * type：类型，0为伤害数字，1为治疗数字
     * x，y：位置
     */
    TipsManager.prototype.createViewNumber = function (data) {
        var numberText = new ViewNumber(data);
        GlobalManager.Instance.addToLayer(numberText, LayerType.tips);
    };
    TipsManager._instance = null;
    return TipsManager;
}());
__reflect(TipsManager.prototype, "TipsManager");
//# sourceMappingURL=TipsManager.js.map