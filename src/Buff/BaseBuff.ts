class BaseBuff extends  BaseModule
{
    protected data:BuffData;
    protected _type:number = 0;                     //0为一般属性buff，1为特殊功能buff
    protected buffTarget:BaseCharacter = null;
    protected buffType:number = 0;                  //0：回合减少型buff，1：回合不减少型buff
    protected _roundCount:number = 0;               //回合数或回合不减少型buff的层数
    protected _gainType:number = 0;

    protected buff_img:eui.Image;
    protected round_label:eui.Label;
    protected detail:string;

    protected weekValue:number = -0.2;
    protected maimedValue:number = 0.5;

    public constructor(data?:BuffData,buffTarget?:BaseCharacter)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        if(buffTarget)
        {
            this.buffTarget = buffTarget;
        }
        this.skinName = "BuffUiSkin";
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.setImgIcon();
        this.addEvent();
    }
    public getData()
    {
        return this.data;
    }

    public initData()
    {
        if(this.data)
        {
            this._type = 0;
            this.name = this.data.name;
            this._roundCount = this.data.value;
            this.buffType = this.data.type;
            this.detail = this.data.detail;
            this._gainType = this.data.gainType;
            this.normalEffect();
        }
    }

    public addEvent()
    {
        this.addMessage(MsgCMD.CARD_USE,this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START,this);
        this.addMessage(MsgCMD.PLAYER_ROUND_END,this);
        this.addMessage(MsgCMD.ENEMY_ROUND_START,this);
        this.addMessage(MsgCMD.ENEMY_ROUND_END,this);
    }

    public setImgIcon()
    {
        this.buff_img.source = this.data.img;
        if(this._roundCount >0)
        {
            this.round_label.text = this._roundCount+"";
        }
        else
        {
            this.round_label.visible = false;
        }
    }

    public set gainType(value:number)
    {
        this._gainType = value;
    }

    public get gainType()
    {
        return this._gainType;
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            case MsgCMD.PLAYER_ROUND_START:
            if(this.buffTarget.type == 0)
            {
                this.roundStartEffect();
            }
            break;
            case MsgCMD.PLAYER_ROUND_END:
            if(this.buffTarget.type == 0)
            {
                this.roundEndEffect();
            }
            break;
            case MsgCMD.ENEMY_ROUND_START:
            if(this.buffTarget.type == 1)
            {
                this.roundStartEffect();
            }
            break;
            case MsgCMD.ENEMY_ROUND_END:
            if(this.buffTarget.type == 1)
            {
                this.roundEndEffect();
            }
            break;
        }
    }

    /**普通效果 */
    public normalEffect()
    {
        switch(this.name)
        {
            case "powerUp":
            this.buffTarget.powerUpValue+=this._roundCount;
            if(this.buffTarget.type==0)
            {
                Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE,{setCardDetail:true});
            }
            else
            {
                Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE)
            }
            break;
            case "week":
            var player = CharacterManager.Instance.player;
            if(this.buffTarget.type==0)
            {
                this.buffTarget.attackTimes += this.weekValue;
                Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE,{setCardDetail:true});
            }
            else
            {
                var monster = this.buffTarget as BaseMonster;
                monster.attackTimes += this.weekValue;
                Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE)
            }
            break;
            case "maimed":
            this.buffTarget.damageTimes += this.maimedValue;
            break;
            case "reserveDefense":
            this.buffTarget.reserveDefense = true;
            break;
            case "destroyArmor":
            Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE,{setCardDetail:true});
            break;
        }
    }

    /**回合开始效果 */
    public roundStartEffect()
    {
        switch(this.name)
        {
            case "week":
            this.roundCount--;
            break;
            case "chaos":
            //this.roundCount--;
            break;
            case "poisoning":
            this.buffTarget.addBuffTips(this.data.detailName,1);
            var damage = new DamageData();
            damage.damageValue = 3;
            this.buffTarget.damaged(damage);
            this.roundCount--;     
            break;
            case "maimed":
            this.roundCount--;
            break;
            case "roundPowerUp":
            //this.buffTarget.addBuffTips(this.data.detailName,0);
            var buffData = DataManager.Instance.getBuffDataByName("powerUp");
            var _data = {
                name:buffData.name,
                detailName:buffData.detailName,
                type:buffData.type,
                detail:buffData.detail,
                img:buffData.img,
                value:3,
                gainType:buffData.gainType
            }
            this.buffTarget.addBuff(_data);
            if(this.buffTarget.type==0)
            {
                Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE,{setCardDetail:true});
            }
            else
            {
                Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE)
            }
            break;
            case "division":
            break;
            case "boom":
            this.roundCount--;
            if(this.roundCount<=0)
            {
            var monsterArr = CharacterManager.Instance.monsterArr;
            for(var i=0;i<monsterArr.length;i++)
            {
                var data:DamageData = new DamageData();
                data.damageValue = 100;
                data.damageEffect = "38_png";
                monsterArr[i].damaged(data);	
            }
            }
            break;
            case "thorns":
            this.roundCount--;
            break;
            case "Twining":
            this.roundCount--;
            break;
        }
    }

    /**回合结束效果 */
    public roundEndEffect()
    {
        switch(this.name)
        {
            case "multipleDefense":
            this.buffTarget.addBuffTips(this.data.detailName,0);
            this.buffTarget.changeDefense(this.roundCount);
            this.roundCount--;
            break;
            case "regrowth":
            this.buffTarget.addBuffTips(this.data.detailName,0);
            this.buffTarget.changeCurHealth(this.roundCount);
            this.roundCount--;
            break;
            case "destroyArmor":
            this.roundCount--;
            break;
            case "damageAdd":

            break;
        }
    }

    public updateUi()
    {
        if(this.name == "reserveDefense")
        {
            return;
        }
        this.buff_img.source = this.data.img;
        this.round_label.text = this._roundCount+"";
        if(this.roundCount<=0)
        {
            if(this.name!="chaos")
            {
                this.buffTarget.removeBuff(this);
                this.buffTarget.addBuffTips(this.data.detailName+"结束",0);
            }
        }
    }

    public set roundCount(value:number)
    {
        var temp = value - this._roundCount;
        this._roundCount = value;
        var player = CharacterManager.Instance.player;
        switch(this.name)
        {
            case "powerUp":
            this.buffTarget.powerUpValue += temp;
            if(this.buffTarget.type==0)
            {
                Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE,{setCardDetail:true});
            }
            else
            {
                Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE)
            }
            break;
            case "week":
            if(this.roundCount<=0)
            {
                var player = CharacterManager.Instance.player;
                if(this.buffTarget.type==0)
                {
                    this.buffTarget.attackTimes -= this.weekValue;
                    Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE,{setCardDetail:true});
                }
                else
                {
                    var monster = this.buffTarget as BaseMonster;
                    monster.attackTimes -= this.weekValue;
                    Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE)
                }
            }
            break;
            case "maimed":
            if(this.roundCount<=0)
            {
                this.buffTarget.damageTimes -= this.maimedValue;
            }
            break;
            case "thorns":
            if(this.roundCount<=0)
            {
                var target = this.buffTarget as Guardian;
                target.isAttackStance = true;
            }
            break;
            // case "damageAdd":
            // if(this.roundCount<=0)
            // {
                
                
            // }
            // break;
        }
        this.updateUi();
    }

    public get roundCount()
    {
        return this._roundCount;
    }

    public removeSelf()
    {
        switch(this.name)
        {
            case "powerUp":
            this.buffTarget.powerUpValue = 0;
            if(this.buffTarget.type==0)
            {
                Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE,{setCardDetail:true});
            }
            else
            {
                Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE)
            }
            break;
            case "week":
            var player = CharacterManager.Instance.player;
            if(this.buffTarget.type==0)
            {
                this.buffTarget.attackTimes -= this.weekValue;
                Message.instance.send(MsgCMD.PLAYER_POWER_CHANGE,{setCardDetail:true});
            }
            else
            {
                var monster = this.buffTarget as BaseMonster;
                monster.attackTimes -= this.weekValue;
                Message.instance.send(MsgCMD.ENEMY_POWER_CHANGE)
            }
            break;
            case "maimed":
            this.buffTarget.damageTimes -=this.maimedValue;
            break;
            case "reserveDefense":
            this.buffTarget.reserveDefense = false;
            break;
        }
        if(this&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
        }
    }

    public getDetail()
    {
        if(this.detail)
        return this.detail;
    }

    public getDetailName()
    {
        if(this.data.detailName)
        return this.data.detailName;
    }
}