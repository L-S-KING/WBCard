/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpMessage = (function () {
    function HttpMessage() {
        this.serverTime = 0;
    }
    Object.defineProperty(HttpMessage, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new HttpMessage();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    HttpMessage.prototype.send = function (url, params, callBack, thisObject) {
        params = params || {};
        var that = this;
        function success(data) {
            //WaitManager.instance.remove(url);
            if (data) {
                if (data.ret == true) {
                    callBack.call(thisObject, data.data);
                }
                else {
                    egret.log(data.msg);
                }
            }
            else {
                egret.log("data is null");
            }
        }
        function error(xhr, errorType, err) {
            egret.log(url + " error");
        }
        var request = new egret.HttpRequest();
        request.addEventListener(egret.Event.COMPLETE, function (e) {
            success(JSON.parse(e.target.response));
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
            console.log("HTTP_IO_ERROR");
        }, this);
        var paramStr = "";
        var sign = "";
        for (var key in params) {
            if (params[key] instanceof Array) {
                paramStr += sign + key + "=" + JSON.stringify(params[key]);
            }
            else {
                paramStr += sign + key + "=" + params[key];
            }
            sign = "&";
        }
        request.open(Global.serverPath + url, egret.HttpMethod.POST);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(paramStr);
        console.log("request:" + Global.serverPath + url + "——paramStr:" + paramStr);
    };
    HttpMessage.prototype.getServerTime = function () {
        return this.serverTime + Math.floor(egret.getTimer() / 1000);
    };
    return HttpMessage;
}());
__reflect(HttpMessage.prototype, "HttpMessage");
//# sourceMappingURL=HttpMessage.js.map