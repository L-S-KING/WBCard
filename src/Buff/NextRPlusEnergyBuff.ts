class NextRPlusEnergyBuff extends BaseBuff
{
	public constructor(data?:BuffData,buffTarget?:BaseCharacter) 
	{
		super(data,buffTarget);
	}

	//接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            case MsgCMD.PLAYER_ROUND_START:
            if(this.buffTarget.type == 0)
            {
				if(this.name=="nextPlusEnergy")
				this.plusEnergy();
            }
            break;
        }
    }

	public plusEnergy()
	{
		egret.Tween.get(this).to({},800).call(removeSelf)

		function removeSelf()
		{
			GameManager.Instance.curPlayerPP += this.roundCount;
			var data = {pp:0};
			Message.instance.send(MsgCMD.CARD_USE,data);
			Message.instance.remove(MsgCMD.PLAYER_ROUND_START,this);
			if(this.parent && this.parent.contains(this))
			{
                var player = CharacterManager.Instance.player;
                player.removeBuff(this);
			}
		}
	}
}