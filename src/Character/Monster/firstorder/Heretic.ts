/**
 * 邪教徒
 */
class Heretic extends BaseMonster
{
	private group:egret.DisplayObjectContainer;
    private divsionHealth:number = 0;
    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super(data,isMonsterSet);
        this.name = "Heretic"
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
			this.health = Math.floor(Math.random()*5)+48;
        }
        this.data.imgSource = "heretic_0_png";
        this.damageVfx = "timg_png";
        this.monsterLevel = 1;
    }
	public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.95,scaleX:0.95},1000).to({scaleY:1,scaleX:1},1000);
        this.randomNextAction();

        this.bodyAnim = new ImgAnim();
		this.bodyAnim.initData("heretic_",6,this.bodyImg,10,false,true);
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
			this.actionStateArr.push(MonsterActionState.buffPlus);
        }
        if(this.monsterAliveRound == 1)
        {
			this.attack = 6;
			this.attackCount = 1;
			this.actionStateArr.push(MonsterActionState.attack);
        }
		if(this.monsterAliveRound == 2)
		{
			this.attack = 6;
			this.attackCount = 1;
			this.actionStateArr.push(MonsterActionState.attack);
		}
		if(this.monsterAliveRound >= 3)
		{
			if(this.monsterAliveRound%3==0)
			{
				this.actionStateArr.push(MonsterActionState.buffPlus);
			}
			else
			{
                this.attack = 6;
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
            value:3,
            gainType:0
        }

        egret.Tween.get(this).wait(200).call(function(){
            self.addBuff(_data);
        }).to({},300).call(function(){
            self.Action();
        })
    }
}