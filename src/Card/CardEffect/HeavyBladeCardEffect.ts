/**重刃效果 */

class HeavyBladeCardEffect extends BaseCardEffect
{
	public constructor(data?:any,card?:Card) 
	{
		super(data,card);
		this.name = egret.getQualifiedClassName(HeavyBladeCardEffect);
	}

	private power:number = 0;
	private changePower:boolean = false;
	//卡牌的伤害数值
	private damageData:DamageData = null;
	//伤害倍数
	private damagedTimes:number = 0;

	public initData()
	{
		if(this.data)
		{
			this.damagedTimes = parseFloat(this.data.spValue);
		}
	}

	public setCardDetail()
	{		
		this.cardOwner.addCardDetail("力量在重刃上发挥"+this.damagedTimes+"倍效果。")
	}

	public useCardEffect(character?:BaseCharacter)
    {
		if(!this.changePower)
		{
			this.power = CharacterManager.Instance.player.powerUpValue;
			CharacterManager.Instance.player.powerUpValue = this.power * this.damagedTimes;
			this.changePower = true;
			this.cardOwner.setCardDetail();
		}
		else
		{
			this.cardOwner.setCardDetail();
		}
		//if(!CardManager.Instance.isDoubleEffect)
		this.removeSelf();
		
		egret.Tween.get(this).to({},100).call(function(){CharacterManager.Instance.player.powerUpValue = this.power;});

		return true;
    }
}