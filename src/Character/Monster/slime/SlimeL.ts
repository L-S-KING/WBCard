/**老吊假萌王(boss) */
class SlimeL extends BaseMonster
{
    private group:egret.DisplayObjectContainer;
    private divsionHealth:number = 0;
    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super(data,isMonsterSet);
        this.name = "SlimeL"
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
            this.health = 350;
        }
        this.data.imgSource = "Slime2_1_png";
        this.damageVfx = "Slime2_3_png";
        this.monsterLevel = 3;
    }

    public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.8,scaleX:0.8},1000).to({scaleY:1,scaleX:1},1000);
        this.randomNextAction();
        var data = DataManager.Instance.getBuffDataByName("division");
        this.addBuff(data);
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
        this.monsterAliveRound++;
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
        this.group = this.parent;
        this.divsionHealth = this.healthC.curHealth;
        var self = this;
        var posX:number = this.x-200;
        for(var i=0;i<2;i++)
        {
            var _data = {
                name:null,            //角色的名称
                originX:posX + i*400,         //角色的初始位置
                originY:400,         
                health:this.divsionHealth,          //角色生命值
                imgSource:null,       //角色的图片
            }
            if(i==1)
            {
                var slime = new SlimeM(_data,true);
            }
            else
            {
                var slime = new SlimeM(_data,true);
            }
            this.group.addChild(slime);
            CharacterManager.Instance.pushMonsterToArr(slime);
        }
        this.removeSelf();
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