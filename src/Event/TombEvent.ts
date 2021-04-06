/**陵墓 */
class TombEvent extends BaseModule
{
	protected event_img:eui.Image;
	protected event_label:eui.Label;
	protected event_name_label:eui.Label;
	protected eventDetailArr:any[] = [];
	protected chose_1_btn:eui.Button;
	protected chose_2_btn:eui.Button;
	protected leaveHome_btn:eui.Button;
	protected index:number = 0;
	private hasRelic:boolean = false;

	public constructor() 
	{
		super();
		this.skinName = "SpecialEventSkin"
		this.name = egret.getQualifiedClassName(TombEvent);
	}

	public addToViewPort(e:egret.Event)
	{
		super.addToViewPort(e);
		this.initData();
		this.addEvent();
	}

	public initData()
	{
		this.chose_1_btn.visible = false;
		this.eventDetailArr.push(string);
		var string = "你在一系列陵墓中穿行，前方出现了一个圆形房间，中间是一口镶嵌着许多宝石的大石棺。"+"\n\n"+
		"你辨认不出石棺的字迹，但你能注意到有黑色的雾气从石棺周围散发出来。"+",你推开石棺，一股黑雾涌了出来，淹没了整个房间"+
		"石棺里没有实体，只有一件遗物，你拾起它重新上路，并剧烈的咳嗽了起来"+",你推开石棺，雾气很快消散了，在石棺里你找到了一具荣誉满身的士兵尸体，"+
		"尸体手中握着一件遗物，你把这个过来，赶快走了。"
		this.eventDetailArr = string.split(',');
		this.setDetail();
		
	}

	public addEvent()
	{
		this.addListener(this.chose_1_btn,egret.TouchEvent.TOUCH_BEGIN,this.confirm,this);
		this.addListener(this.chose_2_btn,egret.TouchEvent.TOUCH_BEGIN,this.confirm,this);
		this.addListener(this.leaveHome_btn,egret.TouchEvent.TOUCH_BEGIN,this.notConfirm,this);
	}

	public setDetail()
	{
		this.event_img.source = RES.getRes("jljy_jpg");
		this.event_name_label.text = "陵墓";
		this.event_label.text = this.eventDetailArr[0];
		this.chose_2_btn.label = "[打开棺材] 得到一件遗物。50%被诅咒。"
	}

	public confirm()
	{
		if(!this.hasRelic)
		{
			//获得遗物
			RelicManager.Instance.addRelicToPlayer();
			//是否诅咒
			var random = Math.random();
			if(random<=0.5)						//被诅咒
			{
				//添加一张诅咒牌
				CardManager.Instance.haveCardId.push(8);
				Message.instance.send(MsgCMD.PLAYER_HAVECARD_CHANGE);
				this.event_label.text = this.eventDetailArr[1];
			}
			else								//未被诅咒
			{
				this.event_label.text = this.eventDetailArr[2];
			}
			this.chose_2_btn.label = "继续";
			this.hasRelic = true;
		}
		else
		{
			this.removeSelf();
		}
	}
	
	public notConfirm()
	{
		this.removeSelf();
	}

	public removeSelf()
	{
		if(this.parent && this.parent.contains(this))
		{
			EventManager.Instance.tapCount = 0;
			if(egret.localStorage.getItem("userData"))
			{
				var userData:IUserData =  SaveManager.Instance.loadGame();
				userData.tap = 0;
			}
			SaveManager.Instance.saveGame();
			this.parent.removeChild(this);
			GameManager.Instance.addClearNodeToArr();
			SceneManager.Instance.addMapScene(new MapScene())
		}
	}
}