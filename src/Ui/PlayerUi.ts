/**playerUi类 */
class PlayerUi extends BaseUi
{
    private img_map:eui.Image;
    private btn_option:eui.Image;
    private Label_PlayerName:eui.Label;

    private group_holdCard:eui.Group;
    private label_holdCardCount:eui.Label;

    private group_heart:eui.Group;
    private label_heart:eui.Label;
    private img_heart:eui.Image;
    private heartFilterBlur:number = 0;

    private group_coin:eui.Group;
    private img_coin:eui.Image;
    private label_coin:eui.Label;

    private label_layer:eui.Label;

    public constructor()
    {
        super();
        this.skinName = "PlayerUiSkin";
        this.name = egret.getQualifiedClassName(PlayerUi);
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.updateHoldCard();
        this.updateHeartGroup();
        this.updateCoinGroup();
        this.updateLayerLabel();
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            case MsgCMD.PLAYER_HEALTH_CHANGE:
            this.updateHeartGroup();
            break;
            case MsgCMD.PLAYER_COIN_CHANGE:
            this.updateCoinGroup();
            break;
            case MsgCMD.PLAYER_HAVECARD_CHANGE:
            this.updateHoldCard();
            break;
            case MsgCMD.PLAYER_LAYER_CHANGE:
            this.updateLayerLabel();
            break;
        }
    }

    public addEvent()
    {
        this.addMessage(MsgCMD.PLAYER_HEALTH_CHANGE,this);
        this.addMessage(MsgCMD.PLAYER_COIN_CHANGE,this);
        this.addMessage(MsgCMD.PLAYER_HAVECARD_CHANGE,this);
        this.addMessage(MsgCMD.PLAYER_LAYER_CHANGE,this);
        this.addListener(this.group_holdCard,egret.TouchEvent.TOUCH_TAP,this.openCardGroup,this);
        this.addListener(this.img_map,egret.TouchEvent.TOUCH_TAP,this.openMapUi,this);
        this.addListener(this.btn_option,egret.TouchEvent.TOUCH_TAP,this.openOptionUi,this)
    }

    /**更新持有组 */
    public updateHoldCard()
    {
        var haveCardArr = CardManager.Instance.haveCardId;
        this.group_holdCard.scaleX = this.group_holdCard.scaleY = 1;
        egret.Tween.get(this.group_holdCard).to({scaleX:1.2,scaleY:1.2},100,egret.Ease.circOut).to({scaleX:1,scaleY:1},100,egret.Ease.circIn);
        this.label_holdCardCount.text = haveCardArr.length+"";
    }

    /**更新生命组 */
    public updateHeartGroup()
    {
        var self = this;
        egret.Tween.get(this,{loop:false,onChange:this.changeHeartFilter,onChangeObj:this}).to({heartFilterBlur:25},200).to({heartFilterBlur:0},200).call(function(){
            self.group_heart.filters = [];
        })
        var curHealth = GameManager.Instance.curHealth;
        var maxHealth = GameManager.Instance.maxHealth;
        if(curHealth<=0)
        {
            curHealth = 0;
        }
        if(maxHealth<=0)
        {
            maxHealth = 0;
        }
        this.label_heart.text = curHealth+"/"+maxHealth;
    }

    public changeHeartFilter()
    {
        var glowFilter:egret.GlowFilter = new egret.GlowFilter(0xff0000,0.8,this.heartFilterBlur,this.heartFilterBlur,2,egret.BitmapFilterQuality.HIGH,false)
        this.group_heart.filters = [glowFilter];
    }

    /**更新金币组 */
    public updateCoinGroup()
    {
        this.group_coin.scaleX = this.group_coin.scaleY = 1;
        egret.Tween.get(this.group_coin).to({scaleX:1.2,scaleY:1.2},200,egret.Ease.sineIn)
        this.label_coin.text = GameManager.Instance.curCoin+"";
    }

    /**更新层数 */
    public updateLayerLabel()
    {
        this.label_layer.text = GameManager.Instance.curLayer+"";
    }

    /**打开卡组 */
    public openCardGroup()
    {
        UiManager.Instance.addUiToUiLayer(CardShowUi,false,null,999);
    }

    /**打开地图 */
    public openMapUi()
    {
        if(SceneManager.Instance.mapScene==null)
        {
            SceneManager.Instance.addMapScene(new MapScene(true));
        }
    }

    /**打开设置 */
    public openOptionUi()
    {
        UiManager.Instance.addUiToUiLayer(OptionUi,false);
    }

    /**更新玩家姓名 */
    public updatePlayerName()
    {

    }
}