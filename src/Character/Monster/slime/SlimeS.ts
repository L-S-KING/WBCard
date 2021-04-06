/**巨小假萌王 */
class SlimeS extends BaseMonster
{
    private group:egret.DisplayObjectContainer;
    private divsionHealth:number = 0;
    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super(data,isMonsterSet);
        this.name = "SlimeS";
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
            this.health = 35;
        }
        this.data.imgSource = "Slime0_1_png";
        this.damageVfx = "Slime0_3_png";
        this.monsterLevel = 1;
    }

    public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.8,scaleX:0.8},1000).to({scaleY:1,scaleX:1},1000);
        this.randomNextAction();
        
        if(this.isMonsterSet)
        {

        }
    }

    /**随机下一步动作 */
    public randomNextAction()
    {
        this.actionStateArr = [];
        this.actionIndex = 0;
        var roundCount = GameManager.Instance.roundCount;
        if(this.monsterAliveRound == 0)
        {
            this.actionStateArr.push(MonsterActionState.NoCard);
        }
        else if(this.monsterAliveRound<=5)
        {
            this.attack = Math.floor(Math.random()*5+6);
            this.attackCount = Math.floor(Math.random()*2+1);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        else
        {
            this.attack = Math.floor(Math.random()*5+10);
            this.attackCount = Math.floor(Math.random()*2+1);
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
        if(this.isMonsterSet&&this.monsterAliveRound == 0)
        {
            var index = CharacterManager.Instance.monsterArr.indexOf(this);
            var teIndex =CharacterManager.Instance.monsterArr.length-1 
            if(index == teIndex)
            {
                GameManager.Instance.changeGameStart(GameState.EnemyRoundEnd);
            }
            else
            {
                this.nextMonsterCanAciton();
            }
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
        }
    }

    public removeSelf()
    {
        super.removeSelf();
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
        this.addBuffTips("攻击！",0)
        var self = this;
        var posX:number = - 35;
        var originX:number = 0;
        egret.Tween.get(this.bodyImg).wait(500).to({x:posX},100,egret.Ease.backOut).call(function(){
            self.damagePlayer();
            Message.instance.send(MsgCMD.SET_CARD,{setCardId:8});
        }
        ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
            self.Action();
        })
        
    }
}