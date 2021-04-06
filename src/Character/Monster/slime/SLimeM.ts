/**中号假萌王 */
class SlimeM extends BaseMonster
{
    private group:egret.DisplayObjectContainer;
    private divsionHealth:number = 0;
    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super(data,isMonsterSet);
        this.name = "Slime"
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
            this.health = 80;
        }
        this.data.imgSource = "Slime1_1_png";
        this.damageVfx = "Slime1_3_png";
        this.monsterLevel = 1;
    }

    public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.8,scaleX:0.8},1000).to({scaleY:1,scaleX:1},1000);
        this.randomNextAction();
        var data = DataManager.Instance.getBuffDataByName("division");
        this.addBuff(data);
        this.monsterAliveRound ++ ;
        if(this.isMonsterSet)
        {
            if(GameManager.Instance.gameState!=GameState.EnemyRoundEnd)
            GameManager.Instance.changeGameStart(GameState.EnemyRoundEnd)
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
        else if(this.monsterAliveRound<=4)
        {
            this.attack = Math.floor(Math.random()*5+6);
            this.attackCount = Math.floor(Math.random()*3+1);
            this.actionStateArr.push(MonsterActionState.attack);
        }
        else
        {
            this.attack = Math.floor(Math.random()*5+10);
            this.attackCount = Math.floor(Math.random()*3+1);
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
            return;
        }
        if(this.healthC.curHealth<=this.healthC.maxHealth*0.5)
        {
            this.division();
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

    public division()
    {
        egret.Tween.get(this).to({alpha:0},1200).call(this.initSmallSlime);
    }

    public initSmallSlime()
    {
        if(this.parent)
        {
            this.group = this.parent;
            this.divsionHealth = this.healthC.curHealth;
        }
        var self = this;
        var posX:number = this.x-0.5*200;
        CharacterManager.Instance.monsterArr.splice(CharacterManager.Instance.monsterArr.indexOf(this),1);
        for(var i=0;i<2;i++)
        {
            var _data = {
                name:null,            //角色的名称
                originX:posX + i*200,         //角色的初始位置
                originY:400,         
                health:this.divsionHealth,          //角色生命值
                imgSource:null,       //角色的图片
            }
            if(i==1)
            {
                var slime = new SlimeS(_data,true);
            }
            else
            {
                var slime = new SlimeS(_data,true);
            }

            this.group.addChild(slime);
            CharacterManager.Instance.pushMonsterToArr(slime);
            if(i==0)
            {
                slime.Action();
            }
        }
        // if(this.isMonsterSet)
        // {
        //     self.changeState(CharacterState.EndRound);
        // }
        this.removeSelf();
    }

    public removeSelf()
    {
        if(this._isDead)
        {
            super.removeSelf();
        }
        else
        {
            if(this&&this.parent.contains(this))
            {
                this.parent.removeChild(this);
            }
        }
    }

    public setCard()
    {
        var self = this;
        var posX:number = - 20;
        var originX:number = 0;
        egret.Tween.get(this.bodyImg).wait(500).to({x:posX},100,egret.Ease.backOut).call(function(){
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
        egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
            self.damagePlayer();
            Message.instance.send(MsgCMD.SET_CARD,{setCardId:8});
        }
        ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
            self.Action();
        })
        
    }
}