class GlobalManager
{
    private static _instance:GlobalManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new GlobalManager();
        }
        return this._instance;
    }

    private _rootLayer:eui.UILayer = null;
    private curScene:BaseScene = null;
    private sceneLayer:BaseLayer = null;
    private effectLayer:BaseLayer = null;
    private uiLayer:BaseLayer = null;
    private tipsLayer:BaseLayer = null;
    
    public setRootLayer(layer:eui.UILayer)
    {
        this._rootLayer = layer;
    }

    public get rootLayer()
    {
        return this._rootLayer;
    }
    public initLayer(stage:egret.Stage)
    {
        GameConst.stage = stage;
        this.sceneLayer = new BaseLayer();
        this.effectLayer = new BaseLayer();
        this.uiLayer = new BaseLayer();
        this.tipsLayer = new BaseLayer();
        stage.addChild(this.sceneLayer);
        stage.addChild(this.uiLayer);
        stage.addChild(this.effectLayer);
        stage.addChild(this.tipsLayer); 
        this.uiLayer.touchEnabled = false;
        this.uiLayer.touchChildren = true;
        this.uiLayer.touchThrough = true;
        this.effectLayer.touchEnabled = false;
        this.effectLayer.touchThrough = true;
        this.effectLayer.touchChildren = false;
        this.tipsLayer.touchEnabled = false;
        this.tipsLayer.touchThrough = true;
        this.tipsLayer.touchChildren = false;
    }

    public addToLayer(obj:egret.DisplayObject,layerType:LayerType,depth?:number)
    {
        var layer:BaseLayer = null;
        switch(layerType)
        {
            case LayerType.scene:
                layer = this.sceneLayer;
            break;
            case LayerType.effect:
                layer = this.effectLayer;
            break;
            case LayerType.ui:
                layer = this.uiLayer;
            break;
            case LayerType.tips:
                layer = this.tipsLayer;
            break;
        }
        if(depth>=0)
        {
            layer.addChildAt(obj,depth);
        }
        else
        {
            layer.addChild(obj);
        }
    }

    public removeObjFromLayer(obj:egret.DisplayObject,type:LayerType)
    {
        var layer:BaseLayer = null;
        switch(type)
        {
            case LayerType.scene:
                layer = this.sceneLayer;
            break;
            case LayerType.effect:
                layer = this.effectLayer;
            break;
            case LayerType.ui:
                layer = this.uiLayer;
            break;
            case LayerType.tips:
                layer = this.tipsLayer;
            break;
        }
        if(layer.contains(obj))
        {
            layer.removeChild(obj);
        }
    }

    public getLayer(type:LayerType)
    {
        var layer:BaseLayer = null;
        switch(type)
        {
            case LayerType.scene:
                layer = this.sceneLayer;
            break;
            case LayerType.effect:
                layer = this.effectLayer;
            break;
            case LayerType.ui:
                layer = this.uiLayer;
            break;
            case LayerType.tips:
                layer = this.tipsLayer;
            break;
        }
        if(layer)
        {
            return layer;
        }
        else
        {
            //egret.error("指定layer类型错误")
        }
    }

    public removeAllObj()
    {
        while(this.sceneLayer.numChildren>0)
        {
            this.sceneLayer.removeChild(this.sceneLayer.getChildAt(0));
        }

        while(this.uiLayer.numChildren>0)
        {
            this.uiLayer.removeChild(this.uiLayer.getChildAt(0));
        }

        while(this.tipsLayer.numChildren>0)
        {
            this.tipsLayer.removeChild(this.tipsLayer.getChildAt(0));
        }
        
        while(this.effectLayer.numChildren>0)
        {
            this.effectLayer.removeChild(this.effectLayer.getChildAt(0));
        }
    }
}

enum LayerType{
    scene,
    effect,
    ui,
    tips
}