enum CharacterState
{
    Default,
    Attack,
    WaitRound,
    EndRound
}
class BaseCharacter extends BaseSprite
{
    protected data:CharacterData;
    protected _isDead:boolean = false;
    protected healthC:HealthCompnent = null;
    protected health:number = 0;
    protected bodyImg:egret.Bitmap = null;
    protected haveBuff:BaseBuff[] = [];                   //拥有的buff列表
    protected immunityBuffName:string[] = [];                   //免疫的buff列表
    protected attack:number = 0;                          //攻击力
    protected _powerUpValue:number = 0;                   //增加的攻击力
    protected originX:number = 0;
    protected originY:number = 0;
    protected _defense:number = 0;                        //
    protected _type:number = 0;                             //0为玩家，1为怪物
    protected _damageTimes:number = 1;                   //受伤倍数

    protected _attackTimes:number = 1;                   //伤害倍数

    protected _reserveDefense:boolean = false;            //回合开始是否保留格挡数

    protected _state:CharacterState = CharacterState.Default;
    //选择框
    private choseBox:ChoseBox = null;

    public redColor = [
           1,0,0,0,0,
           0,0,0,0,0,
           0,0,0,0,0,
           0,0,0,1,0
    ];
    public colorFlilter = new egret.ColorMatrixFilter(this.redColor);       //受伤滤镜
    public fliterTime:number = 0;
    public fliterDestroyTime:number = 10;


    public constructor(data?:CharacterData)
    {
        super();
        if(data)
        {
            this.data = data;
        }
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.setBodyImg();
        this.addHealthCompnent();
        this.addEvent();
    }

    public initData()
    {
        if(this.data)
        {
            //设置生命值
            //this.health = this.data.health;
            //this.name = this.data.name;
            this.originX = this.data.originX;
            this.originY = this.data.originY;
            this.touchEnabled = true;

            this.x = this.originX;
            this.y = this.originY;
        }
    }

    protected setBodyImg()
    {
        if(this.data)
        {
            var texture = RES.getRes(this.data.imgSource);
            if(texture)
            {
                this.bodyImg = new egret.Bitmap();
                this.bodyImg.texture = texture;
                this.addChild(this.bodyImg);
                this.bodyImg.anchorOffsetX = this.bodyImg.texture.textureWidth>>1;
                this.bodyImg.anchorOffsetY = this.bodyImg.texture.textureHeight;
                this.bodyImg.touchEnabled = true;
            }
            else
            {
                //egret.error("人物body图片资源读取失败")
            }
        }
    }

    private buffTipArr:BuffTips[] = [];

    public addBuffTips(text:string,type:number)
    {
        // if(this.buffTipArr.length>0)
        // {
        //     for(var i=0;i<this.buffTipArr.length;i++)
        //     {
        //         this.buffTipArr[i].y = this.buffTipArr[i].y - 50;
        //     }
            
        // }
        var tipData = {
            x:this.x,
            y:this.y - this.bodyImg.height*0.5-40,
            text:text,
            type:type
        }
        if(type == 2)
        {
            tipData.y = this.y - 40;
        }
        var tips = new BuffTips(tipData,this)
        // this.buffTipArr.push(tips);
        if(type == 0||type == 2)
        {
            GlobalManager.Instance.addToLayer(tips,LayerType.scene);
        }
        else if(type == 1)
        {
            GlobalManager.Instance.addToLayer(tips,LayerType.tips);
        }
        
    }

    public removeBuffTips(tips:BuffTips)
    {
        var index = this.buffTipArr.indexOf(tips);
        this.buffTipArr.splice(index,1);
        GlobalManager.Instance.removeObjFromLayer(tips,LayerType.scene);
    }

    public addBuffTipsImage(texture:string)
    {
        var data = {
            x:this.x,
            y:this.y-this.bodyImg.height*0.5,
            img:texture
        }
        var buffTipsImage = new BuffTipsImage(data);
        GlobalManager.Instance.addToLayer(buffTipsImage,LayerType.scene);
    }

    private spBuffArr:any = [ResultDamageBuff,ResultRandomDamageBuff,ResultDefenseBuff,ResultDrawCardBuff]

    public addBuff(data:BuffData,spBuffCardType?:number)
    {
        if(this.immunityBuffName.indexOf(data.name)>=0)
        {
            this.addBuffTips(data.detailName+"免疫",0);
            return;
        }
        this.addBuffTips(data.detailName,0);
        this.addBuffTipsImage(data.img);
        for(var i=0;i<this.haveBuff.length;i++)
        {
            if(data.name!="boom"&&data.name!="roundPowerUp"&&data.name == this.haveBuff[i].name&&data.type<1)
            {
                this.haveBuff[i].roundCount += data.value;
                return;
            }
        }
        if(data.name=="nextPlusEnergy")
        {
            var buff = new NextRPlusEnergyBuff(data,this);
            this.healthC.addChild(buff);
            buff.y = 40
            buff.x = 40+this.haveBuff.length*40;
            this.haveBuff.push(buff); 
        }
        else if(data.type == 0)
        {
            var _buff = new BaseBuff(data,this);
            this.healthC.addChild(_buff);
            _buff.y = 40
            _buff.x = 40+this.haveBuff.length*40;
            this.haveBuff.push(_buff);
        }
        else 
        {
            var index = data.type - 1;
            var className = this.spBuffArr[index];
            
            var buff1 = new className(data,this,spBuffCardType);
            this.healthC.addChild(buff1);
            buff1.y = 40
            buff1.x = 40+this.haveBuff.length*40;
            this.haveBuff.push(buff1);
        }
        
    }

    /**移除buff */
    public removeBuff(buff:BaseBuff)
    {
        var index = this.haveBuff.indexOf(buff);
        this.haveBuff.splice(index,1);
        if(buff&&buff.parent.contains(buff))
        {
            buff.parent.removeChild(buff);
        }
        for(var i=0;i<this.haveBuff.length;i++)
        {
            if(i>=index)
            {
                //buff.y = 40+Math.floor(this.haveBuff.length/4)*40;
                this.haveBuff[i].x = 40+i*40;
                this.haveBuff[i].y = 40;
            }
        }
    }

    public removeAllBuff()
    {
        for(var i=0;i<this.haveBuff.length;i++)
        {
            this.haveBuff[i].removeSelf();
            this.haveBuff.splice(i,1);
            i--;
        }
    }

    /**根据增益类型删除buff，0为增益，1为负面buff，2为其他 */
    public removeBuffByGainType(gainType:number)
    {
        for(var i=0;i<this.haveBuff.length;i++)
        {
            if(this.haveBuff[i].gainType == gainType)
            {
                this.haveBuff[i].removeSelf();
                this.haveBuff.splice(i,1);
                i--;
            }
        }
    }
    /**被选中 */
    public selected()
    {
        //this.filters = [new egret.GlowFilter(0xffffff,0.8,8,8,2,egret.BitmapFilterQuality.LOW,false,false)]
        //添加选框
        if(!this.choseBox)
        {
            this.choseBox = new ChoseBox(this);
            GlobalManager.Instance.addToLayer(this.choseBox,LayerType.effect)
        }

    }

    public canselSelected()
    {
        this.filters = null;
        //移除选框
        if(this.choseBox)
        {
            this.choseBox.parent.removeChild(this.choseBox)
            this.choseBox = null;
        }
        
    }

    public set reserveDefense(value:boolean)
    {
        this._reserveDefense = value;
    }

    public get reserveDefense()
    {
        return this._reserveDefense;
    }

    public set attackValue(value:number)
    {
        this.attack = value;
    }

    public get attackValue()
    {
        return this.attack;
    }

    public set powerUpValue(value:number)
    {
        this._powerUpValue = value;
    }

    public get powerUpValue()
    {
        return this._powerUpValue;
    }

    public get body()
    {
        return this.bodyImg;
    }

    public changeDefense(value:number)
    {
        if(this.certainHasBuff("destroyArmor"))
        {
            value = Math.floor(value*0.75);
        }
        if(value>0)
        {
            this.addBuffTipsImage("defense_img_png")
        }
        this.healthC.curDefense += value;
    }

    /**确定目标身上的Buff */
    public certainHasBuff(name:string)
    {
        for(var i=0;i<this.haveBuff.length;i++)
        {
            if(this.haveBuff[i].name == name)
            {
                return true;
            }
            else 
            {
                return false; 
            }
        }
    }

    public addHealthCompnent()
    {
        var _data = {
            x:0,
            y:60,
            width:this.bodyImg.width+40,
            health:this.health
        }
        this.healthC = new HealthCompnent(_data,this)
        this.addChild(this.healthC);
    }

    public changeCurHealth(value:number)
    {
        this.healthC.curHealth += value;
    }

    public changeMaxHealth(value:number)
    {   
        this.healthC.maxHealth += value;
    }

    public changeState(state:CharacterState)
    {

    }


    public get healthCom()
    {
        return this.healthC;
    }

    public get state()
    {
        return this._state;
    }

    /**type:0玩家，1怪物 */
    public get type()
    {
        return this._type;
    }

    public set damageTimes(value:number)
    {
        this._damageTimes = value;
    }

    public get damageTimes()
    {
        return this._damageTimes;
    }

    public set attackTimes(value:number)
    {
        this._attackTimes = value;
    }

    public get attackTimes()
    {
        return this._attackTimes;
    }

    public damaged(damageData:DamageData)
    {
        if(damageData.damageEffect)
        {
            var _data = {
                x:this.x,
                y:this.y-this.bodyImg.height*0.5,
                type:0,
                img:damageData.damageEffect
            }
            UtilManager.Instance.createVfx(_data);
        }
        var damageValue = Math.floor(damageData.damageValue*this._damageTimes);
        var _damageData = new DamageData();
        _damageData.damageType = damageData.damageType;
        _damageData.damageValue = -damageValue;
        _damageData.damageEffect = damageData.damageEffect;
        this.healthC.changeCurHealth(_damageData);
        if(this.bodyImg.filters == null)
        {
            this.bodyImg.filters = [this.colorFlilter];
        }
        if(this._type == 0)
        {
            if(this.healthC.isCutHp)
            {
                Message.instance.send(MsgCMD.PLAYER_UNDERATTACK);
                this.healthC.isCutHp=false;
            }
            
        }
    }

    public dead()
    {
    }


    public getimmunityBuffName()
    {
        return this.immunityBuffName;
    }


    public getHaveBuff()
    {
        return this.haveBuff;
    }

    protected addEvent()
    {
        // this.addListener(this.bodyImg,mouse.MouseEvent.MOUSE_OVER,this.selected,this);
        // this.addListener(this.bodyImg,mouse.MouseEvent.MOUSE_OUT,this.canselSelected,this);
        //this.addListener(this.bodyImg,egret.TouchEvent.TOUCH_END,this.canselSelected,this);
        this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
        this.addListener(this,egret.TouchEvent.TOUCH_BEGIN,this.addBuffScene,this);
        this.addListener(GameConst.stage,egret.TouchEvent.TOUCH_END,this.removeBuffScene,this);
    }

    public update()
    {
        if(this.bodyImg.filters!=null)
        {
            this.fliterTime++;
            if(this.fliterTime%this.fliterDestroyTime == 0)
            {
                this.bodyImg.filters = null;
                this.fliterTime = 0;
            }
        }
    }

    /**卡牌攻击角色 */
    public cardAttackCaracter()
    {
        var card = GameManager.Instance.curSelectCard;
        if(card)
        {
            card.beginEffect({character:this});
        }
    }
    public get isDead()
    {
        return this._isDead;
    }

    private buffScene:BuffScene = null;
    public addBuffScene(e:egret.TouchEvent)
    {
        // if(Math.abs(e.stageX - this.x)<=this.bodyImg.width*0.5 && Math.abs(e.stageY - (this.y-this.bodyImg.height*0.5))<=this.bodyImg.height*0.5)
        // {
            if(this.haveBuff.length>0)
            {
                this.buffScene = new BuffScene(this);
                this.buffScene.x = this.x-(this.bodyImg.width>>1)-120;
                this.buffScene.y = this.y - (this.bodyImg.height*0.8);
                GlobalManager.Instance.addToLayer(this.buffScene,LayerType.ui)
            }
        // }
    }

    public removeBuffScene()
    {
        if(this.buffScene && this.buffScene.parent)
        {
            if(this.buffScene.parent.contains(this.buffScene))
            this.buffScene.parent.removeChild(this.buffScene)
        }
        else
        {
            ;
        }
    }

    public removeSelf()
    {
        this.removeBuffScene();
        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }
}