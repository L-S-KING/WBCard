var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalManager = (function () {
    function GlobalManager() {
        this._rootLayer = null;
        this.curScene = null;
        this.sceneLayer = null;
        this.effectLayer = null;
        this.uiLayer = null;
        this.tipsLayer = null;
    }
    Object.defineProperty(GlobalManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new GlobalManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GlobalManager.prototype.setRootLayer = function (layer) {
        this._rootLayer = layer;
    };
    Object.defineProperty(GlobalManager.prototype, "rootLayer", {
        get: function () {
            return this._rootLayer;
        },
        enumerable: true,
        configurable: true
    });
    GlobalManager.prototype.initLayer = function (stage) {
        GameConst.stage = stage;
        this.sceneLayer = new BaseLayer();
        this.effectLayer = new BaseLayer();
        this.uiLayer = new BaseLayer();
        this.tipsLayer = new BaseLayer();
        stage.addChild(this.sceneLayer);
        stage.addChild(this.uiLayer);
        stage.addChild(this.effectLayer);
        stage.addChild(this.tipsLayer);
        this.uiLayer.touchEnabled = false;
        this.uiLayer.touchChildren = true;
        this.uiLayer.touchThrough = true;
        this.effectLayer.touchEnabled = false;
        this.effectLayer.touchThrough = true;
        this.effectLayer.touchChildren = false;
        this.tipsLayer.touchEnabled = false;
        this.tipsLayer.touchThrough = true;
        this.tipsLayer.touchChildren = false;
    };
    GlobalManager.prototype.addToLayer = function (obj, layerType, depth) {
        var layer = null;
        switch (layerType) {
            case LayerType.scene:
                layer = this.sceneLayer;
                break;
            case LayerType.effect:
                layer = this.effectLayer;
                break;
            case LayerType.ui:
                layer = this.uiLayer;
                break;
            case LayerType.tips:
                layer = this.tipsLayer;
                break;
        }
        if (depth >= 0) {
            layer.addChildAt(obj, depth);
        }
        else {
            layer.addChild(obj);
        }
    };
    GlobalManager.prototype.removeObjFromLayer = function (obj, type) {
        var layer = null;
        switch (type) {
            case LayerType.scene:
                layer = this.sceneLayer;
                break;
            case LayerType.effect:
                layer = this.effectLayer;
                break;
            case LayerType.ui:
                layer = this.uiLayer;
                break;
            case LayerType.tips:
                layer = this.tipsLayer;
                break;
        }
        if (layer.contains(obj)) {
            layer.removeChild(obj);
        }
    };
    GlobalManager.prototype.getLayer = function (type) {
        var layer = null;
        switch (type) {
            case LayerType.scene:
                layer = this.sceneLayer;
                break;
            case LayerType.effect:
                layer = this.effectLayer;
                break;
            case LayerType.ui:
                layer = this.uiLayer;
                break;
            case LayerType.tips:
                layer = this.tipsLayer;
                break;
        }
        if (layer) {
            return layer;
        }
        else {
            //egret.error("指定layer类型错误")
        }
    };
    GlobalManager.prototype.removeAllObj = function () {
        while (this.sceneLayer.numChildren > 0) {
            this.sceneLayer.removeChild(this.sceneLayer.getChildAt(0));
        }
        while (this.uiLayer.numChildren > 0) {
            this.uiLayer.removeChild(this.uiLayer.getChildAt(0));
        }
        while (this.tipsLayer.numChildren > 0) {
            this.tipsLayer.removeChild(this.tipsLayer.getChildAt(0));
        }
        while (this.effectLayer.numChildren > 0) {
            this.effectLayer.removeChild(this.effectLayer.getChildAt(0));
        }
    };
    GlobalManager._instance = null;
    return GlobalManager;
}());
__reflect(GlobalManager.prototype, "GlobalManager");
var LayerType;
(function (LayerType) {
    LayerType[LayerType["scene"] = 0] = "scene";
    LayerType[LayerType["effect"] = 1] = "effect";
    LayerType[LayerType["ui"] = 2] = "ui";
    LayerType[LayerType["tips"] = 3] = "tips";
})(LayerType || (LayerType = {}));
//# sourceMappingURL=GlobalManager.js.map