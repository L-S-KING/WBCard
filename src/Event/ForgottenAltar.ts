class ForgottenAltar extends BaseSpecialEvent
{
	public constructor() 
	{
		super();
	}
	//接收消息
    recvMsg(cmd:number, data:any)
    {

    }

	public addToViewPort(e:egret.Event)
	{
		super.addToViewPort(e);
		this.addEvent();
		this.initData();
	}

	public initData()
	{
		this.event_img.source = RES.getRes("f_jpg");
		this.event_name_label.text = "被遗忘的祭坛";

		this.event_label.text="在你面前是一个已经被遗忘的祭坛，在祭坛上方，是一双手伸出的精致女性雕像，她呼唤着你，要求你献上贡品"
		this.chose_1_btn.label="失去5点最大生命值，恢复15点生命。";
		this.chose_2_btn.label="失去88金币。";
		this.leaveHome_btn.visible=false;
		
	}

	public addEvent()
	{
		this.addListener(this.chose_1_btn,egret.TouchEvent.TOUCH_BEGIN,this.chose1,this);
		this.addListener(this.chose_2_btn,egret.TouchEvent.TOUCH_BEGIN,this.chose2,this);
		this.addListener(this.leaveHome_btn,egret.TouchEvent.TOUCH_BEGIN,this.notConfirm,this);
	}

	public chose1()
	{
		this.event_img.source = RES.getRes("d_jpg");
		GameManager.Instance.maxHealth -= 5;
		GameManager.Instance.curHealth += 15;
		this.event_label.text="你站在祭坛前，割开你自己的手腕。随着鲜血涌入到祭坛上，雕像的双手伸到你的面前遮住了你的双眼。一切坠入黑暗。"

		this.chose_1_btn.visible=false;
		this.chose_2_btn.visible=false;
		this.leaveHome_btn.visible=true;
	}


	public chose2()
	{
		if(GameManager.Instance.curCoin>=88)
		{
			this.event_label.text="你将金币放入雕像的面前，她发出了邪魅的笑声。"
			GameManager.Instance.curCoin-=88
			this.event_img.source = RES.getRes("w_jpg");
			this.chose_1_btn.visible=false;
			this.chose_2_btn.visible=false;
			this.leaveHome_btn.visible=true;
		}
		else
		{
			this.event_img.source = RES.getRes("w_jpg");
			this.event_label.text="你没有钱，穷鬼。"
		}
	}

}