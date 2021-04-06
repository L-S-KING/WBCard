/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */

class BaseSprite extends egret.Sprite
{
    private listenerArray:any[];
    private messageArray:any[];
    protected worldTime:number = 0;

    public constructor()
    {
        super();
        this.listenerArray=[];
        this.messageArray = [];


        this.addListener(this, egret.Event.REMOVED_FROM_STAGE, this.removefromViewPort , this);
        this.addListener(this, egret.Event.ADDED_TO_STAGE, this.addToViewPort , this);
    }

    public addToViewPort(e: egret.Event):void{

        this.removeEventListener( egret.Event.ADDED_TO_STAGE,this.addToViewPort , this );
    }

    public addListener(dis:egret.EventDispatcher,type:string, listener:Function , thisObject:any  , useCapture:boolean = false ):void{

        this.listenerArray.push([dis,type,listener, thisObject ,useCapture])
        dis.addEventListener( type,listener, thisObject , useCapture);
    }

    public removeListener( dis:egret.EventDispatcher,type:string, listener:Function , thisObject:any , useCapture:boolean = false  ):void{

        for( var i:number = 0 ; i < this.listenerArray.length ; ++i )
        {
            if( this.listenerArray[i][0] == dis &&
                this.listenerArray[i][1] == type &&
                this.listenerArray[i][2] == listener &&
                this.listenerArray[i][3] == thisObject &&
                this.listenerArray[i][4] == useCapture )
            {
                dis.removeEventListener( type , listener , this , useCapture  );
                this.listenerArray.splice( i , 1 );
                i--;
            }
        }
    }

    public addMessage( msgId:number , msgObj:IMessage ):void{

        this.messageArray.push( [ msgId , msgObj ] );
        Message.instance.add( msgId , msgObj  );
    }

    public removefromViewPort(e:egret.Event):void{

        this.destroy();
    }

    private destroy() : void
    {
        egret.Tween.removeTweens(this);
        while(this.numChildren > 0){
            egret.Tween.removeTweens(this.getChildAt(0))
            this.removeChildAt(0)
        }

        if( this.listenerArray )
        {
            for(var i:number=0;i< this.listenerArray.length;i++){

                this.listenerArray[i][0].removeEventListener( this.listenerArray[i][1], this.listenerArray[i][2],this.listenerArray[i][3] , this.listenerArray[i][4]);
            }
        }
        this.listenerArray = null

        if( this.messageArray )
        {
            for( var i:number = 0 ; i < this.messageArray.length ; ++i )
            {
                Message.instance.remove( this.messageArray[i][0] , this.messageArray[i][1] );
            }
        }
        this.messageArray = null;
    }
}

