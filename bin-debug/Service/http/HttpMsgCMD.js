/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpMsgCMD = (function () {
    function HttpMsgCMD() {
    }
    HttpMsgCMD.USER_LOGIN = "user/login";
    return HttpMsgCMD;
}());
__reflect(HttpMsgCMD.prototype, "HttpMsgCMD");
//# sourceMappingURL=HttpMsgCMD.js.map