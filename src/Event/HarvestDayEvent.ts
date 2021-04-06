/**收获日 */
class HarvestDayEvent extends  BaseModule
{
	protected event_img:eui.Image;
	protected event_label:eui.Label;
	protected event_name_label:eui.Label;
	protected chose_1_btn:eui.Button;
	protected chose_2_btn:eui.Button;
	protected leaveHome_btn:eui.Button;
	protected index:number = 0;
	private probability:number = 0;

	public constructor() 
	{
		super();
		this.skinName = "SpecialEventSkin";
		this.name = egret.getQualifiedClassName(HarvestDayEvent);
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
		this.probability = 25;
		this.setDetail();	
	}

	public setDetail()
	{
		this.event_img.source = RES.getRes("acdc_jpg");
		this.event_name_label.text = "收获日";
		this.event_label.text = "失去6点生命，"+this.probability+"%"+"的概率获得一件遗物";
		this.chose_2_btn.labelDisplay.text = "继续"
	}

	public addEvent()
	{
		this.addListener(this.chose_1_btn,egret.TouchEvent.TOUCH_BEGIN,this.confirm,this);
		this.addListener(this.chose_2_btn,egret.TouchEvent.TOUCH_BEGIN,this.confirm,this);
		this.addListener(this.leaveHome_btn,egret.TouchEvent.TOUCH_BEGIN,this.notConfirm,this);
	}

	public confirm()
	{
		if(this.probability>0)
		{
			var random = Math.random();
			if(random<=this.probability/100)
			{
				//获得一件遗物
				RelicManager.Instance.addRelicToPlayer();
				this.removeSelf();
			}
			else
			{
				this.probability += 25;
			}
			//失去6点生命
			GameManager.Instance.curHealth -= 6;
			this.event_label.text = "失去6点生命，"+this.probability+"%"+"的概率获得一件遗物";
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
			SceneManager.Instance.addMapScene(new MapScene());
		}
	}
}