class AbandonScene extends BaseScene
{
	public constructor() 
	{
		super();
		this.skinName = "AbandonSceneSkin";
		this.x = 400;
		this.y = 50;
		this.addListener(this.confirm_btn,egret.TouchEvent.TOUCH_TAP,this.abandon,this);
		this.addMessage(MsgCMD.START_ABANDON,this);
        this.name = egret.getQualifiedClassName(AbandonScene);
        this.initData();
	}

    public initData()
    {
        //开始丢弃
        for(var i=0;i<CardManager.Instance.handCard.length;i++)
        {
            if(!CardManager.Instance.handCard[i].startAbandon)
            CardManager.Instance.handCard[i].startAbandon = true;
        }
    }

	public card:Card[] = [];
	private confirm_btn:eui.Button;
	private abandonCount:number = 0;

	/**点击确定 */
	private abandon()
	{
		if(this.parent && this.parent.contains(this))
		{
			var handCard = CardManager.Instance.handCard;
			if(this.card.length<=0)
			{
				if(handCard.length<=0)
				{
					for(var j=0;j<CardManager.Instance.handCard.length;j++)
					{
						CardManager.Instance.handCard[j].startAbandon = false;
					}
					SceneManager.Instance.abandonScene = null;
					Message.instance.send(MsgCMD.ABANDON_END);
					this.parent.removeChild(this);
					return;
				}
				else
				{
					TipsManager.Instance.createTips("请舍弃"+CardManager.Instance.abandonCardCount+"张牌")
				}
			}
			else if(this.card.length > 0)
			{
				if(this.card.length == CardManager.Instance.abandonCardCount)
				{
					for(var j=0;j<CardManager.Instance.handCard.length;j++)
					{
						CardManager.Instance.handCard[j].startAbandon = false;
					}

					for(var i=0;i<this.card.length;i++)
					{
						this.card[i].abandonCard();
						this.card.splice(i,1);
						i--;
					}
					SceneManager.Instance.abandonScene = null;
					Message.instance.send(MsgCMD.ABANDON_END);
					this.parent.removeChild(this);
				}
				else
				{
					if(handCard.length<=0)
					{
						for(var j=0;j<CardManager.Instance.handCard.length;j++)
						{
							CardManager.Instance.handCard[j].startAbandon = false;
						}
						for(var i=0;i<this.card.length;i++)
						{
							this.card[i].abandonCard();
							this.card.splice(i,1);
							i--;
						}
						SceneManager.Instance.abandonScene = null;
						Message.instance.send(MsgCMD.ABANDON_END);
						this.parent.removeChild(this);
						return;
					}
					else
					{
						TipsManager.Instance.createTips("请舍弃"+CardManager.Instance.abandonCardCount+"张牌")
					}
				}
			}
		}
	}

	//接收消息
    recvMsg(cmd:number, data:any):void
	{
		
	}
}