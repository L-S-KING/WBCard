class HealthCompnent extends BaseModule
{
    private data:any;
    private _maxHealth:number = 0;
    private _curHealth:number = 0;
    private _curDefense:number = 0;          //当前的格挡值
    private owner:BaseCharacter = null;
    private originX:number = 0;
    private originY:number = 0;

    private blood_bar:eui.ProgressBar;
    private blood_label:eui.Label;

    private defense_group:eui.Group;
    private defense_label:eui.Label;
    private defense_img:eui.Image;
    public constructor(data?:any,owner?:BaseCharacter)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        if(owner)
        {
            this.owner = owner;
        }
        this.skinName = "HealthCompnentSkin";
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.addEvent();
    }

    public initData()
    {
        this.defense_group.visible = false;
        this.blood_label = this.blood_bar.getChildByName("blood_lable") as eui.Label;
        // var glowFilter:egret.GlowFilter = new egret.GlowFilter(0xff0000,0.8,8,8,2,egret.BitmapFilterQuality.LOW,false,false)
        // //this.filters = [glowFilter];
        // this.blood_label.filters = [glowFilter];
        this.blood_label.strokeColor = 0xff0000;
        this.blood_label.stroke = 2;
        this.setOriginHealth(this.data.health);
        this.width = this.data.width;
        this.blood_bar.width = this.data.width;
        
        this.x = this.originX = this.data.x;
        this.y = this.originY = this.data.y;
        this.anchorOffsetX = this.blood_bar.width*0.5+this.blood_bar.x;
        this.anchorOffsetY = this.height>>1;
    }

    public set curDefense(value)
    {
        this._curDefense = value;
        this.updateDefenseUi();
    }

    public get curDefense()
    {
        return this._curDefense;
    }

    //更新格挡ui
    public updateDefenseUi()
    {
        if(this._curDefense<=0)
        {
            this.defense_group.visible = false;
        }
        else
        {
            this.defense_group.visible = true;
            this.defense_group.scaleX = this.defense_group.scaleY = 0.8;
            this.defense_label.text = this._curDefense+"";
            egret.Tween.get(this.defense_group).to({scaleX:1,scaleY:1},300,egret.Ease.sineInOut);
        }
       
    }

    public setOriginHealth(value:number)
    {
        if(this.owner.type == 0)
        {
            this._maxHealth = GameManager.Instance.maxHealth;
            this._curHealth = GameManager.Instance.curHealth;
        }
        else
        {
            this._maxHealth = this._curHealth = value;
        }
        this.blood_bar.maximum = this._maxHealth;
    }

    public addEvent()
    {
        this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
    }

    public update()
    {
        this.blood_bar.value = this._curHealth;
    }

    public set curHealth(value:number)
    {
        if(value>this._curHealth)
        {
            this.owner.addBuffTips("治愈",1);
        }
        if(value>=this.maxHealth)
        {
            this._curHealth = this.maxHealth;
        }
        else
        {
            this._curHealth = value;
        }
        if(this._curHealth<=0)
        {
            if(!this.owner.isDead)
            this.owner.dead();
        }
        if(this.owner.type == 0)
        GameManager.Instance.curHealth = this._curHealth;
    }

    public get curHealth()
    {
        return this._curHealth;
    }

    public set maxHealth(value:number)
    {
        var changeValue:number = 0;

        changeValue = value - this._maxHealth;
        this._maxHealth = value;
        this.curHealth += changeValue;
        this.blood_bar.maximum = this._maxHealth;
        this.blood_bar.value = this.curHealth;
        if(this.owner.type == 0)
        GameManager.Instance.maxHealth = this._maxHealth;
    }

    public get maxHealth()
    {
        return this._maxHealth;
    }
    public set isCutHp(isCutHp:boolean)
    {
        this._isCutHp=isCutHp;
    }
    public get isCutHp()
    {
        return this._isCutHp;
    }

    private _isCutHp:boolean=false;

    public changeCurHealth(damageData:DamageData)
    {
        var value = damageData.damageValue;
        if(value<0)
        {
            Message.instance.send(MsgCMD.SHAKE_VIEWPORT,{dis:5,count:Math.floor(Math.random()*3+1)});
        }
        if(this._curDefense>0)
        {
            this.owner.addBuffTips("格挡",2);
            var _data = {
                x:this.owner.x+Math.random()*30-15,
                y:this.owner.y-this.owner.body.height*0.5+Math.random()*30-15,
                type:0,
                img:"10_png"
            }
            UtilManager.Instance.createVfx(_data,0);
            var damageValue = this._curDefense + value;
            this._curDefense += value;
            if(this._curDefense<=0)
            {
                this._curDefense = 0;
            }
            this.updateDefenseUi();
            if(damageValue<0)
            {
                this.curHealth += damageValue;
                var data = {
                    type:0,
                    value:Math.abs(damageValue),
                    x:this.owner.x + Math.floor(Math.random()*60 -30),
                    y:this.owner.y + Math.floor(Math.random()*40 -20)
                };
                TipsManager.Instance.createViewNumber(data);
                this._isCutHp = true;
            }
        }
        else
        {
            this.curHealth += value;
            var data = {
                type:0,
                value:Math.abs(value),
                x:this.owner.x + Math.floor(Math.random()*60 -30),
                y:this.owner.y + Math.floor(Math.random()*40 -20)
            };
            TipsManager.Instance.createViewNumber(data);
            this._isCutHp = true;
        }
    }

    public changeMaxHealth(value:number)
    {
        if(value<0)
        {
            this.maxHealth += value;
            if(this.curHealth>this.maxHealth)
            {
                this.curHealth = this.maxHealth;
            }
        }
        else
        {
            this.maxHealth += value;
        }
    }
}