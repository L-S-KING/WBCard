class BuffItemrenerer extends BaseModule
{
	private data:any
	public constructor(data?:any) 
	{
		super();
		if(data)
		{
			this.data =data;
		}
		this.skinName = "BuffItemrenererSkin";
	}

	private buffName:string = null;
	private buffDetail:string = null;//detail
	private buffDetailLabel:eui.Label;
	private rect:eui.Rect;

	public addToViewPort(e:egret.Event)
	{
		super.addToViewPort(e);
		this.buffDetail = this.data.detail;
		this.buffName = this.data.name;
		if(this.buffName && this.buffDetail)
		{
			this.buffDetailLabel.text = this.buffName+":"+this.buffDetail;
			this.height = this.buffDetailLabel.height+15;
			this.rect.y = this.buffDetailLabel.y-5;
			this.rect.height = this.height-2.5;
		}
		else
		{
			;
		}
	}
}