/**
 * 纸蛙
 * 易伤的伤害增加75%，而非为50%。
 * 刘双
 */
class PaperFrog extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(PaperFrog);
		this.id = RelicManager.Instance.relicNameArr.indexOf(PaperFrog);
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
		var monsterArr = CharacterManager.Instance.monsterArr;
		for(var i=0;i<monsterArr.length;i++)
		{
			for(var j=0;j<monsterArr[i].getHaveBuff().length;j++)
			{
				if(monsterArr[i].getHaveBuff()[j].name == "maimed")
				{
					monsterArr[i].damageTimes = 1.75;
				}
			}
		}
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.CARD_USE:
				this.relicEffect();
			break;
		}
	}
}