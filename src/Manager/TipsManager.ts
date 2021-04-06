class TipsManager
{
    private static _instance:TipsManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new TipsManager();
        }
        return this._instance;
    }

    public tipsArr:Tips[] = [];

    public createTips(text:string)
    {
        var tips:Tips = new Tips(text);
        egret.MainContext.instance.stage.addChild(tips);
        if(this.tipsArr.length>0)
        {
            for(var i=0;i<this.tipsArr.length;i++)
            {
                this.tipsArr[i].y = this.tipsArr[i].y - 30;
            }
            
        }
        tips.y = 300;
        this.tipsArr.push(tips);
    }
    
    public removeTips(obj)
    {
        if(obj)
        {
            var index = this.tipsArr.indexOf(obj);
            this.tipsArr[index].parent.removeChild(this.tipsArr[index]);
            this.tipsArr.splice(index,1);
        }
    }

    /**伤害，治疗显示数字
     * data:value:伤害或治疗量
     * type：类型，0为伤害数字，1为治疗数字
     * x，y：位置
     */
    public createViewNumber(data:any)
    {
        var numberText = new ViewNumber(data);
        GlobalManager.Instance.addToLayer(numberText,LayerType.tips);
    }
}