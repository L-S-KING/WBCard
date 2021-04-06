// /**
//  * Created by Jacob.Yang on 2017/7/11.
//  *
//  */


// class AnimationCompnent extends BaseSprite implements IMessage
// {

// 	private aniName:string;
// 	private defaultAniName:string;

// 	private mc:MovieClipCompnent;
// 	private playStatus:string;

// 	private aniIndex:number;
	
// 	private aniHash:HashMap;
// 	public constructor( aniName:string , defaultAniName:string )
// 	{
// 		super();

// 		this.aniName = aniName;
// 		this.defaultAniName = defaultAniName;
// 		this.aniIndex = 0;
// 		this.aniHash = new HashMap();
// 	}

// 	public add_view_handler( e:egret.Event ):void
// 	{
// 		super.add_view_handler( e );

// 		this.addMessage( MsgCMD.MOVIECLIP_PLAY_OVER , this );

// 		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
//         RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
//         RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
//         RES.loadGroup( this.aniName );
// 	}

// 	recvMsg(cmd:number, data:any):void
// 	{
// 		switch( cmd )
// 		{
// 			case MsgCMD.MOVIECLIP_PLAY_OVER:
// 				if( this.mc == data )
// 				{
// 					this.playNextAni();
// 				}
// 			break;
// 		}
// 	}

//     private onResourceLoadComplete(event:RES.ResourceEvent):void {
		
// 		if( event.groupName != this.aniName )	return;
		
// 		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
// 		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
// 		RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
		
// 		let obj:any[] = RES.getRes(  this.aniName  + "_ani_json" ).desc;

// 		for( var i:number = 0 ; i < obj.length ; ++i )
// 		{
// 			this.aniHash.put( obj[i].name , new AnimationDataModel( obj[i] ) );
// 		}

// 		this.play( this.defaultAniName );
//     }

//     private onItemLoadError(event:RES.ResourceEvent):void {
//         console.warn("Url:" + event.resItem.url + " has failed to load");
//     }

//     private onResourceLoadError(event:RES.ResourceEvent):void {
//         //TODO
//         console.warn("Group:" + event.groupName + " has failed to load");
//         this.onResourceLoadComplete(event);
//     }


// 	public play( aniName:string ):void{
	

// 		let model:AnimationDataModel = this.aniHash.get( aniName );
// 		if( model == null )
// 		{
// 			egret.warn( "aniName:" + aniName + "is not exist" );
// 		}
// 		else
// 		{
// 			this.aniName = model.name;
// 			this.aniIndex = 0;
// 			this.playAni( model.getAniByIndex( this.aniIndex ) , model.getPlayTimeByIndex( this.aniIndex ) );
// 		}
// 	}

// 	private playNextAni():void{

		
// 		let model:AnimationDataModel = this.aniHash.get( this.aniName );
// 		this.aniIndex++;
// 		let ani:string[] = model.ani;

// 		if( this.aniIndex >= ani.length )
// 		{
// 			this.aniIndex = 0;
// 			this.play( this.defaultAniName );
// 		}
// 		else
// 		{
// 			this.playAni( model.getAniByIndex( this.aniIndex ) , model.getPlayTimeByIndex( this.aniIndex ) );
// 		}
// 	}

// 	private playAni( aniName:string , playTime:number ):void{

// 		let tempMc:MovieClipCompnent = this.mc;
// 		egret.setTimeout( this.removeDis , this , 20 , tempMc );

// 		this.mc = new MovieClipCompnent( aniName , false );
// 		this.mc.gotoAndPlay( aniName , playTime );
// 		this.addChild( this.mc );
// 	}

	

// 	private removeDis( tempMc:MovieClipCompnent ):void{

// 		if( tempMc != null )
// 		{
// 			if( this.contains( tempMc ) )
// 			{
// 				this.removeChild( tempMc );
// 				tempMc.stop();
// 				tempMc = null;
// 			}
// 		}
// 	}

// 	public getAniName():string
// 	{
// 		return this.aniName;
// 	}

// 	public getDefaultAniName():string
// 	{
// 		return this.defaultAniName;
// 	}
// }




// class AnimationDataModel
// {
// 	private _name:string;
// 	private _ani:string[];
// 	private _playTime:number[];
// 	public constructor( obj:any )
// 	{
// 		this._name = obj.name;
// 		this._ani = obj.ani.split( "," );
// 		this._playTime = [];

// 		let playTime:string[] = obj.playTime.split( "," );
// 		for( var i:number = 0 ; i < playTime.length ; ++i )
// 		{
// 			this._playTime.push( parseInt( playTime[i] ) );
// 		}
// 	}

// 	public get name():string
// 	{
// 		return this._name;
// 	}

// 	public get ani():string[]
// 	{
// 		return this._ani;
// 	}

// 	public getAniByIndex( index:number ):string
// 	{
// 		if( index < 0 || index >= this._ani.length )
// 		{
// 			egret.warn( "getAniByIndex,index不合法:" + index );
// 			return "";
// 		}
// 		return this._ani[index];
// 	}

// 	public getPlayTimeByIndex( index:number ):number
// 	{
// 		if( index < 0 || index >= this._playTime.length )
// 		{
// 			egret.warn( "getPlayTimeByIndex,index不合法:" + index );
// 			return 0;
// 		}
// 		return this._playTime[index];
// 	}
// }