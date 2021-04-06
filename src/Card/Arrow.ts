class Arrow extends BaseModule{
	public constructor() 
	{
		super();
		var stage = egret.MainContext.instance.stage;
		this.addListener(stage,egret.TouchEvent.TOUCH_BEGIN,this.drawBegin,this);
		this.addListener(stage,egret.TouchEvent.TOUCH_MOVE,this.drawing,this);
		this.addListener(stage,egret.TouchEvent.TOUCH_END,this.drawEnd,this);
        this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
	}

	//贝塞尔虚线
	private shp:egret.Shape = null;
	//起始点
    private initialX:number = 0;
    private initialY:number = 0;
	//控制点
    private px:number = 0;
    private py:number = 0;
    //箭头
    private arrow:egret.Bitmap = null;

    private card:Card = null;

    private canMove:boolean = false;

    private isTouchDown:boolean = false;

    private update()
    {
        if(this.arrow)
        {
            var mArr = CharacterManager.Instance.monsterArr;
            for(var i=0;i<mArr.length;i++)
            {
                if(!mArr[i].isDead)
                {
                    var pX:number = this.localToGlobal(this.arrow.x,this.arrow.y).x;
                    var pY:number = this.localToGlobal(this.arrow.x,this.arrow.y).y;
                    if(Math.abs(pX-mArr[i].x)<=(mArr[i].body.width+50)*0.5&&Math.abs(pY-(mArr[i].y-mArr[i].body.height*0.5))<=(mArr[i].body.height+50)*0.5)
                    {
                        if(GameManager.Instance.curSelectMonster&&GameManager.Instance.curSelectMonster!=mArr[i])
                        {
                            GameManager.Instance.curSelectMonster.canselSelected();
                        }
                        GameManager.Instance.curSelectMonster = mArr[i];
                        mArr[i].selected();
                        return;
                    }
                    else
                    {
                        mArr[i].canselSelected();
                    }
                }
            }
            GameManager.Instance.curSelectMonster = null;
            
        }
        else
        {
            var mArr = CharacterManager.Instance.monsterArr;
            GameManager.Instance.curSelectMonster = null;
            for(var i=0;i<mArr.length;i++)
            {
                mArr[i].canselSelected();
            }
        }
    }

	/**开始绘制 */
    private drawBegin(e:egret.TouchEvent)
    {
        if(this.isTouchDown)
        {
            return;
        }
        //获得起始点
        
        this.card = GameManager.Instance.curSelectCard;
        if(!this.card)
        {
            return;
        }
        if(this.card.type == 0)
        {
            this.canMove = true;
        }
        else
        {
            return;
        }
        this.initialX = this.card.x;
        this.initialY = this.card.y-100;

        //获得P点
        this.px = this.initialX;
        this.py = this.initialY - 200;

        this.shp = new egret.Shape();
        this.shp.graphics.moveTo(this.initialX,this.initialY);
        this.addChild(this.shp);

        //箭头图片
        this.arrow = new egret.Bitmap(RES.getRes("arrow_png"));
        this.addChild(this.arrow);
        
        this.arrow.anchorOffsetY = this.arrow.height * 0.5;
        this.arrow.x = this.initialX;
        this.arrow.y = this.initialY;
        this.isTouchDown = true;
    }

    /**绘制中 */
    private drawing(e:egret.TouchEvent)
    {
        if(!this.canMove)
        {
            return;
        }
		//曲线
        var shape: egret.Shape = this.shp;
        shape.graphics.clear();
        shape.graphics.lineStyle(18,0xcccccc,1,null,null,null,null,null,[12,24])
        shape.graphics.moveTo(this.initialX, this.initialY);
        shape.graphics.curveTo(this.px, this.py, e.stageX,e.stageY-100);
		//指针旋转角度
        var kx:number = e.stageX - this.initialX;
        var ky:number = e.stageY - this.initialY - 100;
        var radious:number = Math.atan(ky/kx)*180/Math.PI;
		//指针位置
        this.arrow.x = e.stageX;
        this.arrow.y = e.stageY-100;
        if(e.stageX > this.initialX)
        {
            this.arrow.rotation = radious+35;
        }
        else{
            this.arrow.rotation = -210+radious;
        }
    }

    /**结束绘制 */
    private drawEnd(e:egret.TouchEvent)
    {
        var monster = GameManager.Instance.curSelectMonster
        if(monster)
        {
            
            monster.cardAttackCaracter();
            monster.canselSelected();
            GameManager.Instance.curSelectMonster = null;
        }
        else
        {
            if(this.card)
            {
                this.card.cancelSelect();
            }
        }
        if(this.shp != null)
        {
            this.canMove = false;
            this.shp.graphics.clear();
            if(this.arrow&&this.arrow.parent)
            {
                this.removeChild(this.arrow);
                this.arrow = null;
            }
        }
        this.isTouchDown = false;
    }
}