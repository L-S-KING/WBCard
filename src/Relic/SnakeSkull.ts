/**
 * 异蛇头骨
 * 每当你给予敌人中毒效果时，额外给予1层中毒效果。
 */
class SnakeSkull extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(SnakeSkull)
		this.id = RelicManager.Instance.relicNameArr.indexOf(SnakeSkull);
	}

	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.CARD_USE,this);
	}

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		var monster = GameManager.Instance.curSelectMonster;
		var data = DataManager.Instance.getBuffDataByName("poisoning");
		var temp:number = data.value;
		data.value = 1;
		monster.addBuff(data);
		data.value = temp;
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.CARD_USE:
				var _data:CardData = data;
				if(_data&&_data.buff)
				{
					var buffArr = _data.buff.split(',');
					if(buffArr.indexOf("poisoning")>=0)
					this.relicEffect();
				}
			break;
		}
	}
}