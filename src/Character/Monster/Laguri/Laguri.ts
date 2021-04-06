/**
 * 拉古瑞（精英）
 */
class Laguri extends BaseMonster
{

    public constructor(data?:any)
    {
        super();
        if(data)
        {
            this.data = data;
        }
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
            this.health = 200;
        }
        this.data.imgSource = "Laguri_sleep_png";
        this.damageVfx = "Laguri_vfx_png";
        this.monsterLevel = 2;
    }

    public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.addSleep();
        this.changeDefense(15);
        var data = DataManager.Instance.getBuffDataByName("multipleDefense");
        var _data = {
            name:data.name,
            detailName:data.detailName,
            type:data.type,
            detail:data.detail,
            img:data.img,
            value:10,
            gainType:data.gainType
        }
        this.addBuff(_data);
        var data1 = DataManager.Instance.getBuffDataByName("reserveDefense");
        this.addBuff(data1);
        egret.Tween.get(this.bodyImg,{loop:true}).to({scaleY:0.95},400).to({scaleY:1},400)
    }

    /**随机下一步动作 */
    public randomNextAction()
    {
        this.actionStateArr = [];
        this.actionIndex = 0;

        this.actionStateArr.push(MonsterActionState.attack);
        this.attack = Math.floor(Math.random()*7+8);
        this.attackCount = Math.floor(Math.random()*2+2)

        this.actionTips.updateTips();
    }

    /**添加眩晕效果 */
    public addDizziness()
    {
        var self = this;
        egret.Tween.get(this.bodyImg).to({skewX:-25,scaleY:1.3},300).call(function(){
            self.bodyImg.texture = RES.getRes("Laguri_normal_png");
            self.bodyImg.anchorOffsetX = self.bodyImg.width>>1;
            self.bodyImg.anchorOffsetY = self.bodyImg.height;
            self.bodyImg.skewX = 0;
            self.bodyImg.scaleY = 0;
            self.actionTips.changePos();
            self.removeAllBuff();
        })
        super.addDizziness();
    }

    public changeNormal()
    {
        var self = this;
        egret.Tween.get(this.bodyImg).to({skewX:-25,scaleY:1.3},300).call(function(){
            self.bodyImg.texture = RES.getRes("Laguri_normal_png");
            self.bodyImg.anchorOffsetX = self.bodyImg.width>>1;
            self.bodyImg.anchorOffsetY = self.bodyImg.height;
            self.bodyImg.skewX = 0;
            self.bodyImg.scaleY = 0;
            self.actionTips.changePos();
            self.removeAllBuff();
            self.Action();
        })
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
        if(this.monsterAliveRound == 11)
        {
            this.actionIndex++;
            this.changeNormal();
            return;
        }
        switch(this.actionStateArr[this.actionIndex])
        {
            case MonsterActionState.attack:
            this.actionIndex++;
            this.addBuffTips("攻击！",0)
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
            case MonsterActionState.Dizziness:
            this.actionIndex++;
            this.actionDizziness();
            break;
            case MonsterActionState.Sleep:
            this.actionSleep();
            break;
        }
    }
}