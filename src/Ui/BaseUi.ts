class BaseUi extends BaseModule
{
    protected data:any;
    public constructor(data?:any,skinName?:string)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        if(skinName)
        {
            this.skinName = skinName;
        }
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.setImgIcon();
        this.addEvent();
    }

    public initData()
    {

    }

    public setImgIcon()
    {

    }

    public addEvent()
    {

    }
}