/**异蛇之眼
 * 战斗开始添加混乱，每回合多抽2张卡。
 */
class SneckoEye extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(SneckoEye)
		this.id = RelicManager.Instance.relicNameArr.indexOf(SneckoEye);
	}

	private frequency:boolean=false;

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		egret.Tween.get(this).wait(2800).call(function(){
			Message.instance.send(MsgCMD.DRAW_CARD,2);
		})
	}

	public addChaos()
	{
		var buffData = DataManager.Instance.getBuffDataByName("chaos");
        var _buffData:BuffData = {
            name:buffData.name,
            detailName:buffData.detailName,
            type:buffData.type,
            detail:buffData.detail,
            img:buffData.img,
            value:null,
			gainType:buffData.gainType
        }

		var player = CharacterManager.Instance.player;
		if(player)
		{
			player.addBuff(_buffData)
		}
	}
	public addEvent()
	{
		super.addEvent();
		this.addMessage(MsgCMD.PLAYER_ROUND_START,	this);
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_ROUND_START:
			{
				if(GameManager.Instance.roundCount==0)
				{
					this.addChaos();
				}
				this.relicEffect();
			}
			break;
		}
	}
}