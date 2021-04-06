/**
 * Created by Jacob.Yang on 2017/7/11.
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
var MovieClipCompnent = (function (_super) {
    __extends(MovieClipCompnent, _super);
    function MovieClipCompnent(aniName, removeAfterComplete) {
        var _this = _super.call(this) || this;
        RES.getResAsync(aniName + "_json", _this.loadMcDataHandler, _this);
        RES.getResAsync(aniName + "_png", _this.loadTexHandler, _this);
        _this.aniName = aniName;
        _this.removeAfterComplete = removeAfterComplete;
        _this.isStop = false;
        _this.playTimes = 1;
        _this.frame = 1;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    MovieClipCompnent.prototype.onRemoveFromStage = function (e) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        if (this.mc) {
            this.mc.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.mc.stop();
            this.mc = null;
        }
    };
    MovieClipCompnent.prototype.loadMcDataHandler = function (data, key) {
        this.mcData = data;
        this.createMc();
    };
    MovieClipCompnent.prototype.loadTexHandler = function (data, key) {
        this.texture = data;
        this.createMc();
    };
    MovieClipCompnent.prototype.createMc = function () {
        if (this.mcData && this.texture) {
            var mcDataFactory = new egret.MovieClipDataFactory(this.mcData, this.texture);
            this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData(this.aniName));
            this.mc.addEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.addChild(this.mc);
            if (this.isStop) {
                this.stop();
            }
            else {
                this.gotoAndPlay(this.frame, this.playTimes);
            }
        }
    };
    MovieClipCompnent.prototype.stop = function () {
        this.isStop = true;
        if (this.mc) {
            this.mc.stop();
        }
    };
    MovieClipCompnent.prototype.gotoAndPlay = function (frame, playTimes) {
        if (playTimes === void 0) { playTimes = -1; }
        this.frame = frame;
        this.playTimes = playTimes;
        if (this.mc) {
            this.mc.gotoAndPlay(frame, playTimes);
        }
    };
    MovieClipCompnent.prototype.gotoAndStop = function (frame) {
        if (this.mc) {
            this.mc.gotoAndStop(frame);
        }
    };
    MovieClipCompnent.prototype.completeHandler = function (e) {
        if (this.removeAfterComplete) {
            if (this.parent) {
                if (this.parent.contains(this)) {
                    this.parent.removeChild(this);
                }
            }
        }
        //Message.instance.send( MsgCMD.MOVIECLIP_PLAY_OVER , this );
    };
    return MovieClipCompnent;
}(egret.Sprite));
__reflect(MovieClipCompnent.prototype, "MovieClipCompnent");
//# sourceMappingURL=MovieClipCompnent.js.map