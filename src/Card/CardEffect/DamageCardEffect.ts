class DamageCardEffect extends BaseCardEffect
{
    private damageArr:DamageData[] = [];
    

    public constructor(data?:any,card?:Card)
    {
        super(data,card);
        this.name = egret.getQualifiedClassName(DamageCardEffect);
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            // case MsgCMD.CARD_USE:
            // this.useCardEffect();
            // break;
        }
    }

    public initData()
    {
        if(this.data)
        {
            var damageType:string =  this.data.damageType;
            if(damageType!="null")
            {
                var damageTypeArr = damageType.split(',');
            }
            var damageValue:string =  this.data.damageValue;
            if(damageValue!="null")
            {
                var damageValueArr = damageValue.split(',');
            }
            for(var i in damageTypeArr)
            {
                if(damageTypeArr[i]!="null")
                {
                    var _damageData = new DamageData();
                    _damageData.damageType = DamageType[damageTypeArr[i]];
                    _damageData.damageValue = parseInt(damageValueArr[i]);
                    this.damageArr.push(_damageData);
                }
            }
            //this.setCardDetail();
        }
    }

    public changeDamageValue(data?:any)
    {
        // for(var i=0;i<this.damageArr.length;i++)
        // {
        //     this.damageArr[i].damageValue += data.value;
        // }
    }

    public setCardDetail()
    {
        var sigleDamageCount:number = 0;
        var sigleDamage:number = 0;
        var aoeDamageCount:number = 0;
        var aoeDamage:number = 0;
        for(var i=0;i<this.damageArr.length;i++)
        {
            if(this.damageArr[i].damageType == DamageType.single)
            {
                sigleDamageCount ++;
                sigleDamage = this.damageArr[i].damageValue;
            }
            if(this.damageArr[i].damageType == DamageType.aoe)
            {
                aoeDamageCount++;
                aoeDamage = this.damageArr[i].damageValue;
            }
        }
        var player = CharacterManager.Instance.player;
        if(aoeDamageCount>0)
        {
            if(player)
            {
                var damage = Math.floor((aoeDamage+player.powerUpValue)*player.attackTimes)
            }
            else
            {
                var damage = aoeDamage;
            }
            this.cardOwner.addCardDetail("造成"+aoeDamageCount+"次的"+damage+"点群体伤害。");
        }

        if(sigleDamageCount>0)
        {
            if(player)
            {
                var damage = Math.floor((sigleDamage+player.powerUpValue)*player.attackTimes);
            }
            else
            {
                var damage = sigleDamage;
            }
            this.cardOwner.addCardDetail("造成"+sigleDamageCount+"次的"+damage+"点单体伤害。");
        }
    }

    public addEvent()
    {
        this.addMessage(MsgCMD.CARD_USE,this);
    }

    public useCardEffect(character?:BaseCharacter)
    {
        var player = CharacterManager.Instance.player;
        if(this.cardOwner.cardEffecType == 0)
        {
            Message.instance.send(MsgCMD.PLAYER_ATTACK)
        }
        for(var i=0;i<this.damageArr.length;i++)
        {
            switch(this.damageArr[i].damageType)
            {
                case DamageType.single:
                if(character)
                {
                    var damage = new DamageData();
                    damage.damageType = this.damageArr[i].damageType;
                    damage.damageValue = Math.floor((this.damageArr[i].damageValue+CharacterManager.Instance.player.powerUpValue)*player.attackTimes);
                    damage.damageEffect = this.data.damageVfx;
                    character.damaged(damage);
                }
                break;
                case DamageType.aoe:
                var damage = new DamageData();
                damage.damageType = this.damageArr[i].damageType;
                damage.damageValue = Math.floor((this.damageArr[i].damageValue+CharacterManager.Instance.player.powerUpValue)*player.attackTimes);
                var _data = {
                    x:800,
                    y:360,
                    type:0,
                    img:this.data.damageVfx
                }
                UtilManager.Instance.createVfx(_data);
                for(var j=0;j<CharacterManager.Instance.monsterArr.length;j++)
                {
                    CharacterManager.Instance.monsterArr[j].damaged(damage);
                }
                break;
            }
            
        }
        if(!CardManager.Instance.isDoubleEffect)
        this.removeSelf();
        return true;
    }

}