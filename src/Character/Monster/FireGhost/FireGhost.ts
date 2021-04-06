/**
 * 六火亡魂（boss）
 */
class FireGhost extends BaseMonster
{
	private fireCount:number = 0;							//身上的火团数
	private fireArr:Fire[] = [];							//火团的资源
	private isHit:boolean = false;							//是不是刚打完

	public constructor(data:any) 
	{
		super(data);
		this.name = egret.getQualifiedClassName(FireGhost);
	}

	public initData()
	{
		 super.initData();
		 this.health = 300;
		this.data.imgSource = "fireGhost_body_png";
        this.damageVfx = "fire_vfx_png";
		this.monsterLevel = 3;
	}

	public addEvent()
	{
		super.addEvent();
	}

	public init()
	{
		this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
		var posY:number = 20;
		var originY:number = 0;
        egret.Tween.get(this.bodyImg,{loop:true}).to({y:posY},1000).to({y:originY},1000);
		this.randomNextAction();
	}

	/**随机下一步动作 */
	public randomNextAction()
	{
		this.actionStateArr = [];
        this.actionIndex = 0;
		var roundCount:number = this.monsterAliveRound;
		if(roundCount==0)
		{
			this.actionStateArr.push(MonsterActionState.debuff);
		}
		else if(roundCount==1)
		{
			this.actionStateArr.push(MonsterActionState.defense);
		}
		else if(roundCount==2)
		{
			if(this.fireCount>=6)
			{
				this.attack = Math.floor(Math.random()*10+40);
				this.attackCount = 1;
				this.actionStateArr.push(MonsterActionState.attack);
			}
		}
		else if(roundCount>2)
		{
			if(this.fireCount<6)
			{
				if(!this.isHit)
				{
					this.creatFire(1);
				}
				if(this.fireCount>=6)
				{
				this.attack = Math.floor(Math.random()*10+40);
				this.attackCount = 1;
				this.actionStateArr.push(MonsterActionState.attack);
				this.actionTips.updateTips();
				return;
				}
				this.nextAction();
				this.isHit = false;
			}
		}
		this.actionTips.updateTips();
	}
	
	/**行动 */
	public Action()
	{
		var self = this;
		var roundCount:number = this.monsterAliveRound;
		if(this.actionIndex>=this.actionStateArr.length)
        {
            egret.Tween.get(this).wait(600).call(function(){
				self.changeState(CharacterState.EndRound);
            })
            return;
        }
		if(roundCount==2)
		{
			this.creatFire(6)
		}
		switch(this.actionStateArr[this.actionIndex])
		{
			case MonsterActionState.buffPlus:
			this.actionIndex++;
			this.addPowerPlus();
			break;
			case MonsterActionState.defense:
			this.actionIndex++;
			this.defense();
			break;
			case MonsterActionState.NoCard:
			this.actionIndex++;
			this.setCard();
			break;
			case MonsterActionState.attack:
			this.actionIndex++;
			this.attackPlayer();
			break;
			case MonsterActionState.Sleep:
			this.actionIndex++;
			this.Action();
			break;
			case MonsterActionState.debuff:
			this.actionIndex++;
			this.debuffPlayer();
			break;
		}
	}

	/**生成火团 */
	private creatFire(count)
	{
		var radius = 240;
		for(var i=0;i<count;i++)
		{
			var radiusAngle = this.fireCount*60/180*Math.PI;
			var fire = new Fire();
			this.addChild(fire);
			fire.x = -Math.sin(radiusAngle)*radius;
			fire.y = 64-(this.bodyImg.height*0.5 + Math.cos(radiusAngle)*radius);
			this.fireArr.push(fire);
			this.fireCount ++;
		}
	}

	/**消耗火团 */
	private useFire()
	{
		for(var i=0;i<this.fireArr.length;i++)
		{
			if(this.fireArr[i].parent && this.fireArr[i].parent.contains(this.fireArr[i]))
			{
				egret.Tween.removeTweens(this.fireArr[i]);
				this.fireArr[i].parent.removeChild(this.fireArr[i]);
				this.fireArr.splice(i,1);
				i--;
				this.fireCount--;
			}
		}
	}

	/**添加废卡 */
	public setCard()
    {
        var self = this;
        var posX:number = - 20;
        var originX:number = 0;
        egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
            Message.instance.send(MsgCMD.SET_CARD,{setCardId:8});
        }).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
            self.Action();
        });
    }

	/**攻击 */
	public attackPlayer()
	{
		//消耗火团
		if(this.fireCount>=6)
		{
			this.useFire();
			this.isHit = true;
		}
		var self = this;
        var posX:number = - 20;
        var originX:number = 0;
        egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
            self.damagePlayer();
		}).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
            self.Action();
        });
	}

	/**不处于积满火球，随机下一次状态 */
	private nextAction()
	{
		var random = Math.random();
		if(random<=0.40)
		{
			this.actionStateArr.push(MonsterActionState.defense);
		}
		else if(random<=0.60)
		{
			this.actionStateArr.push(MonsterActionState.NoCard);
		}
		else if(random<=0.80)
		{
			this.actionStateArr.push(MonsterActionState.buffPlus);
		}
		else
		{
			this.attack = Math.floor(Math.random()*6+5);
			this.attackCount = Math.floor(Math.random()*2+2);
			this.actionStateArr.push(MonsterActionState.attack);
		}
	}

	/**格挡 */
    public defense()
    {
        var self = this;
        var value:number = Math.floor(Math.random()*5+20);
        egret.Tween.get(this).wait(200).call(function(){
            self.addBuffTips("格挡增加",1);
            self.changeDefense(value);
        }).to({},300).call(function(){
            self.Action();
        })
    }

	/**强化力量 */
    public addPowerPlus()
    {
        var self = this;
        var _buffData = DataManager.Instance.getBuffDataByName("powerUp");    
        var _data = {
            name:_buffData.name,
            detailName:_buffData.detailName,
            type:_buffData.type,
            detail:_buffData.detail,
            img:_buffData.img,
            value:Math.floor(Math.random()*3+2),
			gainType:_buffData.gainType
        }

        egret.Tween.get(this).wait(200).call(function(){
            self.addBuff(_data);
        }).to({},300).call(function(){
            self.Action();
        })
    }

	/**移除 */
	public removeSelf()
    {
        super.removeSelf();
		this.useFire();
    }
}