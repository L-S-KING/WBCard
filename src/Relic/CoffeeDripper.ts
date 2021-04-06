/**
 * 咖啡滤杯
 * 每回合开始时获得1点能量，你无法再在休息处休息。
 * 刘双
 */
class CoffeeDripper extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(CoffeeDripper);
		this.id = RelicManager.Instance.relicNameArr.indexOf(CoffeeDripper);
	}

	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.PLAYER_ROUND_START,this);
	}

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		GameManager.Instance.curPlayerPP += 1;
		var data = {pp:0};
		Message.instance.send(MsgCMD.CARD_USE,data);
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_ROUND_START:
			egret.Tween.get(this).wait(800).call(this.relicEffect)
			break;
		}
	}
}