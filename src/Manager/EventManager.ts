class EventManager
{
    private static _instance:EventManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    public tapCount:number = 0;

    public AttackEventArr:any[] = [AdventurerCorpse,MaskedRobber,MysteriousBall];
    public SpEventArr:any[] = [CursedBook,ForgottenAltar,TransformingShrines,WindingCorridor,HarvestDayEvent,MucousWorld,TombEvent,Nest,PriestEvent];
    public DamnationEventArr:any[]=[CursedBook,ForgottenAltar,HarvestDayEvent,MaskedRobber,MucousWorld,MysteriousBall];
    public randomAddEventScene()
    {
       if(egret.localStorage.getItem("userData"))
        {
            var userData:IUserData =  SaveManager.Instance.loadGame();
            this.tapCount=userData.tap;
        }
        this.tapCount++;
        SaveManager.Instance.saveGame();
        if(this.tapCount>2)
        {
            var index = Math.floor(Math.random()*this.DamnationEventArr.length);
            var clsName = this.DamnationEventArr[index];
            var spEvent1 = new clsName();
            GlobalManager.Instance.addToLayer(spEvent1,LayerType.scene);
        }
        else
        {
            if(Math.random()<0.3)
            {
                var index = Math.floor(Math.random()*this.AttackEventArr.length);
                var clsName = this.AttackEventArr[index];
                var attackEvent = new clsName();
                GlobalManager.Instance.addToLayer(attackEvent,LayerType.scene);
            }
            else
            {
                var index = Math.floor(Math.random()*this.SpEventArr.length);
                var clsName = this.SpEventArr[index];
                var spEvent = new clsName();
                GlobalManager.Instance.addToLayer(spEvent,LayerType.scene);
            }
        }
    }
}