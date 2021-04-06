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
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        var _this = _super.call(this) || this;
        //贝塞尔虚线
        _this.shp = null;
        //起始点
        _this.initialX = 0;
        _this.initialY = 0;
        //控制点
        _this.px = 0;
        _this.py = 0;
        //箭头
        _this.arrow = null;
        _this.card = null;
        _this.canMove = false;
        _this.isTouchDown = false;
        var stage = egret.MainContext.instance.stage;
        _this.addListener(stage, egret.TouchEvent.TOUCH_BEGIN, _this.drawBegin, _this);
        _this.addListener(stage, egret.TouchEvent.TOUCH_MOVE, _this.drawing, _this);
        _this.addListener(stage, egret.TouchEvent.TOUCH_END, _this.drawEnd, _this);
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    Arrow.prototype.update = function () {
        if (this.arrow) {
            var mArr = CharacterManager.Instance.monsterArr;
            for (var i = 0; i < mArr.length; i++) {
                if (!mArr[i].isDead) {
                    var pX = this.localToGlobal(this.arrow.x, this.arrow.y).x;
                    var pY = this.localToGlobal(this.arrow.x, this.arrow.y).y;
                    if (Math.abs(pX - mArr[i].x) <= (mArr[i].body.width + 50) * 0.5 && Math.abs(pY - (mArr[i].y - mArr[i].body.height * 0.5)) <= (mArr[i].body.height + 50) * 0.5) {
                        if (GameManager.Instance.curSelectMonster && GameManager.Instance.curSelectMonster != mArr[i]) {
                            GameManager.Instance.curSelectMonster.canselSelected();
                        }
                        GameManager.Instance.curSelectMonster = mArr[i];
                        mArr[i].selected();
                        return;
                    }
                    else {
                        mArr[i].canselSelected();
                    }
                }
            }
            GameManager.Instance.curSelectMonster = null;
        }
        else {
            var mArr = CharacterManager.Instance.monsterArr;
            GameManager.Instance.curSelectMonster = null;
            for (var i = 0; i < mArr.length; i++) {
                mArr[i].canselSelected();
            }
        }
    };
    /**开始绘制 */
    Arrow.prototype.drawBegin = function (e) {
        if (this.isTouchDown) {
            return;
        }
        //获得起始点
        this.card = GameManager.Instance.curSelectCard;
        if (!this.card) {
            return;
        }
        if (this.card.type == 0) {
            this.canMove = true;
        }
        else {
            return;
        }
        this.initialX = this.card.x;
        this.initialY = this.card.y - 100;
        //获得P点
        this.px = this.initialX;
        this.py = this.initialY - 200;
        this.shp = new egret.Shape();
        this.shp.graphics.moveTo(this.initialX, this.initialY);
        this.addChild(this.shp);
        //箭头图片
        this.arrow = new egret.Bitmap(RES.getRes("arrow_png"));
        this.addChild(this.arrow);
        this.arrow.anchorOffsetY = this.arrow.height * 0.5;
        this.arrow.x = this.initialX;
        this.arrow.y = this.initialY;
        this.isTouchDown = true;
    };
    /**绘制中 */
    Arrow.prototype.drawing = function (e) {
        if (!this.canMove) {
            return;
        }
        //曲线
        var shape = this.shp;
        shape.graphics.clear();
        shape.graphics.lineStyle(18, 0xcccccc, 1, null, null, null, null, null, [12, 24]);
        shape.graphics.moveTo(this.initialX, this.initialY);
        shape.graphics.curveTo(this.px, this.py, e.stageX, e.stageY - 100);
        //指针旋转角度
        var kx = e.stageX - this.initialX;
        var ky = e.stageY - this.initialY - 100;
        var radious = Math.atan(ky / kx) * 180 / Math.PI;
        //指针位置
        this.arrow.x = e.stageX;
        this.arrow.y = e.stageY - 100;
        if (e.stageX > this.initialX) {
            this.arrow.rotation = radious + 35;
        }
        else {
            this.arrow.rotation = -210 + radious;
        }
    };
    /**结束绘制 */
    Arrow.prototype.drawEnd = function (e) {
        var monster = GameManager.Instance.curSelectMonster;
        if (monster) {
            monster.cardAttackCaracter();
            monster.canselSelected();
            GameManager.Instance.curSelectMonster = null;
        }
        else {
            if (this.card) {
                this.card.cancelSelect();
            }
        }
        if (this.shp != null) {
            this.canMove = false;
            this.shp.graphics.clear();
            if (this.arrow && this.arrow.parent) {
                this.removeChild(this.arrow);
                this.arrow = null;
            }
        }
        this.isTouchDown = false;
    };
    return Arrow;
}(BaseModule));
__reflect(Arrow.prototype, "Arrow");
//# sourceMappingURL=Arrow.js.map