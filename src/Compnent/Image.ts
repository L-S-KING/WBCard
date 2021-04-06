/**
 * Created by Jacob.Yang on 2017/7/12.
 *
 */

module game 
{	
	export class Image extends eui.Image
	{
		private imageKey:string;
		private url:string;
		public constructor( imageKey?:string , url?:string ) 
		{
			super();

			this.imageKey = imageKey;
			this.url = url;
		}
			
		createChildren():void{

			super.createChildren();
			
			if( this.imageKey != null && this.imageKey != "" )	
			{
				RES.getResAsync( this.imageKey , this.completeHandler , this );
				
			}
			else if( this.url != null && this.url != "" )
			{
				RES.getResByUrl( this.url , this.completeHandler, this );
				
			}
			else
			{
				egret.warn( "game.Image:imageKey或url不合法" );
			}
		}

		public setByKey( imageKey:string ):void{

			if( imageKey == null || imageKey == "" )
			{
				egret.warn( "game.Image:imageKey不合法" );
				return;
			}
			RES.getResAsync( this.imageKey , this.completeHandler , this );
		}

		public setByUrl( url:string ):void{

			if( url == null || url == "" )
			{
				egret.warn( "game.Image:url不合法" );
				return;
			}
			RES.getResByUrl( this.url , this.completeHandler , this );
		}


		private completeHandler( tex:egret.Texture , url:string ):void{

			if( tex == null )
			{
				egret.warn( "读取资源失败:imageKey:" + this.imageKey + ",url:" + this.url );
				return;
			}
			this.source = tex;
		}
	}
}