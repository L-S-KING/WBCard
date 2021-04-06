class RelicManager 
{
    private static _instance:RelicManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new RelicManager();
        }
        return this._instance;
    }

    private _relicNameArr:any[] = [BirdUrn,BlackBlood,BombEgg,ClericFace,CoffeeDripper,Ginger,GremlinHorn,IceCream,LizardTail,Marbles,Orichalcum,
                                    Pantograph,PaperFrog,RedSkull,Shovel,SnakeSkull,SneckoEye,SpiritPoop,Strawberry];
    private haveRelicId:number[] = [];
    private relicArr:BaseRelic[] = [];
    private selectRelic:BaseRelic[] = [];
    private _canSelectRelicCount:number = 1;

    public clearData()
    {
        this.haveRelicId = [];
        for(var i=0;i<this.relicArr.length;i++)
        {
            if(this.relicArr[i]&&this.relicArr[i].parent&&this.relicArr[i].parent.contains(this.relicArr[i]))
            {
                this.relicArr[i].parent.removeChild(this.relicArr[i]);
                this.relicArr.splice(i,1);
                i--;
            }
        }
        this.relicArr = [];
        for(var i=0;i<this.selectRelic.length;i++)
        {
            if(this.selectRelic[i]&&this.selectRelic[i].parent&&this.selectRelic[i].parent.contains(this.selectRelic[i]))
            {
                this.selectRelic[i].parent.removeChild(this.selectRelic[i]);
                this.selectRelic.splice(i,1);
                i--;
            }
        }
        this.selectRelic = [];
        this._canSelectRelicCount = 1;
    }

    public get playerHaveRelicIdArr()
    {
        return this.haveRelicId;
    }

    public set playerHaveRelicIdArr(value:number[])
    {
        this.haveRelicId = value;
    }

    public get relicNameArr()
    {
        return this._relicNameArr
    }

    public get RelicArr()
    {
        return this.relicArr;
    }

    public get canSelectRelicCount()
    {
        return this._canSelectRelicCount;
    }

    public set canSelectRelicCount(value:number)
    {
        this._canSelectRelicCount = value;
    }

    /**添加装备到玩家 */
    public addRelicToPlayer():BaseRelic
    {
        if(this.haveRelicId.length>=this._relicNameArr.length)
        {
            TipsManager.Instance.createTips("遗物获得上限")
            return;
        }

        var index = Math.floor(Math.random()*this.relicNameArr.length);
        while(this.haveRelicId.indexOf(index)>=0)
        {
            index = Math.floor(Math.random()*this.relicNameArr.length);
        }
        var clsName = this.relicNameArr[index];
        var data = DataManager.Instance.getRelicDataByKey(egret.getQualifiedClassName(clsName))
        var relic = new clsName(data,true);
        GlobalManager.Instance.addToLayer(relic,LayerType.ui,5); 
        return relic;
    }

    public addRelicToPlayerById(id:number)
    {
        
        if(this.haveRelicId.length>=this._relicNameArr.length)
        {
            TipsManager.Instance.createTips("遗物获得上限")
            return;
        }

        var clsName = this.relicNameArr[id];
        var data = DataManager.Instance.getRelicDataByKey(egret.getQualifiedClassName(clsName))
        var relic = new clsName(data,true);
        GlobalManager.Instance.addToLayer(relic,LayerType.ui,5); 
        return relic;
    }

    /**添加选择装备 */
    public createSelectRelic():BaseRelic
    {
        if(this.haveRelicId.length>=this._relicNameArr.length)
        {
            TipsManager.Instance.createTips("遗物获得上限")
            return;
        }

        var index = Math.floor(Math.random()*this.relicNameArr.length);
        while(this.haveRelicId.indexOf(index)>=0)
        {
            index = Math.floor(Math.random()*this.relicNameArr.length);
        }
        var clsName = this.relicNameArr[index];
        var data = DataManager.Instance.getRelicDataByKey(egret.getQualifiedClassName(clsName))
        var relic = new clsName(data,false);
        GlobalManager.Instance.addToLayer(relic,LayerType.ui,5); 
        return relic;
    }

    public randomGetRelicCls()
    {
        if(this.haveRelicId.length>=this._relicNameArr.length)
        {
            TipsManager.Instance.createTips("遗物获得上限")
            return;
        }

        var index = Math.floor(Math.random()*this.relicNameArr.length);
        while(this.haveRelicId.indexOf(index)>=0)
        {
            index = Math.floor(Math.random()*this.relicNameArr.length);
        }
        var clsName = this.relicNameArr[index];
        return clsName;
    }

    public getRelicArr()
    {
        return this.relicArr;
    }

    /**添加一个装备到玩家持有数组 */
    public pushRelicToArr(relic:BaseRelic)
    {
        if(this.haveRelicId.length>=this._relicNameArr.length)
        {
            TipsManager.Instance.createTips("遗物获得上限")
            return;
        }

        this.relicArr.push(relic);
        this.haveRelicId.push(relic.id);
        var posX = 20 + (this.relicArr.length-1) * 30;
        var posY = 30;
        Message.instance.send(MsgCMD.ITEM_GET,relic.name)
        egret.Tween.get(relic).to({x:posX,y:posY,scaleX:1,scaleY:1},300,egret.Ease.sineIn);
    }

    /**添加装备 */
    public addRelic(cls:any)
    {
        if(this.haveRelicId.length>=this._relicNameArr.length)
        {
            TipsManager.Instance.createTips("遗物获得上限")
            return;
        }

        if(cls)
        {
            var key = egret.getQualifiedClassName(cls);
            var data = DataManager.Instance.getRelicDataByKey(key);
            var relic = new cls(data,true);
            GlobalManager.Instance.addToLayer(relic,LayerType.ui,5); 
        }
    }
}