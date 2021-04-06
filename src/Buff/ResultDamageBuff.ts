class ResultDamageBuff extends BaseBuff
{
	public constructor(data?:BuffData,buffTarget?:BaseCharacter,spBuffCardType?:number)
	{
		super(data,buffTarget,);
        this.spBuffCardType=spBuffCardType;
	}
    public setImgIcon()
    {
        this.buff_img.source = this.data.img;
        this.round_label.visible = false;
        if(this.spBuffCardType<=4)
        {
           this.detail = "使用攻击卡时所有敌人造成额外1点伤害。"
        }
        else
        {
            this.detail = "使用效果卡时所有敌人造成额外1点伤害。"
        }
    }

	/**效果减血 */
    public changeHealth()
    { 

        for(var i=0;i<CharacterManager.Instance.monsterArr.length;i++)
        {
            var damaged = new DamageData();
            damaged.damageValue = 1;
            damaged.damageEffect = "38_png";
            CharacterManager.Instance.monsterArr[i].damaged(damaged);
        }
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
                        this.buffTarget.addBuffTips("浴火焚身I",0)
                        egret.Tween.get(this).wait(500).call(this.changeHealth);
                    }
                }
                else
                {
                    
                    if(GameManager.Instance.curSelectCard.cardEffecType==1)
                    {
                        this.buffTarget.addBuffTips("欲火焚身II",0)

                        egret.Tween.get(this).wait(500).call(this.changeHealth);
                    }
                }
			}
            break;
		}
	}

}