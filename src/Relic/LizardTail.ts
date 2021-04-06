/**蜥蜴尾巴
 * 第一次死亡时复活，恢复50%生命值。
 * 刘双
 */
class LizardTail extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(LizardTail)
		this.id = RelicManager.Instance.relicNameArr.indexOf(LizardTail);
	}

	private frequency:boolean=false;

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		var player = CharacterManager.Instance.player;
	
		player.healthCom.curHealth=Math.floor(player.healthCom.maxHealth*0.5);
		this.canUse = false;
	}
	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.PLAYER_DEAD,	this);
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_DEAD:
			{
				if(this.canUse)
				this.relicEffect();
			}
			break;
		}
	}
}