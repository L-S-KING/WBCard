/**
 * 第一勇士（boss）
 */
class FirstWarrior extends BaseMonster
{
	private group:egret.DisplayObjectContainer;
    private divsionHealth:number = 0;
    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super(data,isMonsterSet);
        this.name = "FirstWarrior"
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
    }

    public initData()
    {
        super.initData();
        if(this.data.health>0)
        {
            this.health = this.data.health;
        }
        else
        {
            this.health = 400;
        }
        this.data.imgSource = "firstBOSS_png";
        this.damageVfx = "anglerFlower_png";
        this.monsterLevel = 3;
    }
	public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.8},1000).to({scaleY:1},1000);
        this.randomNextAction();
    }
	/**随机下一步动作 */
    public randomNextAction()
    {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if(this.monsterAliveRound==0)
        {
            if(this.healthC.curHealth>this.healthC.maxHealth*0.5)
            {
            this.actionStateArr.push(MonsterActionState.debuff);
            }
            else 
            {
                var a:number=Math.random();
                if(a<0.3)
                {
                    this.actionStateArr.push(MonsterActionState.buffPlus);
                }
                else
                {
                    this.attack = Math.floor(Math.random()*5+6);
                    this.attackCount = Math.floor(Math.random()*3+1);
                    this.actionStateArr.push(MonsterActionState.attack);
                }
            }
        }
        if(this.monsterAliveRound >= 1)
        {
            if(this.healthC.curHealth>this.healthC.maxHealth*0.5)
            {
                var a:number=Math.random();
                if(a<0.15)
                {
                    this.actionStateArr.push(MonsterActionState.debuff);
                }
                else if(a<0.3)
                {
                    this.actionStateArr.push(MonsterActionState.defense);
                }
                else if(a<0.5)
                {
                    this.actionStateArr.push(MonsterActionState.buffPlus);
                }
                else
                {
                    this.attack = Math.floor(Math.random()*5+6);
                    this.attackCount = Math.floor(Math.random()*3+1);
                    this.actionStateArr.push(MonsterActionState.attack);
                }
            }
            else 
            {
                var a:number=Math.random();
                if(a<0.15)
                {
                    this.actionStateArr.push(MonsterActionState.buffPlus);
                }
                else if(a<0.2)
                {
                    this.actionStateArr.push(MonsterActionState.defense);
                }
                else
                {
                    this.attack = Math.floor(Math.random()*5+10);
                    this.attackCount = Math.floor(Math.random()*3+2);
                    this.actionStateArr.push(MonsterActionState.attack);
                }
            }
        }
        // else if(this.monsterAliveRound<=1)
        // {
        //     this.attack = Math.floor(Math.random()*5+6);
        //     this.attackCount = Math.floor(Math.random()*3+1);
        //     this.actionStateArr.push(MonsterActionState.attack);
        // }
        // else if(this.monsterAliveRound<=2)
        // {
        //     this.actionStateArr.push(MonsterActionState.buffPlus);
        // }
        // else if(this.monsterAliveRound<=3)
        // {
        //     this.actionStateArr.push(MonsterActionState.defense);
        // }
        // else
        // {
        //     this.attack = Math.floor(Math.random()*5+10);
        //     this.attackCount = Math.floor(Math.random()*3+1);
        //     this.actionStateArr.push(MonsterActionState.attack);
        // }

        this.actionTips.updateTips();
    }

    /**被动 */
    private isPassive:boolean=false;

	/**怪物行动 */
    public Action()
    {

        var self = this;
        
        if(this.actionIndex>=this.actionStateArr.length)
        {
            egret.Tween.get(this).wait(600).call(function(){
                self.changeState(CharacterState.EndRound);
            })
            return;
        }

        if(this.iscutbuff)
        {
            for(var i:number=0;i<this.haveBuff.length;i++)
            {
                if(this.haveBuff[i].gainType==1)
                {
                    this.removeBuffByGainType(this.haveBuff[i].gainType);
                }
            }

            this.iscutbuff=false;
        }

        if(this.isPassive&&this.actionIndex==0)
        {
            this.addMultipleDefense();
        }

        switch(this.actionStateArr[this.actionIndex])
        {
            case MonsterActionState.attack:
            this.actionIndex++;
            this.attackPlayer();
            break;
            case MonsterActionState.debuff:
            this.actionIndex++;
            this.debuffPlayer();
            break;
            case MonsterActionState.NoCard:
            this.actionIndex++;
            this.setCard();
            break;
			case MonsterActionState.buffPlus:
            this.actionIndex++;
            this.addPowerPlus();
            break;
			case MonsterActionState.defense:
            this.actionIndex++;
            this.defense();
            break;
        }
    }

	public setCard()
    {
        var self = this;
        var posX:number = - 20;
        var originX:number = 0;
        egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
            Message.instance.send(MsgCMD.SET_CARD,{setCardId:8});
        }
        ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
            self.Action();
        })
    }

	/**怪物攻击玩家 */
    public attackPlayer()
    {
        var self = this;
        var posX:number = - 20;
        var originX:number = 0;
        egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
            self.damagePlayer();
        }
        ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
            self.Action();
        })
        
    }
	/**格挡 */
    public defense()
    {

        var self = this;
        var value:number = Math.floor(Math.random()*3+4);
        egret.Tween.get(this).wait(200).call(function(){
            self.addBuffTips("格挡增加",1);
            self.changeDefense(15);
        }).to({},300).call(function(){
            self.Action();
        })
    }
	 /**强化力量 */
    public addPowerPlus()
    {
        var value:number=0;
        if(this.isPassive)
        {
            value=6;
        }
        else
        {
            value=2;
        }
        var self = this;

        var _buffData = DataManager.Instance.getBuffDataByName("powerUp");
        
        var _data = {
            name:_buffData.name,
            detailName:_buffData.detailName,
            type:_buffData.type,
            detail:_buffData.detail,
            img:_buffData.img,
            value:value,
            gainType:0
        }

        egret.Tween.get(this).wait(200).call(function(){
            self.addBuff(_data);
        }).to({},300).call(function(){
            self.Action();
        })
    }

	 /**给玩家debuff */
    public debuffPlayer(a?:string)
    {
        var self = this;
        // var index = Math.floor(Math.random()*this.debuffArr.length);
        var buffName = "maimed"
        var _buffData = DataManager.Instance.getBuffDataByName(buffName);
        
        var _data = {
            name:_buffData.name,
            detailName:_buffData.detailName,
            type:_buffData.type,
            detail:_buffData.detail,
            img:_buffData.img,
            value:2,
            gainType:1
        }

		var buffName1 = "week"
        var _buffData1 = DataManager.Instance.getBuffDataByName(buffName1);
        
        var _data1 = {
            name:_buffData1.name,
            detailName:_buffData1.detailName,
            type:_buffData1.type,
            detail:_buffData1.detail,
            img:_buffData1.img,
            value:2,
            gainType:1
        }

        if(this.actionStateArr.indexOf(MonsterActionState.attack)>=0)
        {
            debuff();
			debuff1();
        }
        else
        {
            var posX:number = - 20;
            var originX:number = 0;
            egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
                debuff();debuff1();
            }
            ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
                self.Action();
            })
        }

        function debuff()
        {
            var player = CharacterManager.Instance.player;
            player.addBuff(_data);
        }
		function debuff1()
		{
			var player = CharacterManager.Instance.player;
			egret.Tween.get(this).wait(800).call(function(){player.addBuff(_data1);});
		}
    }
    private iscutbuff:boolean=false;
    public damaged(damageData:DamageData)
    {
        super.damaged(damageData);
        if(this.healthC.curHealth<=this.healthC.maxHealth*0.5&&!this.isPassive)
        {
            this.actionStateArr=[];
            this.actionStateArr.push(MonsterActionState.buffPlus);
            this.actionStateArr.push(MonsterActionState.defense);
            this.actionTips.updateTips();
            // for(var i:number=0;i<this.haveBuff.length;i++)
            // {
            //     if(this.haveBuff[i].gainType==1)
            //     {
            //         this.removeBuffByGainType(this.haveBuff[i].gainType);
            //     }
            // }
            this.isPassive=true;
            this.iscutbuff=true;
        }
    }

    /**金属化BUFF */
    private addMultipleDefense()
    {
        var value:number=5;
        for(var i:number=0;i<this.haveBuff.length;i++)
        {
            if(this.haveBuff[i].name=="multipleDefense")
            {
                value=1;
                break;
            }
        }
        var buffName = "multipleDefense"
        var _buffData = DataManager.Instance.getBuffDataByName(buffName);

        var _data = {
            name:_buffData.name,
            detailName:_buffData.detailName,
            type:_buffData.type,
            detail:_buffData.detail,
            img:_buffData.img,
            value:value,
            gainType:0
        }
       

        var self=this;
        egret.Tween.get(this).wait(200).call(function(){
            self.addBuff(_data);
        })

    }
}