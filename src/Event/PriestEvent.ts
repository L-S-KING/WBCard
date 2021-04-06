/**牧师 */
class PriestEvent extends BaseModule
{
	protected event_img:eui.Image;
	protected event_label:eui.Label;
	protected event_name_label:eui.Label;
	protected eventDetailArr:any[] = [];
	protected chose_1_btn:eui.Button;
	protected chose_2_btn:eui.Button;
	protected leaveHome_btn:eui.Button;
	protected index:number = 0;

	public constructor() 
	{
		super();
		this.skinName = "SpecialEventSkin"
		this.name = egret.getQualifiedClassName(PriestEvent);
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
		var string = "一个带着金头盔（？）的奇怪蓝色人型生物脸上带着大大的微笑走到了你的面前。"+",“你好啊朋友！我是牧师！想不想试试我的服务啊？！”"
		+",一道温暖的金光笼罩了你。\n牧师最强奶妈，祝你路途愉快！"
		this.eventDetailArr = string.split(',');
		this.setDetail();
		
	}

	public setDetail()
	{
		this.event_img.source = RES.getRes("jieGe_jpg");
		this.event_name_label.text = "牧师";
		this.event_label.text = this.eventDetailArr[0];
	}

	public removefromViewPort(e:egret.Event)
	{
		super.removefromViewPort(e);
	}

	public addEvent()
	{
		this.addListener(this.chose_1_btn,egret.TouchEvent.TOUCH_BEGIN,this.confirm,this);
		this.addListener(this.chose_2_btn,egret.TouchEvent.TOUCH_BEGIN,this.confirm,this);
		this.addListener(this.leaveHome_btn,egret.TouchEvent.TOUCH_BEGIN,this.notConfirm,this);
	}


	public confirm()
	{
		this.setEventLabel();
		if(this.index==1)
		{
			this.chose_2_btn.label = "花费35金币，回复10滴血。";
		}
		else if(this.index==2)
		{
			var coin = GameManager.Instance.curCoin;
			if(coin>=35)
			{
				GameManager.Instance.curCoin-=35;
				GameManager.Instance.curHealth+=10;
				this.chose_2_btn.visible = false;
			}
			else
			{
				//不执行效果
			}
			//减35金币
			//加10滴血
		}
	}

	public notConfirm()
	{
		this.removeSelf();
	}

	public setEventLabel()
	{
		this.index = this.eventDetailArr.indexOf(this.event_label.text) + 1;
		if(this.eventDetailArr.length>this.index)
		{
			this.event_label.text = this.eventDetailArr[this.index];
		}
		else
		{
			// this.removeSelf();
		}
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