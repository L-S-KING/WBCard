enum MonsterActionState
{
    buffPlus,           //增益buff
    defense,            //防守
    attack,             //攻击
    debuff,             //给玩家debuff
    Dizziness,          //眩晕
    Sleep,              //睡眠
    division,           //分裂
    Summoning,          //召唤
    BackWound,          //反伤
    Pilfering,          //偷窃
    NoCard,             //添加额外废牌
    Escape,             //逃跑
    StoringForce,       //蓄力,
    Cure
}
class BaseMonster extends BaseCharacter
{
    protected attackCount:number = 3;                                       //攻击次数
    protected canAction:boolean = false;                                    //会否可以行动
    protected debuffArr:string[] = ["week","maimed","poisoning"]
    protected actionStateArr:MonsterActionState[] = [];                     //行动数组
    protected actionIndex:number = 0;                                       //行动索引
    protected monsterLevel:number = 0;                                      //怪物等级，1普通怪，2精英怪，3boss怪
    protected actionTips:MonsterActionTip = null;
    protected damageVfx:string = null                                       //伤害特效
    protected monsterAliveRound:number = 0;                                 //怪物存活回合数
    protected isMonsterSet:boolean = false;                                 //是否是怪物生成
    protected bodyAnim:ImgAnim

    public constructor(data?:any,isMonsterSet:boolean=false)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        this.isMonsterSet = isMonsterSet;
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.init();
        this.alpha = 0;
        egret.Tween.get(this).to({alpha:1},500);
    }

    public initData()
    {
        this.touchEnabled = true;
        this.touchChildren = true;
        this._type = 1;
        this.originX = this.data.originX;
        this.originY = this.data.originY;
        this.touchEnabled = true;

        this.x = this.originX;
        this.y = this.originY;
        this._state = CharacterState.WaitRound;
    }

    public init()
    {
        this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
        this.randomNextAction();
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            case MsgCMD.NEXT_MONSTER_ACTION:
            if(data.target == this)
            {
                egret.Tween.get(this).to({},300).call(this.Action);
                
            }
            break;
            case MsgCMD.ENEMY_ROUND_START:
            if(!this._reserveDefense)
            {
                this.healthC.curDefense-=this.healthC.curDefense;
            }
            this.monsterAliveRound++;
            break;
            case MsgCMD.ENEMY_ROUND_END:
            
            break;
        }
    }

    public addEvent()
    {
        super.addEvent();
        this.addMessage(MsgCMD.NEXT_MONSTER_ACTION,this);
        this.addMessage(MsgCMD.ENEMY_ROUND_START,this);
        this.addMessage(MsgCMD.ENEMY_ROUND_END,this);
        //this.addListener(this,egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
        this.addListener(this,egret.TouchEvent.TOUCH_BEGIN,this.changeActionTipTextVisible,this);
    }

    public changeActionTipTextVisible()
    {
        this.actionTips.textVisible(true);
    }
    public get actionArr()
    {
        return this.actionStateArr;
    }

    /**随机下一步动作 */
    public randomNextAction()
    {
        this.actionStateArr = [];
        this.actionIndex = 0;

        if(this.monsterLevel <1)
        {
            var index = Math.floor(Math.random()*4);
            this.actionStateArr.push(index);
        }
        else
        {

        }

        this.actionTips.updateTips();
    }

    /**更新显示动作 */
    public updateActionView()
    {
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
            case MonsterActionState.Dizziness:
            this.actionIndex++;
            this.actionDizziness();
            break;
            case MonsterActionState.Sleep:
            this.actionSleep();
            break;
        }
    }

    /**添加眩晕效果 */
    public addDizziness()
    {
        this.actionStateArr = [MonsterActionState.Dizziness];
        this.updateActionView();
    }

    /**眩晕动作 */
    public actionDizziness()
    {
        this.addBuffTips("眩晕！",0);
        egret.Tween.get(this).to({},600).call(this.Action);
    }

    /**添加睡眠效果 */
    public addSleep()
    {
        this.actionStateArr = [MonsterActionState.Sleep];
        this.updateActionView();
    }

    /**睡眠动作 */
    public actionSleep()
    {
        this.addBuffTips("睡眠！",0);
        egret.Tween.get(this).to({},600).call(this.nextMonsterCanAciton);
    }

    /**分裂 */
    public division()
    {

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
        }
        ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
            self.Action();
        })
        
        //Message.instance.send(MsgCMD.SET_CARD);
    }

    /**给予玩家伤害 */
    public damagePlayer()
    {
        var self = this;
        var player = CharacterManager.Instance.player;
        for(var i=0;i<self.attackCount;i++)
        {
            var damage = new DamageData();
            damage.damageValue = Math.floor(self.attack*self.attackTimes)+this._powerUpValue;
            damage.damageEffect = self.damageVfx;
            player.damaged(damage);
        }
    }


    /**给玩家debuff */
    public debuffPlayer()
    {
        var self = this;
        var index = Math.floor(Math.random()*this.debuffArr.length);
        var buffName = this.debuffArr[index];
        var _buffData = DataManager.Instance.getBuffDataByName(buffName);
        
        var _data = {
            name:_buffData.name,
            detailName:_buffData.detailName,
            type:_buffData.type,
            detail:_buffData.detail,
            img:_buffData.img,
            value:Math.floor(Math.random()*2+2),
            gainType:_buffData.gainType
        }

        if(this.actionStateArr.indexOf(MonsterActionState.attack)>=0)
        {
            debuff();
        }
        else
        {
            var posX:number = - 35;
            var originX:number = 0;
            egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).call(function(){
                debuff();
            }
            ).to({x:originX},100,egret.Ease.sineOut).wait(1000).call(function(){
                self.Action();
            })
        }

        function debuff()
        {
            var player = CharacterManager.Instance.player;
            player.addBuff(_data);
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
            value:Math.floor(Math.random()*3+1),
            gainType:_buffData.gainType
        }

        egret.Tween.get(this).wait(200).call(function(){
            self.addBuff(_data);
        }).to({},300).call(function(){
            self.Action();
        })
    }

    /**格挡 */
    public defense()
    {
        var self = this;
        var value:number = Math.floor(Math.random()*3+4);
        egret.Tween.get(this).wait(200).call(function(){
            self.addBuffTips("格挡增加",1);
            self.changeDefense(value);
        }).to({},300).call(function(){
            self.Action();
        })
    }

    public set attackTimes(value:number)
    {
        this._attackTimes = value;
        this.updateActionView();
    }

    public get attackTimes()
    {
        return this._attackTimes;
    }

    public set attackCounts(value:number)
    {
        this.attackCount = value;
    }

    public get attackCounts()
    {
        return this.attackCount;
    }

    public update()
    {
        super.update();
        // //检测是否可以结束怪物回合
        // var mArr = CharacterManager.Instance.monsterArr;
        // for(var i=0;i<mArr.length;i++)
        // {
        //     if(mArr[i].state != CharacterState.EndRound)
        //     {
        //         return;
        //     }
        // }
    }

    /**怪物更新状态 */
    public changeState(state:CharacterState)
    {
        switch(state)
        {
            case CharacterState.WaitRound:
            this._state = CharacterState.WaitRound;
            break;
            case CharacterState.EndRound:
            this.randomNextAction();
            this._state = CharacterState.EndRound;
            this.nextMonsterCanAciton();    
            break;

        }
    }

    /**下一个怪物可以行动 */
    public nextMonsterCanAciton()
    {
        var mArr = CharacterManager.Instance.monsterArr;
        var index = mArr.indexOf(this);
        if(mArr[index+1])
        {
            Message.instance.send(MsgCMD.NEXT_MONSTER_ACTION,{target:mArr[index+1]});
        }
        else
        {
            GameManager.Instance.changeGameStart(GameState.EnemyRoundEnd);
        }
    }

    public damaged(damageData:DamageData)
    {
        super.damaged(damageData);
        if(this.actionStateArr.indexOf(MonsterActionState.Sleep)>=0)
        {
            if(this.healthC.curDefense<=0)
            this.addDizziness();
        }
        var self = this;
        this.bodyImg.x = 0;
        var posX:number = 15;
        self.skewX = 0;
        egret.Tween.get(this.bodyImg).to({skewX:10,x:posX},100,egret.Ease.quartOut).to({skewX:0,x:0},150);
    }

    public dead()                 
    {
        this._isDead = true;
       
        Message.instance.send(MsgCMD.MONSTER_DIE)
        egret.Tween.get(this).to({alpha:0},600).call(this.removeSelf);
        
    }

    public removeSelf()
    {
        CharacterManager.Instance.removeMonster(this);
        if(this.monsterLevel == 1)
        {
            GameManager.Instance.ordinary ++;
        }
        if(this.monsterLevel == 2)
        {
            GameManager.Instance.elite ++;
        }
        if(this.bodyAnim)
        this.bodyAnim.removeFromViewPort();
    }

    /**怪物等级，1普通怪，2精英怪，3boss怪 */
    public get mLevel()
    {
        return this.monsterLevel;
    }
}