/**休息处可以回复玩家25%的血量 */
class RestScene extends BaseScene
{
	public rest_btn:eui.Button;
	public go_group:eui.Group;
	public go_btn:eui.Button;
	public whiteRect:eui.Rect;
	public constructor() 
	{
		super();
		this.skinName = "RestSceneSkin";
	}

	public addToViewPort(e:egret.Event)
	{
		super.addToViewPort(e);
		this.addEvent();
		this.rest_btn.enabled = true;
		this.go_group.visible = true;
		this.isUseRest();
	}

	public isUseRest()
	{
		var player = CharacterManager.Instance.player;
		//判断是否有咖啡滤杯，如果有则不能休息。
		for(var i=0;i<RelicManager.Instance.RelicArr.length;i++)
		{
			if(RelicManager.Instance.RelicArr[i].name == "CoffeeDripper")
			{
				// this.rest_btn.visible = false;
				this.rest_btn.enabled = false;
				return;
			}
			else
			{
				this.rest_btn.visible = true;
				this.rest_btn.enabled = true;
			}
		}
	}

	//接收消息
    recvMsg(cmd:number, data:any)
    {

    }

	public addEvent()
	{
		this.addListener(this.rest_btn,egret.TouchEvent.TOUCH_BEGIN,this.rest,this);
		this.addListener(this.go_btn,egret.TouchEvent.TOUCH_BEGIN,this.goNext,this);
	}

	public rest()
	{
		var self = this;
		//玩家回复25%的生命值
		var value = GameManager.Instance.maxHealth
		GameManager.Instance.curHealth += (Math.floor(value*0.25));
		this.whiteRect.visible = true;
		self.rest_btn.enabled = false;
		egret.Tween.get(this.whiteRect).to({alpha:0},800,egret.Ease.quartIn).call(show)
		function show()
		{
			self.whiteRect.visible = false;

			self.removeSelf()
		}
	}

	public goNext()
	{
		egret.Tween.get(this).to({alpha:0},800).call(this.removeSelf);
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