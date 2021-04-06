/**奥利哈钢
 * 战斗开始添加5层护甲。
 */
class Orichalcum extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(Orichalcum)
		this.id = RelicManager.Instance.relicNameArr.indexOf(Orichalcum);
	}

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		var buffData = DataManager.Instance.getBuffDataByName("multipleDefense");
        var _buffData:BuffData = {
            name:buffData.name,
            detailName:buffData.detailName,
            type:buffData.type,
            detail:buffData.detail,
            img:buffData.img,
            value:5,
			gainType:buffData.gainType
        }

		var player = CharacterManager.Instance.player;
		player.addBuff(_buffData)


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
			if(GameManager.Instance.roundCount==0)
			egret.Tween.get(this).wait(2800).call(this.relicEffect);
			break;
		}
	}
}