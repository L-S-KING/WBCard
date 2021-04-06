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
/**
 * Created by Jacob.Yang on 2016/6/14.
 *
 */
var BaseModule = (function (_super) {
    __extends(BaseModule, _super);
    function BaseModule() {
        var _this = _super.call(this) || this;
        _this.worldTime = 0;
        _this.listenerArray = [];
        _this.messageArray = [];
        _this.addListener(_this, egret.Event.REMOVED_FROM_STAGE, _this.removefromViewPort, _this);
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.addToViewPort, _this);
        return _this;
    }
    //接收消息
    BaseModule.prototype.recvMsg = function (cmd, data) {
    };
    BaseModule.prototype.addToViewPort = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToViewPort, this);
    };
    BaseModule.prototype.addListener = function (dis, type, listener, thisObject, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        this.listenerArray.push([dis, type, listener, thisObject, useCapture]);
        dis.addEventListener(type, listener, thisObject, useCapture);
    };
    BaseModule.prototype.removeListener = function (dis, type, listener, thisObject, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        for (var i = 0; i < this.listenerArray.length; ++i) {
            if (this.listenerArray[i][0] == dis &&
                this.listenerArray[i][1] == type &&
                this.listenerArray[i][2] == listener &&
                this.listenerArray[i][3] == thisObject &&
                this.listenerArray[i][4] == useCapture) {
                dis.removeEventListener(type, listener, this, useCapture);
                this.listenerArray.splice(i, 1);
                i--;
            }
        }
    };
    BaseModule.prototype.addMessage = function (msgId, msgObj) {
        this.messageArray.push([msgId, msgObj]);
        Message.instance.add(msgId, msgObj);
    };
    BaseModule.prototype.removefromViewPort = function (e) {
        this.destroy();
    };
    BaseModule.prototype.destroy = function () {
        egret.Tween.removeTweens(this);
        while (this.numChildren > 0) {
            egret.Tween.removeTweens(this.getChildAt(0));
            this.removeChildAt(0);
        }
        if (this.listenerArray) {
            for (var i = 0; i < this.listenerArray.length; i++) {
                this.listenerArray[i][0].removeEventListener(this.listenerArray[i][1], this.listenerArray[i][2], this.listenerArray[i][3], this.listenerArray[i][4]);
            }
        }
        this.listenerArray = null;
        if (this.messageArray) {
            for (var i = 0; i < this.messageArray.length; ++i) {
                Message.instance.remove(this.messageArray[i][0], this.messageArray[i][1]);
            }
            this.messageArray = null;
        }
    };
    return BaseModule;
}(eui.Component));
__reflect(BaseModule.prototype, "BaseModule", ["IMessage"]);
//# sourceMappingURL=BaseModule.js.map