/**
 * 黑暗之血
 * 在战斗结束时,回复10点生命
 * 刘双
 */
class BlackBlood extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(BlackBlood);
		this.id = RelicManager.Instance.relicNameArr.indexOf(BlackBlood);
	}
	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.GAME_ROUND_END,this)
	}

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		GameManager.Instance.curHealth += 10;
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.GAME_ROUND_END:
			this.relicEffect();
			break;
		}
	}
}