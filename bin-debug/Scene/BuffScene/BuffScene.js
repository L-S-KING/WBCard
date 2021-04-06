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
var BuffScene = (function (_super) {
    __extends(BuffScene, _super);
    function BuffScene(character) {
        var _this = _super.call(this) || this;
        _this._character = null;
        _this.skinName = "BuffSceneSkin";
        _this._character = character;
        var detailArr = [];
        if (_this._character) {
            for (var i = 0; i < _this._character.getHaveBuff().length; i++) {
                var data = {
                    detail: _this._character.getHaveBuff()[i].getDetail(),
                    name: _this._character.getHaveBuff()[i].getDetailName()
                };
                //egret.log(this._character.getHaveBuff());
                var detail = new BuffItemrenerer(data);
                _this.buffGroup.addChild(detail);
            }
        }
        return _this;
    }
    return BuffScene;
}(BaseScene));
__reflect(BuffScene.prototype, "BuffScene");
//# sourceMappingURL=BuffScene.js.map