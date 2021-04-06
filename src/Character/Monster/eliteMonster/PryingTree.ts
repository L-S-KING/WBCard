/**
 * 刘双
 * 扎人的树（精英怪）
 * 疼痛戳刺：对玩家造成伤害时往玩家弃牌堆塞一张伤口。
 * N连击：对玩家造成N*6（N*7）点攻击伤害
 * 重击：对玩家造成24点攻击伤害
 */
class PryingTree extends BaseMonster
{
	public constructor(data?:any,isMonsterSet:boolean=false) 
	{
		super(data,isMonsterSet);
		this.name = "PryingTree";
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
            this.health = 180;
        }
        this.data.imgSource = "hurtMan00_png";
        
        this.damageVfx = "tree_vfx_png";
        this.monsterLevel = 2;
    }

	public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.randomNextAction();

        this.bodyAnim = new ImgAnim();
        this.bodyAnim.initData("hurtMan0",6,this.bodyImg,6,false,true)
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
			this.attackCount = Math.floor(Math.random()*5+2);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        else
        {
            var randomNum = Math.random();
            if(randomNum < 0.7)
            {
                this.attack = 6;
                this.attackCount = Math.floor(Math.random()*3+2);
                this.actionStateArr.push(MonsterActionState.attack);
            }
            if(randomNum >= 0.7)
            {
                this.attack = 24;
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
            case MonsterActionState.debuff:
            this.actionIndex++;
            this.debuffPlayer();
            break;
        }
	}
	
	public damaged(damageData:DamageData)
	{
		super.damaged(damageData);
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
            if(a < 0.5)
            {
                self.setCard();
            }
        }
        ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
            self.Action();
        })
        
    }

	public setCard()
    {
        // var self = this;
        // var posX:number = - 20;
        // var originX:number = 0;
        // egret.Tween.get(this.bodyImg).wait(300).to({x:posX},100,egret.Ease.backOut).call(function(){
        Message.instance.send(MsgCMD.SET_CARD,{setCardId:8});
        // }
        // ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
        //     self.Action();
        // })
    }
}