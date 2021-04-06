/**弹珠袋
 * 每场战斗开始对怪物增加1层易伤
 */
class Marbles extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(Marbles)
		this.id = RelicManager.Instance.relicNameArr.indexOf(Marbles);
	}
	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		var buffData = DataManager.Instance.getBuffDataByName("maimed");
        var _buffData:BuffData = {
            name:buffData.name,
            detailName:buffData.detailName,
            type:buffData.type,
            detail:buffData.detail,
            img:buffData.img,
            value:1,
			gainType:buffData.gainType
        }

		var monsterArr = CharacterManager.Instance.monsterArr;

		for(var i :number=0; i<monsterArr.length;i++)
		{
			monsterArr[i].addBuff(_buffData);	
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
				if(GameManager.Instance.roundCount == 0)
				this.relicEffect();
			}
			break;
		}
	}
}