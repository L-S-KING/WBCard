class ResultDefenseBuff extends BaseBuff
{
	public constructor(data?:BuffData,buffTarget?:BaseCharacter,spBuffCardType?:number)
	{
		super(data,buffTarget);
		this.spBuffCardType=spBuffCardType;
	}
    public setImgIcon()
    {
        this.buff_img.source = this.data.img;
        this.round_label.visible = false;
        if(this.spBuffCardType<=4)
        {
           this.detail = "使用攻击卡时增加1点格挡值。"
        }
        else
        {
            this.detail = "使用效果卡时增加1点格挡值。"
        }
    }
	/**增加格挡 */
	public changeDefense()
    {
        var player = CharacterManager.Instance.player;
        player.changeDefense(1);
    }
	private spBuffCardType:number=0;

	recvMsg(cmd:number, data:any)
	{
		switch(cmd)
		{
			 case MsgCMD.PLAYER_ROUND_START:
            if(this.buffTarget.type == 0)
            {
                this.roundStartEffect();
            }
            break;
            case MsgCMD.PLAYER_ROUND_END:
            if(this.buffTarget.type == 0)
            {
                this.roundEndEffect();
            }
            break;
            case MsgCMD.ENEMY_ROUND_START:
            if(this.buffTarget.type == 1)
            {
                this.roundStartEffect();
            }
            break;
            case MsgCMD.ENEMY_ROUND_END:
            if(this.buffTarget.type == 1)
            {
                this.roundEndEffect();
            }
            break;
			//玩家使用攻击
            case MsgCMD.CARD_USE:
			if(GameManager.Instance.curSelectCard!=null)
			{
                if(this.spBuffCardType<=4)
                {
                    
                    if(GameManager.Instance.curSelectCard.cardEffecType==0)
                    {
                        this.buffTarget.addBuffTips("全身防护I",0)
                        egret.Tween.get(this).wait(500).call(this.changeDefense);
                        
                    }
                }
                else
                {
                    if(GameManager.Instance.curSelectCard.cardEffecType==1)
                    {
                        this.buffTarget.addBuffTips("全身防护II",0)
                        egret.Tween.get(this).wait(500).call(this.changeDefense);
                    }
                }
			}
            break;
		}
	}

}