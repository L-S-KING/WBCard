/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */


class MovieClipCompnent extends egret.Sprite 
{
	private mcData:any ;
	private texture:egret.Texture;
	private mc:egret.MovieClip;

	private aniName:string;
	private isStop:boolean;


	private playTimes:number;
	private frame:string | number;


	private removeAfterComplete:boolean;

	public constructor( aniName:string , removeAfterComplete:boolean ) 
	{
		super();

		RES.getResAsync( aniName + "_json" , this.loadMcDataHandler , this )
		RES.getResAsync( aniName + "_png" , this.loadTexHandler , this );
		
		this.aniName = aniName;
		this.removeAfterComplete = removeAfterComplete;

		this.isStop = false;
		this.playTimes = 1;
		this.frame = 1;

		this.addEventListener( egret.Event.REMOVED_FROM_STAGE , this.onRemoveFromStage , this );
	}

	private onRemoveFromStage( e:egret.Event ):void{

		this.removeEventListener( egret.Event.REMOVED_FROM_STAGE , this.onRemoveFromStage , this );
		if( this.mc )
		{
			this.mc.removeEventListener( egret.Event.COMPLETE , this.completeHandler , this );
			this.mc.stop();
			this.mc = null;
		}
		
	}

	private loadMcDataHandler( data:any , key:string ):void{

		this.mcData = data;
		this.createMc();
	}

	private loadTexHandler( data:any , key:string ):void{

		this.texture = data;
		this.createMc();
	}

	private createMc():void{

		if( this.mcData && this.texture )
		{
			var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( this.mcData , this.texture );
			this.mc = new egret.MovieClip( mcDataFactory.generateMovieClipData( this.aniName ) );
			this.mc.addEventListener( egret.Event.COMPLETE , this.completeHandler , this );
			this.addChild( this.mc );
			if( this.isStop )
			{
				
				this.stop();
			}
			else
			{
				this.gotoAndPlay( this.frame , this.playTimes );
			}
		}
	}

	public stop():void{

		this.isStop = true;
		if( this.mc )
		{
			this.mc.stop();
		}
	}

	public gotoAndPlay( frame: string | number, playTimes: number = -1 ):void{

		this.frame = frame;
		this.playTimes = playTimes;
		if( this.mc )
		{
			this.mc.gotoAndPlay( frame , playTimes );
		}
	}

	public gotoAndStop( frame: string | number ):void{

		if( this.mc )
		{
			this.mc.gotoAndStop( frame );
		}
	}

	private completeHandler( e:egret.Event ):void{

		if( this.removeAfterComplete )
		{
			if( this.parent )
			{
				if( this.parent.contains( this ) )
				{
					this.parent.removeChild( this );
				}
			}
		}

		//Message.instance.send( MsgCMD.MOVIECLIP_PLAY_OVER , this );
	}
}