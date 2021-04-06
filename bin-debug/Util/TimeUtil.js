/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimeUtil = (function () {
    function TimeUtil() {
    }
    TimeUtil.format = function (time) {
        var second = time % 60;
        var minute = Math.floor(time / 60 % 60);
        var hour = Math.floor(time / (60 * 60));
        var minuteString = minute > 9 ? minute + "" : "0" + minute;
        var secondString = second > 9 ? second + "" : "0" + second;
        var hourString = hour > 9 ? hour + "" : "0" + hour;
        return hourString + ":" + minuteString + ":" + secondString;
    };
    return TimeUtil;
}());
__reflect(TimeUtil.prototype, "TimeUtil");
//# sourceMappingURL=TimeUtil.js.map