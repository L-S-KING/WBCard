/**
 * 草莓
 * 拾起时，玩家最大生命值增加7
 * 刘双
 */
class Strawberry extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(Strawberry);
		this.id = RelicManager.Instance.relicNameArr.indexOf(Strawberry);
	}

	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.ITEM_GET,this)
	}

	public relicEffect()
	{

		GameManager.Instance.maxHealth+=7;
	}

	recvMsg(cmd:number,data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.ITEM_GET:
			if(SaveManager.Instance.userData)
			{
				var userRelicIdArr = SaveManager.Instance.userData.relic;
				if(userRelicIdArr.indexOf(this.id)>=0)
				{
					return;
				}
			}
			if(data == this.name)
			this.relicEffect();
			break;
		}
	}
}