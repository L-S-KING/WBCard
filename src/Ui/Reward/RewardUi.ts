enum RewardType{
    normal,
    card,
    relic
}
class RewardUi extends BaseModule
{
    private data:any;
    private rewardCount:number = 0;
    private rewardType:RewardType = null;
    private reward_group:eui.Group;
    private main_group:eui.Group;
    private isRemove:boolean = false;
    private btn_jump:eui.Button;

    public constructor(data?:any,rewardType = RewardType.normal)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        this.rewardType = rewardType;
        this.skinName = "RewardUiSkin";
        this.main_group.y = -720;
        
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.setReward();
        this.addEvent();
    }

    public initData()
    {
        egret.Tween.get(this.main_group).to({y:0},1300,egret.Ease.backOut);
        egret.Tween.get(this.btn_jump).to({x:1100},1300,egret.Ease.backOut);
    }

    public addEvent()
    {
        this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
        this.addListener(this.btn_jump,egret.TouchEvent.TOUCH_TAP,this.removeSelf,this);
    }

    public setReward()
    {
        switch(this.rewardType)
        {
            case RewardType.normal:
            this.setCoinReward();
            this.setCardReward();
            switch(GameManager.Instance.curLevelType)
            {
                case 1:
                this.setRelicReward();
                break;
                case 2:
                this.setRelicReward();
                break;
            }
            break;
        }
    }

    public setCoinReward()
    {
        var item = new RewardItem(RewardItemType.coin);
        this.reward_group.addChild(item);
    }

    public setCardReward()
    {
        var item = new RewardItem(RewardItemType.card);
        this.reward_group.addChild(item);
    }

    public setRelicReward()
    {
        var item = new RewardItem(RewardItemType.refilc);
        this.reward_group.addChild(item);
    }

    public update()
    {
        if(this.reward_group.numChildren<=0)
        {
            if(!this.isRemove)
            this.removeSelf();
        }
    }

    public removeSelf()
    {
        EventManager.Instance.tapCount = 0;
        if(egret.localStorage.getItem("userData"))
        {
            var userData:IUserData =  SaveManager.Instance.loadGame();
            userData.tap = 0;
        }
        SaveManager.Instance.saveGame();
        this.isRemove = true;
        var self = this;
        this.main_group.touchEnabled = false;
        this.main_group.touchChildren = false;
        egret.Tween.get(this.btn_jump).to({x:2000},800,egret.Ease.quintIn);
        egret.Tween.get(this.main_group).to({y:-720},800,egret.Ease.quintIn).call(function(){
            self.remove();
        });
    }
    public remove()
    {
        if(this&&this.parent&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
            this.changeMapScene(null);
        }
    }

    public changeMapScene(e:egret.TouchEvent)
    {
        if(GameManager.Instance.curLevelType == 2)
        {
            GameManager.Instance.gameClear();
        }
        else
        {
            GameManager.Instance.addClearNodeToArr();
            SceneManager.Instance.removeCurScene();
            SceneManager.Instance.addMapScene(new MapScene());
        }
    }
}