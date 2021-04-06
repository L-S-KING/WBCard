/**红头骨
 * 生命值低于50%时，增加3点力量。
 */
class RedSkull extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(RedSkull)
		this.id = RelicManager.Instance.relicNameArr.indexOf(RedSkull);
	}

	private a:boolean=false;

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		var buffData = DataManager.Instance.getBuffDataByName("powerUp");
        var _buffData:BuffData = {
            name:buffData.name,
            detailName:buffData.detailName,
            type:buffData.type,
            detail:buffData.detail,
            img:buffData.img,
            value:3,
			gainType:buffData.gainType
        }
		var player = CharacterManager.Instance.player;

		if(player.healthCom.curHealth<=player.healthCom.maxHealth*0.5&&this.a==false)
		{
			player.addBuff(_buffData);
			this.a=true;
		}
		
	}
	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.PLAYER_UNDERATTACK,	this);
		this.addMessage(MsgCMD.PLAYER_ROUND_START,this);
		this.addMessage(MsgCMD.GAME_ROUND_END,this);
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_UNDERATTACK:
			{
				this.relicEffect();
			}
			break;
			case MsgCMD.PLAYER_ROUND_START:
			if(GameManager.Instance.roundCount == 0)
			{
				this.relicEffect();
			}
			break;
			case MsgCMD.GAME_ROUND_END:
			this.a = false;
			break;
		}
	}
}