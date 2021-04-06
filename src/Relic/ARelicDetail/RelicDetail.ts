class RelicDetail extends BaseModule
{
    private data:any;
    private img_relic:eui.Image;
    private label_detail:eui.Label;
    private btn_left:eui.Image;
    private btn_right:eui.Image;
    private label_detailName:eui.Label;
    private relicIndex:number = 0;
    private btn_cancel:eui.Button;

    public constructor(data?:any)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        this.skinName = "RelicDetailSkin";
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
        this.relicIndex = this.data.index;
    }

    public addEvent()
    {
        this.addListener(this.btn_left,egret.TouchEvent.TOUCH_BEGIN,this.changeRelic,this);
        this.addListener(this.btn_right,egret.TouchEvent.TOUCH_BEGIN,this.changeRelic,this);
        this.addListener(this.btn_cancel,egret.TouchEvent.TOUCH_TAP,this.removeSelf,this);
    }

    public changeRelic(e:egret.TouchEvent)
    {
        if(e.target == this.btn_left)
        {
            if(this.relicIndex>0)
            {
                this.data = RelicManager.Instance.RelicArr[this.relicIndex-1].getRelicData();
                this.setImgIcon();
            }
        }
        else if(e.target == this.btn_right)
        {
            if(this.relicIndex<RelicManager.Instance.RelicArr.length-1)
            {
                this.data = RelicManager.Instance.RelicArr[this.relicIndex+1].getRelicData();
                this.setImgIcon();
            }
        }
    }

    public removeSelf()
    {
        if(this&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
        }
    }
}