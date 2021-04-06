/**
 * 炸蛋
 * 战斗开始时添加炸弹效果
 */
class BombEgg extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(BombEgg)
		this.id = RelicManager.Instance.relicNameArr.indexOf(BombEgg);
	}

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		var player = CharacterManager.Instance.player;
		var data = DataManager.Instance.getBuffDataByName("boom");
		var temp = data.value;
		data.value = 7;
		player.addBuff(data);
		data.value = temp;
	}

	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.PLAYER_ROUND_START,this)
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_ROUND_START:
				if(GameManager.Instance.roundCount == 0)
				{
					this.relicEffect();	
				}
			break;
		}
	}
}