/**
 * 生姜
 * 你不会在被虚弱
 * 刘双
 */
class Ginger extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(Ginger);
		this.id = RelicManager.Instance.relicNameArr.indexOf(Ginger);
		this.relicEffect();
	}

	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.PLAYER_ROUND_START,this)
	}

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		Message.instance.send(MsgCMD.PLAYER_NOTWEAK)
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_ROUND_START:
			if(GameManager.Instance.roundCount==0)
			{
				var player = CharacterManager.Instance.player;
				if(player)
				{
					player.getimmunityBuffName().push("week");
					var _buffData = DataManager.Instance.getBuffDataByName("week");
				}
			}
			break;
		}
	}
}