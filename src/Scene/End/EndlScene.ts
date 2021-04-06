class EndScene extends BaseScene
{
	protected title:eui.Label;				//标题

	private floorNum:eui.Label;				//攀爬楼层文本框
	protected floorCount:number = 0;
	private floorScore:eui.Label;			//攀爬楼层分数文本框
	protected floorGrade:number = 0;

	private ordinaryNum:eui.Label;			//击杀普通怪个数文本框
	protected ordinaryCount:number = 0;
	private ordinaryScore:eui.Label;		//击杀普通怪分数文本框
	protected ordinaryGrade:number = 0;

	private eliteNum:eui.Label;				//击杀精英怪个数文本框
	protected eliteCount:number = 0;
	private eliteScore:eui.Label;			//击杀精英怪分数文本框
	protected eliteGrade:number = 0;

	private bossNum:eui.Label;				//击杀boss个数文本框
	protected bossCount:number = 0;
	private bossScore:eui.Label;			//击杀boss分数文本框
	protected bossGrade:number = 0;

	private totalScore:eui.Label;			//总分数
	protected totalGrade:number = 0;

	protected mainMenu:eui.Button;			//主菜单按钮


	public constructor() 
	{
		super();
		egret.localStorage.clear();
		this.skinName = "EndSceneSkin";
		this.alpha = 0;
	}

	public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.addEvent();
		this.initData();
    }

	public initData()
	{
		this.floorCount = GameManager.Instance.floor;
		this.floorNum.text = "（" + this.floorCount + "）";
		this.floorGrade = this.floorCount * 5;
		this.floorScore.text = "" + this.floorGrade;

		this.ordinaryCount = GameManager.Instance.ordinary;
		this.ordinaryNum.text = "（" + this.ordinaryCount + "）";
		this.ordinaryGrade = this.ordinaryCount * 10;
		this.ordinaryScore.text = "" + this.ordinaryGrade;

		this.eliteCount = GameManager.Instance.elite;
		this.eliteNum.text = "（" + this.eliteCount + "）";
		this.eliteGrade = this.eliteCount * 20;
		this.eliteScore.text = "" + this.eliteGrade;

		this.bossCount = GameManager.Instance.boss;
		this.bossNum.text = "（" + this.bossCount + "）";
		this.bossGrade = this.bossCount * 50;
		this.bossScore.text = "" + this.bossGrade;
		
		this.totalGrade = this.floorGrade + this.ordinaryGrade + this.eliteGrade + this.bossGrade;
		this.totalScore.text = "" + this.totalGrade;
	}

	public addEvent()
	{
		
		egret.Tween.get(this).to({alpha:1},500,egret.Ease.sineIn)
		this.addListener(this.mainMenu, egret.TouchEvent.TOUCH_TAP, this.backMenu, this);
	}

	public backMenu()
	{
		SceneManager.Instance.setCurScene(new MainMenu());
	}
}