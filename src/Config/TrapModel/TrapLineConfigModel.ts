class TrapLineConfigModel
{
	public id:number;
	public startPos:egret.Point = new egret.Point();
	public endPos:egret.Point = new egret.Point();
	public rotateRate:number = 0;
	public speedVector:egret.Point = new egret.Point();
	public speed:number = 0;
	public moveLength:number = 0;

	public constructor(data:string[])
	{
		this.id = parseInt(data[0]);
		this.startPos.x = parseInt(data[1]);
		this.startPos.y = parseInt(data[2]);
		this.endPos.x = parseInt(data[3]);
		this.endPos.y = parseInt(data[4]);
		this.rotateRate = parseInt(data[5]);
		this.speedVector.x = parseInt(data[6]);
		this.speedVector.y = parseInt(data[7]);
		this.speed = parseFloat(data[8]);
		this.moveLength = parseInt(data[9]);
	}
}