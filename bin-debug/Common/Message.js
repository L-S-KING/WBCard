/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Message = (function () {
    function Message() {
        this.msgMap = new HashMap();
    }
    Object.defineProperty(Message, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new Message();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加监听
     * @param cmd 消息类型
     * @param msg 监听函数
     */
    Message.prototype.add = function (cmd, msg) {
        var list = this.msgMap.get(cmd);
        if (!list) {
            list = [];
            this.msgMap.put(cmd, list);
        }
        if (list.indexOf(msg) == -1) {
            list.push(msg);
        }
    };
    /**
     * 移除监听
     * @param cmd 消息类型
     * @param msg 监听函数
     */
    Message.prototype.remove = function (cmd, msg) {
        var list = this.msgMap.get(cmd);
        if (list) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                if (list[i] == msg) {
                    list[i] = null;
                }
            }
        }
    };
    /**
     * 发送消息
     * @param cmd 消息类型
     * @param data 数据
     */
    Message.prototype.send = function (cmd, data) {
        if (data === void 0) { data = null; }
        var list = this.msgMap.get(cmd);
        if (list) {
            var len = list.length;
            for (var i = 0; i < len;) {
                if (!list[i]) {
                    list.splice(i, 1);
                    len--;
                    continue;
                }
                list[i].recvMsg.call(list[i], cmd, data);
                i++;
            }
            if (len <= 0) {
                this.msgMap.remove(cmd);
            }
        }
    };
    return Message;
}());
__reflect(Message.prototype, "Message");
//# sourceMappingURL=Message.js.map