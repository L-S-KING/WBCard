/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */


class TimeUtil {
	public constructor() {
	}


	public static format( time:number ):string
	{
		let second:number = time % 60;
		let minute:number = Math.floor( time / 60 % 60 );
		let hour:number = Math.floor( time / (60 * 60) );
		let minuteString:string = minute > 9 ? minute + "" : "0" + minute;
		let secondString:string = second > 9 ? second + "" : "0" + second;
		let hourString:string = hour > 9 ? hour + "" : "0" + hour;

		return hourString + ":" + minuteString + ":" + secondString;
	}
}