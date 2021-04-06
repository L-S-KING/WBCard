class RelicSelectUi extends BaseModule
{
    private data:any;
    private img_relic:eui.Image;
    private label_detail:eui.Label;
    private label_detailName:eui.Label;
    private btn_cancel:eui.Button;
    private btn_ok:eui.Button;
    private relic:BaseRelic = null;

    public constructor(data?:any)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        this.skinName = "RelicSelectUiSkin";
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.setImgIcon();
        this.addEvent();
    }

    public setImgIcon()
    {
        this.img_relic.source = this.data.img;
        this.label_detail.text = this.data.detail;
        this.label_detailName.text = this.data.detailName;
        this.relic = this.data.relic;
    }

    public addEvent()
    {
        this.addListener(this.btn_cancel,egret.TouchEvent.TOUCH_TAP,this.removeSelf,this);
        this.addListener(this.btn_ok,egret.TouchEvent.TOUCH_TAP,this.ok,this);
    }

    public ok()
    {
        if(this.relic)
        {
            this.relic.selectRelic();
        }
        else if(this.data.clsName)
        {
            if(this.data.coin)
            {
                if(this.data.coin>GameManager.Instance.curCoin)
                {
                    TipsManager.Instance.createTips("金币不足")
                    return;
                }
                else
                {
                    GameManager.Instance.curCoin -= this.data.coin;
                    RelicManager.Instance.addRelic(this.data.clsName);
                    Message.instance.send(MsgCMD.RELIC_SELECT_OVER,this.data);
                }
            }
            else
            {
                RelicManager.Instance.addRelic(this.data.clsName);
                Message.instance.send(MsgCMD.RELIC_SELECT_OVER,this.data);
            }
        }
        this.removeSelf();
    }

    public removeSelf()
    {
        if(this&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
        }
    }
}