class UiManager 
{
    private static _instance:UiManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new UiManager();
        }
        return this._instance;
    }

    private uiList:any[] = [];

    public addRectBg(uiName:string):eui.Rect
    {
        var width:number = GameConst.stage.stageWidth;
        var height:number = GameConst.stage.stageHeight;
        var rect:eui.Rect = new eui.Rect(width,height,0x000000);
        rect.name = "uiRect"+uiName;
        rect.alpha = 0;
        return rect;
    }

    public addUiToUiLayer(className,showBg:boolean,data?:any,depth?:number)
    {
        var uiName:string =  egret.getQualifiedClassName(className);
        if(!uiName)
        {
            //egret.error("类名为空，类名输入错误")
            return;
        }

        if(showBg)
        {
            var bg = this.addRectBg(uiName);
            GlobalManager.Instance.addToLayer(bg,LayerType.ui,0);
        }

        var ui = new className(data);

        if(ui&&!ui.parent)
        {
            GlobalManager.Instance.addToLayer(ui,LayerType.ui,depth);
            if(showBg)
            {
                egret.Tween.get(bg).to({alpha:0.7},100,egret.Ease.sineOut)
            }
            this.uiList.push(ui);
        }
    }

    public removeUiFromLayer(ui:BaseUi)
    {
        if(this.uiList.indexOf(ui)>=0)
        {
            GlobalManager.Instance.removeObjFromLayer(ui,LayerType.ui);
            var layer = GlobalManager.Instance.getLayer(LayerType.ui);
            var rectBg = layer.getChildByName("uiRect"+ui.name);
            GlobalManager.Instance.removeObjFromLayer(rectBg,LayerType.ui);
        }
    }
}