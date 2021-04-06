class PlayerSelectScene extends BaseScene
{
    private playerIndex:number = 0;
    private radioBtn:eui.RadioButton;
    private role_bg:eui.Image;
    private roleHealth:number[] = [85,70,90];
    private roleRefilc:any[] = [BlackBlood,IceCream,Orichalcum]
    private roleTextureHand:string[] = ["man_","Asu000_0","ichi_"]
    private roleAnimImgCount:number[] = [9,8,12]
    private label_heart:eui.Label;
    private label_reflic:eui.Label;
    private img_refilc:eui.Image;
    private btn_ok:eui.Button;

    public constructor()
    {
        super();
        this.skinName = "PlayerSelectSceneSkin";
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.addEvent();
    }

    public initData()
    { 
        this.playerIndex = 0;
        this.roleHealth = [85,70,90];
        this.roleRefilc = [BlackBlood,IceCream,Orichalcum]
        this.roleTextureHand = ["man_","Asu000_0","ichi_"]
        this.roleAnimImgCount = [9,8,12]
    }

    public addEvent()
    {
        this.addListener(this.radioBtn.group,eui.UIEvent.CHANGE,this.select,this);
        this.addListener(this.btn_ok,egret.TouchEvent.TOUCH_TAP,this.gameStart,this);
    }

    public select(e:eui.UIEvent)
    {
       var radioGroup =  e.target as eui.RadioButtonGroup;
       if(RES.getRes("role_"+radioGroup.selectedValue+"_bg_png"))
       {
           this.role_bg.source = "role_"+radioGroup.selectedValue+"_bg_png";
       }
       else
       {
           this.role_bg.source = null;
       }
       this.label_heart.text = this.roleHealth[radioGroup.selectedValue]+"/"+this.roleHealth[radioGroup.selectedValue];
       var refilcName = egret.getQualifiedClassName(this.roleRefilc[radioGroup.selectedValue]);
       var data = DataManager.Instance.getRelicDataByKey(refilcName);
       this.label_reflic.text = data.detail;
       this.img_refilc.source = data.img;
       this.playerIndex = radioGroup.selectedValue;
    }

    public gameStart()
    {
        EventManager.Instance.tapCount = 0;
       if(egret.localStorage.getItem("userData"))
        {
            var userData:IUserData =  SaveManager.Instance.loadGame();
            userData.tap = 0;
        }
        SaveManager.Instance.saveGame();
        GameManager.Instance.floor = 0;
        GameManager.Instance.ordinary = 0;
        GameManager.Instance.elite = 0;
        GameManager.Instance.boss = 0;
        var that = this;
        GameManager.Instance.maxHealth = that.roleHealth[that.playerIndex];
        GameManager.Instance.curHealth = that.roleHealth[that.playerIndex];
        CharacterManager.Instance._curPlayerTextureHand = that.roleTextureHand[that.playerIndex];
        CharacterManager.Instance.playerImgAnimCount = that.roleAnimImgCount[that.playerIndex];
        GameManager.Instance.curCoin = 99;
        GameManager.Instance.clearMapId = [];
        RelicManager.Instance.clearData();
        CardManager.Instance.haveCardId = [1,1,1,1,1,2,2,2,2];
        var data = CardManager.Instance.randomGetCardData();
        while(data.id==1||data.id==2)
        {
            var data = CardManager.Instance.randomGetCardData();
        }
        CardManager.Instance.haveCardId.push(data.id);
        GameManager.Instance.gameStart();
        RelicManager.Instance.addRelic(that.roleRefilc[that.playerIndex]);
        this.parent.removeChild(this);

    }
}