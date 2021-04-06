/**
 * 刘双
 * 守护者（boss）
 * 开始为攻击姿态，受到一定伤害后转为防御姿态。防御姿态下会给自己添加buff：你每用一张攻击牌受到3伤害。防御姿态持续2回合后转为攻击姿态。
 * 攻击姿态可能行动：伤害很高的攻击。提升格挡值并强化自己。
 */
class Guardian extends BaseMonster
{
	public constructor(data?:any,isMonsterSet:boolean=false) 
	{
		super(data,isMonsterSet);
		this.name = "Guardian";
	}

	private isThrons:boolean = false;   //是否存在荆棘buff
    private addThrons:boolean = false;  //是否添加荆棘buff
    private bloodLoss:number = 40;  //掉血量
    private divsionHealth:number = 0;

    private _isAttackStance:boolean = true;              //boss是否处于攻击姿态

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
            this.health = 250;
        }
        this.data.imgSource = "guardian_png";
        
        this.damageVfx = "Slime2_3_png";
        this.monsterLevel = 3;
    }

	public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.9},1000).to({scaleY:1},1000);
        this.changeDefense(20);
        this.randomNextAction();
        
    }

    public set isAttackStance(value:boolean)
    {
        this._isAttackStance = value;
    }

    public get isAttackStance()
    {
        return this._isAttackStance;
    }


	/**随机下一步动作 */
    public randomNextAction()
    {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if(this.monsterAliveRound == 0)
        {
            this.actionStateArr.push(MonsterActionState.debuff);
        }
        else if(this.monsterAliveRound<=6)
        {
            var randomNum = Math.random();
            if(randomNum < 0.5)
            {
                this.attack = Math.floor(Math.random()*5+6);
                this.attackCount = Math.floor(Math.random()*2+2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            if(randomNum >= 0.5)
            {
                this.actionStateArr.push(MonsterActionState.defense);
            }
        }
        else
        {
            var randomNum = Math.random();
            if(randomNum > 0.8)
            {
                this.actionStateArr.push(MonsterActionState.buffPlus);
            }
            else
            {
                this.attack = Math.floor(Math.random()*9+10);
                this.attackCount = Math.floor(Math.random()*3+2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }

        this.actionTips.updateTips();
    }

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
        if(this.isAttackStance)
        {
            this.switchForm();
            this.isThrons = false;
        }
		if(this.addThrons == true)
		{
			var _data = DataManager.Instance.getBuffDataByName("thorns");
			_data.value = 4;
			this.addBuff(_data);
            this.addThrons = false;
			this.isThrons = true;
		}
        switch(this.actionStateArr[this.actionIndex])
        {
            case MonsterActionState.attack:
            this.actionIndex++;
            this.attackPlayer();
            break;
			case MonsterActionState.buffPlus:
			this.actionIndex++;
			this.addPowerPlus();
			break;
			case MonsterActionState.defense:
			this.actionIndex++;
			this.defense();
			break;
            case MonsterActionState.debuff:
            this.actionIndex++;
            this.debuffPlayer();
            break;
        }
	}

    private a:number = 0;
	
	public damaged(damageData:DamageData)
	{
		super.damaged(damageData);
		if(this.isAttackStance)
		{
			this.bloodLoss -= damageData.damageValue;
			if(this.bloodLoss <= 0)
			{
                this.a += 1;
                if(this.a == 1)
                {
                    this.bloodLoss = 60;
                }
                if(this.a >= 2)
                {
                    this.bloodLoss = 80;
                }
				this.isAttackStance = false;
                this.addThrons = true;
                this.switchForm();
				this.actionStateArr = [];
				this.actionStateArr.push(MonsterActionState.defense);
				this.actionTips.updateTips();
			}
		}
		if(this.isThrons == true)
		{
			var player = CharacterManager.Instance.player;
            if(GameManager.Instance.curSelectCard!=null)
            {
                if(GameManager.Instance.curSelectCard.cardEffecType==0)
                {
					var data = new DamageData()
					data.damageValue = 5;
					player.damaged(data)
                }
            }
		}
	}
    

    /**boss状态图片切换 */
    public switchForm()
    {
        if(!this.isAttackStance)
        {   
            this.bodyImg.texture = null;
            this.bodyImg.texture = RES.getRes("guardianDefense_png")
        }
        else
        {
            this.bodyImg.texture = null;
            this.bodyImg.texture = RES.getRes("guardian_png")
        }
    }
	/**怪物攻击玩家 */
    public attackPlayer()
    {
        var self = this;
        var posX:number = - 20;
        var originX:number = 0;
        egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
            var player = CharacterManager.Instance.player;
            for(var i=0;i<self.attackCount;i++)
            {
                var damage = new DamageData();
                damage.damageValue = self.attack;
                damage.damageEffect = self.damageVfx;
                player.damaged(damage);
            }
        }
        ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
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
            value:Math.floor(Math.random()*3+3),
            gainType:_buffData.gainType
        }

        egret.Tween.get(this).wait(200).call(function(){
            self.addBuff(_data);
        }).to({},300).call(function(){
            self.Action();
        })
    }

    /**格挡 */
    public defense()
    {
        var self = this;
        var value:number = Math.floor(Math.random()*6+15);
        egret.Tween.get(this).wait(200).call(function(){
            self.addBuffTips("格挡增加",1);
            self.changeDefense(value);
        }).to({},300).call(function(){
            self.Action();
        })
    }
}