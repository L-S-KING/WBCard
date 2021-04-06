/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */



class HttpMessage {
    private static _instance:HttpMessage;
    
    private serverTime:number = 0;

    constructor() {
    }

    static get instance():HttpMessage {
        if (!this._instance) {
            this._instance = new HttpMessage();
        }
        return this._instance;
    }

    send( url:string, params:any, callBack:Function, thisObject:any ):void{

        params = params || {};

        var that = this;


        function success(data):void {
            

            //WaitManager.instance.remove(url);
            if (data) 
            {

                if( data.ret == true)
                {
                    callBack.call(thisObject, data.data );
                }
                else
                {
                    egret.log( data.msg );
                }

            } else {
                egret.log( "data is null" );
            }
        }

        function error(xhr:XMLHttpRequest, errorType:string, err:Error):void {

            egret.log(url + " error");
        }

        var request:egret.HttpRequest = new egret.HttpRequest();

        request.addEventListener(egret.Event.COMPLETE, function (e:egret.Event):void {

            success(JSON.parse(e.target.response))
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e:egret.IOErrorEvent):void {
            console.log("HTTP_IO_ERROR")
        }, this);


        var paramStr:string = "";
        var sign:string = "";
        for (var key in params) {

            if( params[key] instanceof Array )
            {
                paramStr += sign + key + "=" + JSON.stringify( params[key] );
            }
            else
            {
                paramStr += sign + key + "=" + params[key];
            }
            sign = "&";
        }
        
        request.open( Global.serverPath + url ,egret.HttpMethod.POST );
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
        request.send(paramStr);

        console.log( "request:" + Global.serverPath + url + "——paramStr:" + paramStr );
    }

    public getServerTime():number {
        return this.serverTime + Math.floor(egret.getTimer() / 1000);
    }
}
