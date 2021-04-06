/**
 * 大地精灵
 * 每杀死一个敌人回复一点能量,抽一张卡
 */
class GremlinHorn extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedSuperclassName(GremlinHorn);
		this.id = RelicManager.Instance.relicNameArr.indexOf(GremlinHorn);
	}

	private deadMonsterCount:number = 0;

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		GameManager.Instance.curPlayerPP += 1;
		this.deadMonsterCount++;
		var data = {pp:0};
		Message.instance.send(MsgCMD.CARD_USE,data);
		
		egret.Tween.get(this).wait(800).call(function(){Message.instance.send(MsgCMD.DRAW_CARD,1);})	
		//egret.Tween.get(this).wait(1000).call(function(){this.deadMonsterCount = 0;})		
	}

	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.MONSTER_DIE,	this);
		this.addMessage(MsgCMD.PLAYER_ROUND_START,this)
		this.addMessage(MsgCMD.CARD_USE,this);
		this.addMessage(MsgCMD.PLAYER_ROUND_END,this)
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.MONSTER_DIE:
				this.relicEffect();	
			break;
			case MsgCMD.PLAYER_ROUND_START:		
			break;
			case MsgCMD.CARD_USE:
			break;
			case MsgCMD.PLAYER_ROUND_END:
			break;
		}
	}
}