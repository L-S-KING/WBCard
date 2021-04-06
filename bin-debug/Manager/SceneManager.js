var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
        this._curScene = null;
        this._abandonScene = null;
        this._mapScene = null;
    }
    Object.defineProperty(SceneManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new SceneManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "curScene", {
        get: function () {
            if (this._curScene) {
                return this._curScene;
            }
            else {
                //egret.error("当前场景为空");
            }
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.setCurScene = function (scene) {
        if (this._curScene) {
            GlobalManager.Instance.removeObjFromLayer(this._curScene, LayerType.scene);
            this._curScene = null;
        }
        this._curScene = scene;
        GlobalManager.Instance.addToLayer(scene, LayerType.scene);
    };
    SceneManager.prototype.removeCurScene = function () {
        if (this._curScene) {
            this._curScene.parent.removeChild(this._curScene);
            this._curScene = null;
        }
    };
    Object.defineProperty(SceneManager.prototype, "abandonScene", {
        set: function (scene) {
            this._abandonScene = scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "getAbandonScene", {
        get: function () {
            return this._abandonScene;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.addMapScene = function (scene) {
        if (this._mapScene) {
            GlobalManager.Instance.removeObjFromLayer(this._mapScene, LayerType.ui);
            this._mapScene = null;
        }
        this._mapScene = scene;
        GlobalManager.Instance.addToLayer(scene, LayerType.ui);
    };
    Object.defineProperty(SceneManager.prototype, "mapScene", {
        get: function () {
            return this._mapScene;
        },
        set: function (value) {
            this._mapScene = value;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager._instance = null;
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map