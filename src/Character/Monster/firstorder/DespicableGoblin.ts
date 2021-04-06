/**卑鄙精灵 */
class DespicableGoblin extends BaseMonster
{
	private group:egret.DisplayObjectContainer;
    private divsionHealth:number = 0;
    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super(data,isMonsterSet);
        this.name = "DespicableGoblin";
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
			this.health = Math.floor(Math.random()*5)+11;
        }
        this.data.imgSource = "despicablegoblin_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    }
	public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.8},1000).to({scaleY:1},1000);
        this.randomNextAction();
    }
	private dam:number=0;
	/**随机下一步动作 */
    public randomNextAction()
    {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
		if(this.monsterAliveRound>=0)
		{
			this.attack = Math.floor(Math.random()*2)+9;
			this.attackCount = 1;
			this.dam=this.attack
			this.actionStateArr.push(MonsterActionState.attack);
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