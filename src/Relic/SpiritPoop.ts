/**
 * 精灵便便
 * 怎么看都不舒服
 */
class SpiritPoop extends BaseRelic
{
	public constructor(data,isPlayerHold?:boolean) 
	{
		super(data,isPlayerHold);
		this.name = egret.getQualifiedClassName(SpiritPoop);
		this.id = RelicManager.Instance.relicNameArr.indexOf(SpiritPoop);
	}

	public addEvent()
	{
		super.addEvent();
	}

	public relicEffect()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			
		}
	}
}