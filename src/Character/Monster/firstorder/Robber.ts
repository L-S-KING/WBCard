/**抢劫犯 */
class Robber extends BaseMonster
{
	private group:egret.DisplayObjectContainer;
    private divsionHealth:number = 0;
    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super(data,isMonsterSet);
        this.name = "Robber";
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
			this.health = Math.floor(Math.random()*5)+45;
        }
        this.data.imgSource = "robber_0_png";
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
		this.bodyAnim.initData("robber_",6,this.bodyImg,10,false,true);
		this.bodyAnim.playAnim();
    }
	/**随机下一步动作 */
    public randomNextAction()
    {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if(this.monsterAliveRound>=0&&this.monsterAliveRound<=5)
        {
			var a:number=Math.random();
			if(a>0.4)
			{
				this.actionStateArr.push(MonsterActionState.defense);
			}
			else
			{
				this.attack = 10;
				this.attackCount = 1;
				this.actionStateArr.push(MonsterActionState.attack);
			}
        }
		if(this.monsterAliveRound>=6)
		{
			this.actionStateArr.push(MonsterActionState.Escape);
		}
        this.actionTips.updateTips();
    }

	private isEscape:boolean=false;
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
		// if(this.isEscape)
		// {
		// 	
		// }

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
			case MonsterActionState.Escape:
            this.actionIndex++;
            this.escape();
            break;
        }
    }
	 /**逃跑 */
    public escape()
    {
		// this.scaleX=-1;
		var self = this;
        var mArr = CharacterManager.Instance.monsterArr;
        for(var i=0;i<mArr.length;i++)
        {
            if(mArr[i].name=="Robber")
            {
                mArr[i].scaleX=-1
                egret.Tween.get(mArr[i]).to({x:1300},1000,egret.Ease.cubicIn).call(function(){this.isEscape=true;
                CharacterManager.Instance.removeMonster(this);self.Action();})
            };
        }
		
    }

    private money:number=0;
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
            self.addBuffTips("偷钱",1)
            self.Action();
        })
		/**偷玩家钱 */
        if( GameManager.Instance.curCoin>=15)
        {
            GameManager.Instance.curCoin-=15;
            this.money+=15;
        }
        else
        {
            this.money+=GameManager.Instance.curCoin;
            GameManager.Instance.curCoin-=GameManager.Instance.curCoin;
           
        }
    }

    //死亡后还钱
    public dead()                 
    {
        GameManager.Instance.curCoin+=this.money;
        super.dead();
        
    }
	/**格挡 */
    public defense()
    {
        var self = this;
        var value:number = Math.floor(Math.random()*7+6);
        egret.Tween.get(this).wait(200).call(function(){
            self.addBuffTips("格挡增加",1);
            self.changeDefense(value);
        }).to({},300).call(function(){
            self.Action();
        })
    }
}