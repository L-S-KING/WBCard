/**
 * 刘双
 * 龙拳（精英怪）
 * 状态：这回合你每打出一张牌，龙拳对玩家造成的伤害增加10%。
 * 普通攻击：对玩家造成13点攻击伤害。
 * 重击：对玩家造成伤害更高。
 * debuff：造成一回合虚弱。
 */
class DragonBoxing extends BaseMonster
{
	public constructor(data?:any,isMonsterSet:boolean=false) 
	{
		super(data,isMonsterSet);
		this.name = "DragonBoxing";
	}
	public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
    }
	private _isAdd:boolean = false;		//是否伤害加成

	public initData()
    {
        super.initData();
        if(this.data.health>0)
        {
            this.health = this.data.health;
        }
        else
        {
            this.health = 200;
        }
        this.data.imgSource = "dragonBoxing00_png";
        
        this.damageVfx = "timg_png";
        this.monsterLevel = 2;
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            case MsgCMD.NEXT_MONSTER_ACTION:
            if(data.target == this)
            {
                egret.Tween.get(this).to({},300).call(this.Action);
                
            }
            break;
            case MsgCMD.ENEMY_ROUND_START:
           
            if(!this._reserveDefense)
            {
                this.healthC.curDefense-=this.healthC.curDefense;
            }
            this.monsterAliveRound++;
            break;
            case MsgCMD.ENEMY_ROUND_END:
            
            break;
        }
    }

	public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.randomNextAction();

        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("dragonBoxing0",10,this.bodyImg,6,false,true)
        this.bodyAnim.playAnim();
    }

	/**随机下一步动作 */
    public randomNextAction()
    {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if(this.monsterAliveRound == 0)
        {
            this.actionStateArr.push(MonsterActionState.buffPlus);
        }
        else if(this.monsterAliveRound<=5)
        {
            var randomNum = Math.random();
            if(this._isAdd)
            {
                randomNum = 0.1;
            }
            if(randomNum < 0.5)
            {
                this.attack = Math.floor(Math.random()*6+10);
                this.attackCount = Math.floor(Math.random()*2+2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            if(randomNum >= 0.5 && randomNum < 0.8)
            {
                this.actionStateArr.push(MonsterActionState.debuff);
            }
            if(randomNum >= 0.8)
            {
                this.actionStateArr.push(MonsterActionState.buffPlus);
            }
        }
        else if(this.monsterAliveRound > 5)
        {
            var randomNum = Math.random();
            if(this._isAdd)
            {
                randomNum = 0.1;
            }
            if(randomNum < 0.5)
            {
                this.attack = Math.floor(Math.random()*6+12);
                this.attackCount = Math.floor(Math.random()*2+2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            if(randomNum >= 0.5 && randomNum < 0.7)
            {
                this.actionStateArr.push(MonsterActionState.debuff);
            }
            if(randomNum >= 0.7)
            {
                this.actionStateArr.push(MonsterActionState.buffPlus);
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
            case MonsterActionState.debuff:
            this.actionIndex++;
            this.debuffPlayer();
            break;
        }
	}
	
	// public damaged(damageData:DamageData)
	// {
	// 	super.damaged(damageData);
	// }
    
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
            for(var i=0;i<self.haveBuff.length;i++)
            {
                if(self.haveBuff[i].name == "damageAdd")
                {
                    self.isAdd = false;
                    if(self.certainHasBuff("week"))
                    {
                        self.attackTimes = 0.75;
                    }
                    else
                    {
                        self.attackTimes = 1;
                    }
                    self.addBuffTips(self.haveBuff[i].getData().detailName+"结束",0);
                    self.removeBuff(self.haveBuff[i]);
                    break;
                }
            }
            
            self.Action();
        })
        
    }

	/**给玩家添加debuff */
	public debuffPlayer()
	{
		var self = this;
        
        var buffName = "week";
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

        if(this.actionStateArr.indexOf(MonsterActionState.attack)>=0)
        {
            debuff();
        }
        else
        {
            var posX:number = - 35;
            var originX:number = 0;
            egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
                debuff();
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
	}

    /**强化攻击 */
    public addPowerPlus()
    {
        var self = this;

        var _buffData = DataManager.Instance.getBuffDataByName("damageAdd");
        
        var _data = {
            name:_buffData.name,
            detailName:_buffData.detailName,
            type:_buffData.type,
            detail:_buffData.detail,
            img:_buffData.img,
            value:1,
            gainType:_buffData.gainType
        }

		this._isAdd = true;

        egret.Tween.get(this).wait(200).call(function(){
            self.addBuff(_data);
        }).to({},300).call(function(){
            self.Action();
        })
    }
	public set isAdd(value:boolean)
	{
		this._isAdd = value;
	}
	public get isAdd()
	{
		return this._isAdd;
	}
}