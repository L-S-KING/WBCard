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
var MapScene = (function (_super) {
    __extends(MapScene, _super);
    function MapScene(isShow) {
        if (isShow === void 0) { isShow = false; }
        var _this = _super.call(this) || this;
        _this.nodeCount = 0;
        _this._nodeArr = [];
        _this.isShow = false;
        _this.mapIndex = 0;
        if (isShow) {
            _this.isShow = isShow;
        }
        _this.name = "MapScene";
        _this.skinName = "MapSceneSkin";
        return _this;
    }
    MapScene.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setMap();
        this.y = 40;
    };
    MapScene.prototype.initData = function () {
        this.nodeCount = DataManager.Instance.getMapNodeCount(GameManager.Instance.curGameMapIndex);
    };
    MapScene.prototype.setMap = function () {
        if (this.isShow) {
            this.btn_cancel.visible = true;
        }
        else {
            this.btn_cancel.visible = false;
        }
        for (var i = 0; i < this.nodeCount; i++) {
            var data = DataManager.Instance.getMapNodeDataById(i + "");
            var node = new MapNode(data, this.map_Group, this.isShow);
            this.map_Group.addChild(node);
            this._nodeArr.push(node);
        }
        if (GameManager.Instance.curLayer >= 4 && GameManager.Instance.curLayer <= 15) {
            this.map_scroller.viewport.scrollV = 1440 - (GameManager.Instance.curLayer - 3) * 110;
        }
        else if (GameManager.Instance.curLayer < 4) {
            this.map_scroller.viewport.scrollV = 1440;
        }
        else if (GameManager.Instance.curLayer > 15) {
            this.map_scroller.viewport.scrollV = 0;
        }
        egret.Tween.get(this.map_scroller).to({ y: 50 }, 700, egret.Ease.sineIn);
        this.addListener(this.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
    };
    MapScene.prototype.removeSelf = function () {
        if (this && this.parent.contains(this)) {
            this.parent.removeChild(this);
            SceneManager.Instance.mapScene = null;
        }
    };
    Object.defineProperty(MapScene.prototype, "nodeArr", {
        get: function () {
            return this._nodeArr;
        },
        enumerable: true,
        configurable: true
    });
    return MapScene;
}(BaseScene));
__reflect(MapScene.prototype, "MapScene");
//# sourceMappingURL=MapScene.js.map