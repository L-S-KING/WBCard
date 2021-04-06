class UtilManager
{
    private static _instance:UtilManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new UtilManager();
        }
        return this._instance;
    }

    /**
     * 特效类，data的
     * x,y:位置
     * img:图片资源路径
     * type:类型
     */
    public createVfx(data:any,depth?:number)
    {
        var vfx = new Vfx(data);
        GlobalManager.Instance.addToLayer(vfx,LayerType.effect,depth);
    }
}