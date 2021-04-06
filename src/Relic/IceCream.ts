/**
 * 冰激凌
 * 上一回合剩余的PP保留到下一回合
 * 刘双
 */
class IceCream extends BaseRelic
{
	private pp:number = 0;						//上一回合剩余的PP值
	
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(IceCream);
		this.id = RelicManager.Instance.relicNameArr.indexOf(IceCream);
	}

	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.PLAYER_ROUND_START,this);
		this.addMessage(MsgCMD.PLAYER_ROUND_END,this);
		this.addMessage(MsgCMD.GAME_ROUND_END,this);
	}

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		GameManager.Instance.curPlayerPP += this.pp;
		var data = {pp:0};
		Message.instance.send(MsgCMD.CARD_USE,data);
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{ 
			case MsgCMD.PLAYER_ROUND_START:
				egret.Tween.get(this).to({},800).call(this.relicEffect)
			break;

			case MsgCMD.PLAYER_ROUND_END:
				this.pp = GameManager.Instance.curPlayerPP;
			break;

			case MsgCMD.GAME_ROUND_END:
				this.pp = 0;
			break;
		}
	}
}