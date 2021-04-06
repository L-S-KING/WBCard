/**
 * 冒险者尸体
 * 寻找东西可能遇到回来的怪物
 * 刘双
 */
class AdventurerCorpse extends BaseAttackEvent
{
	public constructor() 
	{
		super();
	}

	public initData()
	{
		//得到玩家
		this.player.source = CharacterManager.Instance._curPlayerTextureHand+"0_png";

		this.img.source = "nopants_png";
		this.buttonUp.label = "[搜索]	寻找东西。	25%遇见回来的怪物";
		this.buttonDown.label = "[离开]";
		this.chat.text = "你发现地上有一具冒险者尸体。它的裤子都被偷了！而且看起来被一个生物戳伤和踩踏过。尽管他随身携带的东西好像都在，你实在是不知道这里发生了什么······";
	}

	public buttonUpTap()
	{
		this.clicks ++;
		var value:number = Math.random();
		if(value > 0.25 && this.clicks == 1)
		{
			var randomNum:number = Math.random();
			if(randomNum >= 0.5)
			{
				this.chat.text = "你找到了一些金币！要继续找吗";
				var gold:number = Math.random() * 50 + 50;
				GameManager.Instance.curCoin += gold;
			}
			else
			{
				this.chat.text = "什么都没找到······	要继续找吗？";
			}
			this.buttonUp.label = "[搜索]	寻找东西。	50%遇见回来的怪物";
		}
		if(value > 0.5 && this.clicks == 2)
		{
			this.buttonUp.label = "[搜索]	寻找东西。	75%遇见回来的怪物";
			var a:number = Math.random();
			if(a > 0.5)
			{
				this.chat.text = "你找到了一些金币！要继续找吗";
				var gold:number = Math.random() * 100 + 50;
				GameManager.Instance.curCoin += gold;
			}
			else
			{
				this.chat.text = "你找到了一件遗物！要继续找吗";
				//获得遗物
				RelicManager.Instance.addRelicToPlayer();
			}
		}
		if(value > 0.75 && this.clicks == 3)
		{
			this.chat.text = "看来你成功翻遍了他的所有衣物，什么事也没有发生！";
			this.buttonUp.alpha = 0;
			this.buttonUp.touchEnabled = false;
			this.buttonDown.label = "[离开]";
			this.end = true;
		}
		else if((value <= 0.25 && this.clicks == 1) || (value <= 0.5 && this.clicks == 2) || (value <= 0.75 && this.clicks == 3))
		{
			this.chat.text = "在搜刮冒险者时你被偷袭了。";
			this.buttonUp.alpha = 0;
			this.buttonUp.touchEnabled = false;
			this.buttonDown.label = "[战斗]";
		}
	}

	private end:boolean = false;

	public buttonDownTap()
	{
		if(this.buttonUp.touchEnabled == false && this.end == false)
		{
			SceneManager.Instance.setCurScene(new GameScene({id:36}))
            UiManager.Instance.addUiToUiLayer(GameSceneCardUi,false)
            Message.instance.send(MsgCMD.PLAYER_ROUND_START);
			if(this&&this.parent != null)
			{
				this.parent.removeChild(this);
			}
		}
		else
		{
			this.removeSelf();
		}
	}
}