/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */

class Global
{
    public static proportion:number;

    public static design_width:number = 480;
    public static design_height:number = 900;

    public static stage_width:number;

    public static screen_width:number;
    public static screen_height:number;



    public static ip:string = "127.0.0.1";

    public static serverPath:string = "http://" + Global.ip + ":8080/service/";
    
    public constructor()
    {
        
    }
}
