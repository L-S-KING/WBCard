class TrapLineConfig extends BaseConfig
{
	private static _instance:TrapLineConfig;

	public static get instnace():TrapLineConfig
	{
		if( this._instance == null )
		{
			this._instance = new TrapLineConfig();
		}
		return this._instance;
	}

	private dataList:TrapLineConfigModel[];
	public constructor()
	{
		super();
	}

	public initLevelData(value:number):void{

		this.dataList = [];
		super.init( "trap_"+value+"_txt" , TrapLineConfigModel , this.dataList );
	}

	public getTrapArr():TrapLineConfigModel[]
	{
		return this.dataList;
	}

	public getExamnpleById( id:number ):TrapLineConfigModel
	{
		for( var i:number = 0 ; i < this.dataList.length ; ++i )
		{
			if( this.dataList[i].id == id )
			{
				return this.dataList[i];
			}
		}
		return null;
	}
}