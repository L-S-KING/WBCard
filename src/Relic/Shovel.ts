/**铲子
 * 每掉一次血抽一张牌。
 */
class Shovel extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(Shovel)
		this.id = RelicManager.Instance.relicNameArr.indexOf(Shovel);
	}

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		// egret.Tween.get(this).to({alpha:0},100).call(function(){Message.instance.send(MsgCMD.DRAW_CARD,1);} )
		Message.instance.send(MsgCMD.DRAW_CARD,1);
		
	}

	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.PLAYER_UNDERATTACK,this)
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_UNDERATTACK:
			{
				 this.relicEffect ()
			}
			break;
		}
	}
}