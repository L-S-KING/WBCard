class MainMenu extends BaseScene
{
    private btn_continue:eui.Button;
    private btn_start:eui.Button;
    private btn_end:eui.Button;
    private isHaveSaveData;
    private label_tips:eui.Label;

    public constructor()
    {
        super();
        this.skinName = "MainMenuSceneSkin";
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.addEvent();
    }

    public initData()
    {
        egret.Tween.get(this.label_tips,{loop:true}).to({alpha:0},1000).to({alpha:0.4},1000);
        this.isHaveSaveData = SaveManager.Instance.loadGame();
        if(!this.isHaveSaveData)
        {
            this.btn_continue.visible = false;
        }
    }

    public addEvent()
    {
        this.addListener(this.btn_start,egret.TouchEvent.TOUCH_TAP,this.gameStart,this);
        this.addListener(this.btn_continue,egret.TouchEvent.TOUCH_TAP,this.gameContinue,this);
        this.addListener(this.btn_end,egret.TouchEvent.TOUCH_TAP,this.endGame,this);
    }

    public gameStart()
    {
        egret.localStorage.clear();
        SceneManager.Instance.setCurScene(new PlayerSelectScene());
    }

    public gameContinue()
    {
        GameManager.Instance.gameContinue();
        this.removeSelf();
    }

    public endGame()
    {
        window.close();
    }

    public removeSelf()
    {
        if(this&&this.parent&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
        }
    }
}