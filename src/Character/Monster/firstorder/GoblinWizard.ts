/**地精法师 */
class GoblinWizard extends BaseMonster
{
	private group:egret.DisplayObjectContainer;
    private divsionHealth:number = 0;
    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super(data,isMonsterSet);
        this.name = "GoblinWizard";
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
			this.health = Math.floor(Math.random()*4)+22;
        }
        this.data.imgSource = "wa0_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    }
	public init()
    {
        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("wa",39,this.bodyImg,4,false,true);
        this.bodyAnim.playAnim();
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
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
			this.actionStateArr.push(MonsterActionState.StoringForce);
		}
		if(this.monsterAliveRound==1)
		{
			this.actionStateArr.push(MonsterActionState.StoringForce);
		}
		if(this.monsterAliveRound==2)
		{
			this.attack = Math.floor(Math.random()*2)+30;
			this.attackCount = 1;
			this.actionStateArr.push(MonsterActionState.attack);
		}
		if(this.monsterAliveRound>=3)
		{
			if(this.monsterAliveRound%3==0)
			{
				this.actionStateArr.push(MonsterActionState.StoringForce);
			}
			if(this.monsterAliveRound%3==1)
			{
				this.actionStateArr.push(MonsterActionState.StoringForce);
			}
			if(this.monsterAliveRound%3==2)
			{
				this.attack = Math.floor(Math.random()*2)+40;
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
			case MonsterActionState.StoringForce:
			this.actionIndex++;
            this.storingForce();
            break;
        }
    }
	private skill:number=0;

	public storingForce()
	{
		var self = this;
        var posX:number = - 20;
        var originX:number = 0;
		this.addBuffTips("蓄力",0);
		egret.Tween.get(this.bodyImg).wait(1000).call(function(){
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
		})
		.to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
			self.Action();
		})
		
    }
}