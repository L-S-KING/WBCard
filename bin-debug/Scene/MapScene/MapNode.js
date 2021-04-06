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
var MapNodeType;
(function (MapNodeType) {
    MapNodeType[MapNodeType["normalMonster"] = 0] = "normalMonster";
    MapNodeType[MapNodeType["eliteMonster"] = 1] = "eliteMonster";
    MapNodeType[MapNodeType["bossMonster"] = 2] = "bossMonster";
    MapNodeType[MapNodeType["questionMark"] = 3] = "questionMark";
    MapNodeType[MapNodeType["restArea"] = 4] = "restArea";
    MapNodeType[MapNodeType["shop"] = 5] = "shop"; //商店
})(MapNodeType || (MapNodeType = {}));
var MapNode = (function (_super) {
    __extends(MapNode, _super);
    function MapNode(data, sprite, isShow) {
        if (isShow === void 0) { isShow = false; }
        var _this = _super.call(this) || this;
        _this.nodeType = null;
        _this.canSelect = false;
        _this.originX = 0;
        _this.originY = 0;
        _this.frontNodeIdArr = [];
        _this.id = 0;
        _this.group = null;
        _this.layer = 0;
        _this.isShow = false;
        _this.isSelect = false;
        _this.isClear = 0;
        _this.levelId = 0;
        if (data) {
            _this.data = data;
        }
        _this.isShow = isShow;
        _this.group = sprite;
        _this.skinName = "MapNodeSkin";
        return _this;
    }
    MapNode.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
        this.initData();
        this.setNode();
        this.addEvent();
    };
    MapNode.prototype.initData = function () {
        this.id = this.data.id;
        if (GameManager.Instance.clearNodeIdArr.indexOf(this.id) >= 0) {
            this.isClear = 1;
            this.isSelect = true;
        }
        this.nodeType = MapNodeType[this.data.nodeType];
        this.originX = this.data.posX;
        this.originY = this.data.posY + 1440;
        this.layer = this.data.layer;
        this.levelId = this.data.levelId;
        var nodeArr = this.data.frondNode.split(',');
        for (var i in nodeArr) {
            this.frontNodeIdArr.push(parseInt(nodeArr[i]));
        }
    };
    Object.defineProperty(MapNode.prototype, "select", {
        get: function () {
            return this.isSelect;
        },
        set: function (value) {
            this.isSelect = value;
        },
        enumerable: true,
        configurable: true
    });
    MapNode.prototype.addEvent = function () {
        if (!this.isShow)
            this.addListener(this, egret.TouchEvent.TOUCH_TAP, this.touch, this);
    };
    Object.defineProperty(MapNode.prototype, "bodyImg", {
        get: function () {
            return this.main_img;
        },
        enumerable: true,
        configurable: true
    });
    MapNode.prototype.setNode = function () {
        this.x = this.originX - this.main_img.x;
        this.y = this.originY - this.main_img.y;
        switch (this.nodeType) {
            case MapNodeType.normalMonster:
                this.main_img.source = "monster_png";
                break;
            case MapNodeType.questionMark:
                this.main_img.source = "event_png";
                break;
            case MapNodeType.eliteMonster:
                this.main_img.source = "elite_png";
                break;
            case MapNodeType.restArea:
                this.main_img.source = "rest_png";
                break;
            case MapNodeType.shop:
                this.main_img.source = "shop_png";
                break;
            case MapNodeType.bossMonster:
                this.main_img.source = "champ_png";
                this.scaleX = this.scaleY = 3;
                this.x = this.x - this.width * 3 * 0.5;
                this.y = this.y - this.height * 3 * 0.5;
                break;
        }
        var frontPosArr = [];
        for (var i = 0; i < SceneManager.Instance.mapScene.nodeArr.length; i++) {
            if (this.frontNodeIdArr.indexOf(SceneManager.Instance.mapScene.nodeArr[i].id) >= 0) {
                var point = new egret.Point(SceneManager.Instance.mapScene.nodeArr[i].x + SceneManager.Instance.mapScene.nodeArr[i].bodyImg.x, SceneManager.Instance.mapScene.nodeArr[i].y + SceneManager.Instance.mapScene.nodeArr[i].bodyImg.y);
                frontPosArr.push(point);
            }
        }
        if (this.frontNodeIdArr.length > 0 && !isNaN(this.frontNodeIdArr[0])) {
            var mapScene = SceneManager.Instance.mapScene;
            // egret.log(GameManager.Instance.clearNodeIdArr);
            for (var i = 0; i < this.frontNodeIdArr.length; i++) {
                if (GameManager.Instance.clearNodeIdArr.indexOf(this.frontNodeIdArr[i]) >= 0) {
                    if (this.isClear == 0) {
                        this.isSelect = false;
                        egret.Tween.get(this.main_img, { loop: true }).to({ scaleX: 1.5, scaleY: 1.5 }, 400, egret.Ease.sineOut).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.sineIn);
                        break;
                    }
                }
                else {
                    this.isSelect = true;
                }
            }
        }
        else if (isNaN(this.frontNodeIdArr[0])) {
            if (!this.isSelect)
                egret.Tween.get(this.main_img, { loop: true }).to({ scaleX: 1.5, scaleY: 1.5 }, 400, egret.Ease.sineOut).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.sineIn);
        }
        if (!this.isSelect && GameManager.Instance.curLayer > this.layer) {
            this.isSelect = true;
            egret.Tween.removeTweens(this.main_img);
        }
        for (var i = 0; i < frontPosArr.length; i++) {
            var kY = (this.y + this.main_img.y) - frontPosArr[i].y;
            var kX = (this.x + this.main_img.x) - frontPosArr[i].x;
            var notLength = new egret.Point(kX, kY).length;
            var notCount = Math.ceil(notLength / 20) - 1;
            var kRandius = Math.atan2(kY, kX);
            for (var j = 1; j < notCount; j++) {
                var not = new egret.Bitmap();
                not.texture = RES.getRes("dot1_png");
                this.group.addChildAt(not, 1);
                not.anchorOffsetX = not.width >> 1;
                not.anchorOffsetY = not.height >> 1;
                //egret.log(Math.sin(kRandius));
                not.x = frontPosArr[i].x + 20 * j * Math.cos(kRandius) + Math.random() * 5;
                not.y = frontPosArr[i].y + 20 * j * Math.sin(kRandius) + Math.random() * 5;
                not.rotation = kRandius * 180 / Math.PI;
            }
        }
        if (this.nodeType != MapNodeType.bossMonster) {
            var cirImg = new egret.Bitmap();
            this.addChild(cirImg);
            cirImg.x = this.main_img.x;
            cirImg.y = this.main_img.height * 0.5 + 192 >> 1;
            this.circle = new ImgAnim();
            this.circle.initData("circle", 5, cirImg, 2, false, false, this.openLevel, this);
        }
        else {
            egret.Tween.removeTweens(this.main_img);
        }
    };
    MapNode.prototype.touch = function () {
        if (this.isSelect) {
            return;
        }
        this.isSelect = true;
        var nodeArr = SceneManager.Instance.mapScene.nodeArr;
        for (var i = 0; i < nodeArr.length; i++) {
            nodeArr[i].select = true;
        }
        egret.Tween.removeTweens(this.main_img);
        if (this.nodeType != MapNodeType.bossMonster) {
            this.main_img.alpha = 1;
            this.main_img.scaleX = this.main_img.scaleY = 1;
            this.circle.playAnim();
        }
        else {
            egret.Tween.get(this).to({ alpha: 0.5 }, 300).call(this.openLevel, this);
        }
    };
    MapNode.prototype.openLevel = function () {
        switch (this.nodeType) {
            case MapNodeType.normalMonster:
                SceneManager.Instance.setCurScene(new GameScene({ id: this.levelId }));
                UiManager.Instance.addUiToUiLayer(GameSceneCardUi, false);
                Message.instance.send(MsgCMD.PLAYER_ROUND_START);
                break;
            case MapNodeType.questionMark:
                EventManager.Instance.randomAddEventScene();
                break;
            case MapNodeType.eliteMonster:
                SceneManager.Instance.setCurScene(new GameScene({ id: this.levelId }));
                UiManager.Instance.addUiToUiLayer(GameSceneCardUi, false);
                Message.instance.send(MsgCMD.PLAYER_ROUND_START);
                break;
            case MapNodeType.restArea:
                SceneManager.Instance.setCurScene(new RestScene());
                break;
            case MapNodeType.shop:
                SceneManager.Instance.setCurScene(new ShopScene());
                break;
            case MapNodeType.bossMonster:
                SceneManager.Instance.setCurScene(new GameScene({ id: this.levelId }));
                UiManager.Instance.addUiToUiLayer(GameSceneCardUi, false);
                Message.instance.send(MsgCMD.PLAYER_ROUND_START);
                break;
        }
        GameManager.Instance.curSelectNodeId = this.id;
        SceneManager.Instance.mapScene.removeSelf();
    };
    return MapNode;
}(BaseModule));
__reflect(MapNode.prototype, "MapNode");
//# sourceMappingURL=MapNode.js.map