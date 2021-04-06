/**
 * 刘双
 * 红二哈（精英怪）
 * 疼痛戳刺：对玩家造成伤害时往玩家弃牌堆塞一张伤口。
 * N连击：对玩家造成N*6（N*7）点攻击伤害
 * 重击：对玩家造成24点攻击伤害
 */
class AngryMan extends BaseMonster
{
	public constructor(data?:any,isMonsterSet:boolean=false) 
	{
		super(data,isMonsterSet);
		this.name = "AngryMan";
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
            this.health = 120;
        }
        this.data.imgSource = "angry00_png";
        
        this.damageVfx = "zhuazi_png";
        this.monsterLevel = 2;
    }

	public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.randomNextAction();

        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("angry0",6,this.bodyImg,6,false,true)
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
            this.attack = 6;
			this.attackCount = Math.floor(Math.random()*2+2);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        else if(this.monsterAliveRound <= 2)
        {
            var randomNum = Math.random();
            if(randomNum < 0.7)
            {
                this.attack = 6;
                this.attackCount = Math.floor(Math.random()*3+2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            else if(randomNum >= 0.7 && this.monsterAliveRound % 2 == 0)
            {
                this.attack = 28;
				this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
            else
            {
                this.attack = 16;
				this.attackCount = 1;
                this.actionStateArr.push(MonsterActionState.attack);
            }
        }
		else if(this.monsterAliveRound > 2)
		{
			var randomNum = Math.random();
            if(randomNum < 0.7)
            {
                this.attack = 6;
                this.attackCount = Math.floor(Math.random()*3+2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            else if(randomNum >= 0.7 && this.monsterAliveRound % 2 == 0)
            {
                this.actionStateArr.push(MonsterActionState.buffPlus);
            }
            else
            {
                this.attack = 16+Math.floor(Math.random()*6);
				this.attackCount = 1;
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
        }
	}
    
	/**怪物攻击玩家 */
    public attackPlayer()
    {
        var self = this;
        var posX:number = - 20;
        var originX:number = 0;
        egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
            self.damagePlayer();
            var a:number = Math.random();
            if(a >= 0.4)
            {
                self.debuffPlayer();
            }
        }
        ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
            self.Action();
        })

		
    }

	/**给玩家添加debuff */
	public debuffPlayer()
	{
		var self = this;
        
        var buffName = "maimed";
        var _buffData = DataManager.Instance.getBuffDataByName(buffName);
        
        var _data = {
            name:_buffData.name,
            detailName:_buffData.detailName,
            type:_buffData.type,
            detail:_buffData.detail,
            img:_buffData.img,
            value:3,
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
            value:2,
            gainType:0
        }

        egret.Tween.get(this).wait(200).call(function(){
            self.addBuff(_data);
        }).to({},300).call(function(){
            self.Action();
        })
    }
}