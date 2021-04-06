class MapScene extends BaseScene
{
    private nodeCount:number = 0;
    private _nodeArr:MapNode[] = [];
    private map_scroller:eui.Scroller;
    private map_Group:eui.Group;
    private isShow:boolean = false;
    private mapIndex:number = 0;
    private btn_cancel:eui.Button;

    public constructor(isShow:boolean = false)
    {
        super();
        if(isShow)
        {
            this.isShow = isShow;
        }
        this.name = "MapScene"
        this.skinName = "MapSceneSkin"
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.setMap();
        this.y = 40;
    }
    
    public initData()
    {
        this.nodeCount = DataManager.Instance.getMapNodeCount(GameManager.Instance.curGameMapIndex);
    }

    public setMap()
    {
        if(this.isShow)
        {
            this.btn_cancel.visible = true;
        }
        else
        {
            this.btn_cancel.visible = false;
        }
        for(var i=0;i<this.nodeCount;i++)
        {
            var data = DataManager.Instance.getMapNodeDataById(i+"")
            var node = new MapNode(data,this.map_Group,this.isShow);
            this.map_Group.addChild(node);
            this._nodeArr.push(node);
        }
        if(GameManager.Instance.curLayer >= 4 && GameManager.Instance.curLayer <= 15)
        {
            this.map_scroller.viewport.scrollV = 1440 - (GameManager.Instance.curLayer - 3) * 110;
        }
        else if(GameManager.Instance.curLayer < 4)
        {
            this.map_scroller.viewport.scrollV = 1440;
        }
        else if(GameManager.Instance.curLayer > 15)
        {
            this.map_scroller.viewport.scrollV = 0;
        }
        egret.Tween.get(this.map_scroller).to({y:50},700,egret.Ease.sineIn);
        this.addListener(this.btn_cancel,egret.TouchEvent.TOUCH_TAP,this.removeSelf,this);
    }

    public removeSelf()
    {
        if(this&&this.parent.contains(this))
        {
            this.parent.removeChild(this);
            SceneManager.Instance.mapScene = null;
        }
    }

    public get nodeArr()
    {
        return this._nodeArr;
    }
}