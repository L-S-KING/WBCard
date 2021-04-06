/**
 * 缩放仪
 * 每当BOSS战开始时，回复25点生命
 * 刘双
 */
class Pantograph extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(Pantograph);
		this.id = RelicManager.Instance.relicNameArr.indexOf(Pantograph);
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
		var player = CharacterManager.Instance.player;
		player.healthCom.curHealth += 25;
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_ROUND_START:
			if(GameManager.Instance.roundCount==0)
			{
				var mArr = CharacterManager.Instance.monsterArr;
				for(var i=0;i<mArr.length;i++)
				{
					if(mArr[i].mLevel==3)
					{
						this.relicEffect();
						return;
					}
				}
			}
			break;
		}
	}
}