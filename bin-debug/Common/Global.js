/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Global = (function () {
    function Global() {
    }
    Global.design_width = 480;
    Global.design_height = 900;
    Global.ip = "127.0.0.1";
    Global.serverPath = "http://" + Global.ip + ":8080/service/";
    return Global;
}());
__reflect(Global.prototype, "Global");
//# sourceMappingURL=Global.js.map