/**鸟面瓮
 * 每使用一张非攻击牌，回复2血 。
 * */
class BirdUrn extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(BirdUrn)
		this.id = RelicManager.Instance.relicNameArr.indexOf(BirdUrn);
	}
	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		
		var player = CharacterManager.Instance.player;
		if(GameManager.Instance.curSelectCard!=null)
		{
			if(GameManager.Instance.curSelectCard.cardEffecType!=0)
			{
				player.healthCom.curHealth+=1;
			}
		}
	}
	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.CARD_USE,this);
	}                                

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.CARD_USE:
			{
				this.relicEffect();
			}
			break;
		}
	}
}