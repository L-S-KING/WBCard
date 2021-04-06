var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TrapLineConfigModel = (function () {
    function TrapLineConfigModel(data) {
        this.startPos = new egret.Point();
        this.endPos = new egret.Point();
        this.rotateRate = 0;
        this.speedVector = new egret.Point();
        this.speed = 0;
        this.moveLength = 0;
        this.id = parseInt(data[0]);
        this.startPos.x = parseInt(data[1]);
        this.startPos.y = parseInt(data[2]);
        this.endPos.x = parseInt(data[3]);
        this.endPos.y = parseInt(data[4]);
        this.rotateRate = parseInt(data[5]);
        this.speedVector.x = parseInt(data[6]);
        this.speedVector.y = parseInt(data[7]);
        this.speed = parseFloat(data[8]);
        this.moveLength = parseInt(data[9]);
    }
    return TrapLineConfigModel;
}());
__reflect(TrapLineConfigModel.prototype, "TrapLineConfigModel");
//# sourceMappingURL=TrapLineConfigModel.js.map