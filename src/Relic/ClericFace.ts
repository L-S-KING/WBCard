/**
 * 牧师的脸
 * 每场战斗结束，你的最大生命值加1.
 */
class ClericFace extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(ClericFace);
		this.id = RelicManager.Instance.relicNameArr.indexOf(ClericFace);
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
		GameManager.Instance.maxHealth += 1;
	}

	recvMsg(cmd:number,data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.GAME_ROUND_END:
			this.relicEffect();
			break;
		}
	}
}