/**
 * Created by Cao on 2019/11/13.
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
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label() {
            var _this = _super.call(this) || this;
            _this.textFlowArr = [];
            return _this;
        }
        Label.prototype.addTextFlow = function (text, textColor, size, fontFamily, italic, strokeColor, stroke) {
            var style = {};
            if (textColor)
                style.textColor = textColor;
            if (size)
                style.size = size;
            if (fontFamily)
                style.fontFamily = fontFamily;
            if (italic)
                style.italic = italic;
            if (strokeColor)
                style.strokeColor = strokeColor;
            if (stroke)
                style.stroke = stroke;
            this.textFlowArr.push({ text: text, style: style });
            this.textFlow = this.textFlowArr;
        };
        return Label;
    }(eui.Label));
    game.Label = Label;
    __reflect(Label.prototype, "game.Label");
})(game || (game = {}));
//# sourceMappingURL=Label.js.map