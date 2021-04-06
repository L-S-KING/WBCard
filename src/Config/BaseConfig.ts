class BaseConfig 
{

	public constructor() 
	{
	}

	protected init( configName:string , cls:any , collect:any[] ):void{

		let str:string = RES.getRes( configName );
		let row:string[] = str.split( "\n" );
		for( var i:number = 1 ; i < row.length ; ++i )
		{
			let colum:string[] = row[i].split( "\t" );
			collect.push(new cls( colum ) );
		}
	}
}