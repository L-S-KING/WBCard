class OptionUi extends BaseUi
{
    private main_group:eui.Group;
    private slider_music:eui.HSlider;
    private btn_music:eui.ToggleButton;

    private label_saveQuit:eui.Label;
    private img_giveUp:eui.Image;
    private img_return:eui.Image;

    public constructor()
    {
        super();
        this.skinName = "OptionUiSkin";
        this.name = "OptionUi";
        this.main_group.scaleX = this.main_group.scaleY = 0;
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
    }

    public initData()
    {
        this.judgeMusicVolume();
        egret.Tween.get(this.main_group).to({scaleX:1,scaleY:1},400,egret.Ease.backOut);
    }

    public addEvent()
    {
        this.addListener(this.btn_music,egret.TouchEvent.TOUCH_TAP,this.musicSwitch,this);
        this.addListener(this.slider_music,egret.Event.CHANGE,this.changeMusicVolume,this);
        this.addListener(this.label_saveQuit,egret.TouchEvent.TOUCH_TAP,this.saveAndQuit,this);
        this.addListener(this.img_giveUp,egret.TouchEvent.TOUCH_TAP,this.giveUp,this);
        this.addListener(this.img_return,egret.TouchEvent.TOUCH_TAP,this.returnToGame,this);
    }

    public returnToGame()
    {
        var self = this;
        egret.Tween.get(this.main_group).to({scaleX:0,scaleY:0},400,egret.Ease.sineIn).call(self.removeSelf,self);
    }

    public saveAndQuit()
    {
        SaveManager.Instance.saveGame();
        GlobalManager.Instance.removeAllObj();
        SceneManager.Instance.setCurScene(new MainMenu());
    }

    public giveUp()
    {
        egret.localStorage.clear();
        this.removeSelf();
        GlobalManager.Instance.removeAllObj();
        SceneManager.Instance.setCurScene(new FailScene());
    }

    public removeSelf()
    {
        if(this&&this.parent&&this.parent.contains(this))
        {
            UiManager.Instance.removeUiFromLayer(this);
        }
    }


    public judgeMusicVolume()
    {
        var curVolume:number =  SoundManager.instance.getSoundVolume();
        if(curVolume<=0)
        {
            this.btn_music.selected = true;
            this.slider_music.value = 0;
        }
        else
        {
            this.btn_music.selected = false;
            this.slider_music.value = curVolume*10;
        }
    }

    public musicSwitch()
    {
        if(this.btn_music.selected)
        {
            SoundManager.instance.setSwitchSoundVolume(this.slider_music.value*0.1);
            SoundManager.instance.setSoundVolume(0);
            this.slider_music.value = 0 ;
        }
        else
        {
            var volume:number = SoundManager.instance.getSwitchSoundVolume();
            this.slider_music.value = volume*10;
            SoundManager.instance.setSoundVolume(volume);
        }
    }

    public changeMusicVolume()
    {
        var volume:number = this.slider_music.value*0.1;
        SoundManager.instance.setSoundVolume(volume);
        if(volume <=0)
        {
            this.btn_music.selected = true;
        }
        else
        {
            this.btn_music.selected = false;
        }
    }
}