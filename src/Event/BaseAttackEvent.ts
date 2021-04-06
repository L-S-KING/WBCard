class BaseAttackEvent extends BaseScene
{
	protected attackBg:eui.Image;						//背景图片		
	protected chat:eui.Label;							//对话
	protected buttonUp:eui.Button;						//上面按钮
	protected buttonDown:eui.Button;					//下面按钮
	protected clicks:number = 0;						//点击次数
	protected player:eui.Image;							//玩家
	protected img:eui.Image;							//npc图片

	public constructor() 
	{
		super();
		this.skinName = "AttackEvent";
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
		this.addListener(this.buttonUp, egret.TouchEvent.TOUCH_BEGIN, this.buttonUpTap, this);
		this.addListener(this.buttonDown, egret.TouchEvent.TOUCH_BEGIN, this.buttonDownTap, this);
	}

	public buttonUpTap()
	{

	}

	public buttonDownTap()
	{

	}

	public removeSelf()
	{
		if(this&&this.parent != null)
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