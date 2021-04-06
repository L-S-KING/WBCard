var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UiManager = (function () {
    function UiManager() {
        this.uiList = [];
    }
    Object.defineProperty(UiManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new UiManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    UiManager.prototype.addRectBg = function (uiName) {
        var width = GameConst.stage.stageWidth;
        var height = GameConst.stage.stageHeight;
        var rect = new eui.Rect(width, height, 0x000000);
        rect.name = "uiRect" + uiName;
        rect.alpha = 0;
        return rect;
    };
    UiManager.prototype.addUiToUiLayer = function (className, showBg, data, depth) {
        var uiName = egret.getQualifiedClassName(className);
        if (!uiName) {
            //egret.error("类名为空，类名输入错误")
            return;
        }
        if (showBg) {
            var bg = this.addRectBg(uiName);
            GlobalManager.Instance.addToLayer(bg, LayerType.ui, 0);
        }
        var ui = new className(data);
        if (ui && !ui.parent) {
            GlobalManager.Instance.addToLayer(ui, LayerType.ui, depth);
            if (showBg) {
                egret.Tween.get(bg).to({ alpha: 0.7 }, 100, egret.Ease.sineOut);
            }
            this.uiList.push(ui);
        }
    };
    UiManager.prototype.removeUiFromLayer = function (ui) {
        if (this.uiList.indexOf(ui) >= 0) {
            GlobalManager.Instance.removeObjFromLayer(ui, LayerType.ui);
            var layer = GlobalManager.Instance.getLayer(LayerType.ui);
            var rectBg = layer.getChildByName("uiRect" + ui.name);
            GlobalManager.Instance.removeObjFromLayer(rectBg, LayerType.ui);
        }
    };
    UiManager._instance = null;
    return UiManager;
}());
__reflect(UiManager.prototype, "UiManager");
//# sourceMappingURL=UiManager.js.map