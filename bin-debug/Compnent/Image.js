/**
 * Created by Jacob.Yang on 2017/7/12.
 *
 */
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
var game;
(function (game) {
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(imageKey, url) {
            var _this = _super.call(this) || this;
            _this.imageKey = imageKey;
            _this.url = url;
            return _this;
        }
        Image.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.imageKey != null && this.imageKey != "") {
                RES.getResAsync(this.imageKey, this.completeHandler, this);
            }
            else if (this.url != null && this.url != "") {
                RES.getResByUrl(this.url, this.completeHandler, this);
            }
            else {
                egret.warn("game.Image:imageKey或url不合法");
            }
        };
        Image.prototype.setByKey = function (imageKey) {
            if (imageKey == null || imageKey == "") {
                egret.warn("game.Image:imageKey不合法");
                return;
            }
            RES.getResAsync(this.imageKey, this.completeHandler, this);
        };
        Image.prototype.setByUrl = function (url) {
            if (url == null || url == "") {
                egret.warn("game.Image:url不合法");
                return;
            }
            RES.getResByUrl(this.url, this.completeHandler, this);
        };
        Image.prototype.completeHandler = function (tex, url) {
            if (tex == null) {
                egret.warn("读取资源失败:imageKey:" + this.imageKey + ",url:" + this.url);
                return;
            }
            this.source = tex;
        };
        return Image;
    }(eui.Image));
    game.Image = Image;
    __reflect(Image.prototype, "game.Image");
})(game || (game = {}));
//# sourceMappingURL=Image.js.map