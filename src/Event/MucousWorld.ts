class MucousWorld extends BaseSpecialEvent
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
		this.event_img.source = RES.getRes("world_png");
		this.event_name_label.text = "黏液世界";

		this.event_label.text="你掉进了一个水坑里。\n可是坑里全都是史莱姆黏液！你感觉这黏液似乎会灼烧你，你拼命想要脱身。爬出来后，你发现自己的金币似乎变少了。你回头一看，发现水坑不但有你掉落的钱，还有不少其他不幸的冒险者们落下的金币。"
		this.chose_1_btn.visible=true;
		this.chose_1_btn.label="[收集金币]获得75金币。失去11生命"
		this.chose_2_btn.label="[放手吧]失去39金币。";
		this.leaveHome_btn.visible=false;
		
	}

	public addEvent()
	{
		this.addListener(this.chose_1_btn,egret.TouchEvent.TOUCH_TAP,this.chose1,this);
		this.addListener(this.chose_2_btn,egret.TouchEvent.TOUCH_TAP,this.chose2,this);
		this.addListener(this.leaveHome_btn,egret.TouchEvent.TOUCH_TAP,this.notConfirm,this);
	}

	public chose1()
	{
		
		this.event_label.text="在长时间与黏液接触而导致你的皮肤被烧走之前，你成功捞出了不少金币"
		GameManager.Instance.curCoin+=75;
		GameManager.Instance.curHealth-=11
		this.chose_1_btn.visible=false;
		this.chose_2_btn.visible=false;
		this.leaveHome_btn.visible=true;
	}

	public chose2()
	{
		if(GameManager.Instance.curCoin>=39)
		{
			this.event_label.text="你决定这样做不值得。"
			GameManager.Instance.curCoin-=39;
			this.chose_1_btn.visible=false;
			this.chose_2_btn.visible=false;
			this.leaveHome_btn.visible=true;
		}
	}

}