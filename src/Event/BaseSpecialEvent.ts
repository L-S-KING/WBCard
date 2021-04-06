class BaseSpecialEvent extends BaseModule
{
	protected event_img:eui.Image;

	protected event_label:eui.Label;

	protected event_name_label:eui.Label;


	protected chose_1_btn:eui.Button;
	protected chose_2_btn:eui.Button;
	protected leaveHome_btn:eui.Button;

	protected index:number = 0;

	public constructor() 
	{
		super();
		this.skinName = "SpecialEventSkin";
		this.y = 50;
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
		
	}

	public addEvent()
	{
		
	}

	public notConfirm()
	{
		this.removeSelf();
	}

	public removefromViewPort(e:egret.Event)
	{
		super.removefromViewPort(e);
	}

	public removeSelf()
	{
		if(this&&this.parent && this.parent.contains(this))
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