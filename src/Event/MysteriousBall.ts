/**
 * 神秘圆球
 * 战斗奖励稀有遗物或者离开
 * 刘双
 */
class MysteriousBall extends BaseAttackEvent
{
	public constructor() 
	{
		super();
	}

	public initData()
	{
		//得到玩家
		this.player.source = CharacterManager.Instance._curPlayerTextureHand+"0_png";
		this.img.source = "ball_png";
		this.img.x = 640;
		this.img.y = 240;
		this.buttonUp.label = "[打开圆球] 战斗。	奖励：稀有遗物";
		this.buttonDown.label = "[离开]";
		this.chat.text = "在四周混乱的地形中间，一个骨质圆球伫立在地上，似乎包裹着一样神秘的发光物体。你很好奇里面有什么东西，但你注意到周围有一些哨兵在看守。";
	}

	public buttonUpTap()
	{
		this.buttonUp.alpha = 0;
		this.buttonUp.touchEnabled = false;
		this.buttonDown.label = "[战斗]";
		this.chat.text = "你刚一砸开圆球，那些看守就立即动了起来！";
	}

	public buttonDownTap()
	{
		if(this.buttonUp.touchEnabled == false && this.clicks <= 0)
		{
			SceneManager.Instance.setCurScene(new GameScene({id:37}))
            UiManager.Instance.addUiToUiLayer(GameSceneCardUi,false)
            Message.instance.send(MsgCMD.PLAYER_ROUND_START);
			if(this&&this.parent != null)
			{
				this.parent.removeChild(this);
			}
		}
		else
		{
			this.clicks++;
			if(this.clicks == 1)
			{
				this.buttonUp.alpha = 0;
				this.buttonUp.touchEnabled = false;
				this.chat.text = "做人不能太贪。";
			}
			else
			{
				this.removeSelf();
			}
		}
	}
}