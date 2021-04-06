/**
 * 变异人（精英怪）
 */
class Variation extends BaseMonster
{
	private isMaimed:boolean = false;
	public constructor(data:any) 
	{
		super(data);
		this.name = egret.getQualifiedClassName(Variation);
	}

	public initData()
	{
		super.initData();
		this.health = 160;
		this.data.imgSource = "variation_0_png";
        this.damageVfx = "variation_vfx_png";
		this.monsterLevel = 2;
	}

	public addEvent()
	{
		super.addEvent();
	}

	public init()
	{
		this.actionTips = new MonsterActionTip(this);
        this.addChild(this.actionTips);
		var posY:number = 20;
		var originY:number = 0;
		this.randomNextAction();

		this.bodyAnim = new ImgAnim();
		this.bodyAnim.initData("variation_",8,this.bodyImg,5,false,true);
		this.bodyAnim.playAnim();
	}

	public randomNextAction()
	{
		this.actionStateArr = [];
        this.actionIndex = 0;

		if(this.monsterAliveRound == 0)
		{
			this.actionStateArr.push(MonsterActionState.debuff);
		}
		else
		{
			var random:number = Math.floor(Math.random()*3)
			if(random==0)
			{
				this.attack = Math.floor(Math.random()*5+10);
				this.attackCount = Math.floor(Math.random()*2+1);
				this.actionStateArr.push(MonsterActionState.attack);
			}
			else if(random==1)
			{
				this.attack = Math.floor(Math.random()*5+5);
				this.attackCount = Math.floor(Math.random()*2+2);
				this.actionStateArr.push(MonsterActionState.attack);
			}
			else if(random==2)
			{
				this.attack = Math.floor(Math.random()*5+10);
				this.attackCount = Math.floor(Math.random()*2+1);
				this.actionStateArr.push(MonsterActionState.attack);
				//给易伤
				this.isMaimed = true;
			}
		}

		this.actionTips.updateTips();
	}

	/**行动 */
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
			this.deBuffPlayerByName("chaos");
			break;
		}
	}

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
		if(this.isMaimed)
		{	
			this.deBuffPlayerByName("maimed");
			this.isMaimed = false;
		}
	
		
	}

	public deBuffPlayerByName(name:string)
	{
		var _buffData = DataManager.Instance.getBuffDataByName(name);
		var value;
		if(name=="chaos")
		{
			 value = 0;
		}
		else 
		{
			value = Math.floor(Math.random()*2+2);
		}
		var self = this;
        var _data = {
            name:_buffData.name,
            detailName:_buffData.detailName,
            type:_buffData.type,
            detail:_buffData.detail,
            img:_buffData.img,
            value:value,
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
}