class SceneManager
{
    private static _instance:SceneManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new SceneManager();
        }
        return this._instance;
    }

    private _curScene:BaseScene = null;
    private _abandonScene:AbandonScene = null;
    private _mapScene:MapScene = null;
    
    public get curScene()
    {
        if(this._curScene)
        {
            return this._curScene;
        }
        else
        {
            //egret.error("当前场景为空");
        }
    }

    public setCurScene(scene:BaseScene)
    {
        if(this._curScene)
        {
            GlobalManager.Instance.removeObjFromLayer(this._curScene,LayerType.scene);
            this._curScene = null;
        }
        this._curScene = scene;
        GlobalManager.Instance.addToLayer(scene,LayerType.scene);
    }

    public removeCurScene()
    {
        if(this._curScene)
        {
            this._curScene.parent.removeChild(this._curScene);
            this._curScene = null;
        }
    }

    public set abandonScene(scene:AbandonScene)
    {
        this._abandonScene = scene;
    }

    public get getAbandonScene():AbandonScene
    {
        return this._abandonScene;
    }

    public addMapScene(scene:MapScene)
    {
        if(this._mapScene)
        {
            GlobalManager.Instance.removeObjFromLayer(this._mapScene,LayerType.ui);
            this._mapScene = null;
        }
        this._mapScene = scene;
        GlobalManager.Instance.addToLayer(scene,LayerType.ui);
    }

    public get mapScene()
    {
        return this._mapScene;
    }

    public set mapScene(value:MapScene)
    {
        this._mapScene = value;
    }
}