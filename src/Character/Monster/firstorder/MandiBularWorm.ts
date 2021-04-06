/**大颚虫 */
class MandiBularWorm extends BaseMonster
{
	private group:egret.DisplayObjectContainer;
    private divsionHealth:number = 0;
    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super(data,isMonsterSet);
        this.name = "MandiBularWorm";
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
			this.health = Math.floor(Math.random()*5)+40;
        }
        this.data.imgSource = "mandibularworm_0_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    }
	public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        // egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.8,scaleX:0.8},1000).to({scaleY:1,scaleX:1},1000);
        this.randomNextAction();

        this.bodyAnim = new ImgAnim();
		this.bodyAnim.initData("mandibularworm_",6,this.bodyImg,10,false,true);
		this.bodyAnim.playAnim();
    }
	/**随机下一步动作 */
    public randomNextAction()
    {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
		if(this.monsterAliveRound==0)
		{
			this.skill=0;
			this.attack = 11;
			this.attackCount = 1;
			this.actionStateArr.push(MonsterActionState.attack);
		}
		if(this.monsterAliveRound==1)
		{
			this.skill=1;
			this.attack = 7;
			this.attackCount = 1;
			this.actionStateArr.push(MonsterActionState.attack);
		}
		if(this.monsterAliveRound==2)
		{
			this.actionStateArr.push(MonsterActionState.buffPlus);
		}
		if(this.monsterAliveRound>=3)
		{
			if(this.monsterAliveRound%3==0)
			{
				this.skill=0;
				this.attack = 11;
				this.attackCount = 1;
				this.actionStateArr.push(MonsterActionState.attack);
			}
			if(this.monsterAliveRound%3==1)
			{
				this.skill=1;
				this.attack = 7;
				this.attackCount = 1;
				this.actionStateArr.push(MonsterActionState.attack);
			}
			if(this.monsterAliveRound%3==2)
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
            case MonsterActionState.debuff:
            this.actionIndex++;
            this.debuffPlayer();
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
	private skill:number=0;

	/**怪物攻击玩家 */
    public attackPlayer()
    {
        var self = this;
        var posX:number = - 20;
        var originX:number = 0;
		if(this.skill==0)
		{
			egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
            self.damagePlayer();
			})
			.to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
				self.Action();
			})
		}
		if(this.skill==1)
		{
			egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
            self.damagePlayer();
			})
			.to({},0,egret.Ease.sineOut).wait(0).call(function(){
				self.addBuffTips("格挡增加",1);
            	self.changeDefense(6);
			})
			.to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
				self.Action();
			})
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
            value:Math.floor(Math.random()+3),
            gainType:_buffData.gainType
        }

        egret.Tween.get(this).wait(200).call(function(){
            self.addBuff(_data);
        })
		.to({},0,egret.Ease.sineOut).wait(0).call(function(){
			self.addBuffTips("格挡增加",1);
			self.changeDefense(6);
			}).to({},300).call(function(){
            self.Action();
        })
    }
}