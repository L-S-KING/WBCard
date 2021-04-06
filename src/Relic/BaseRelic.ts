class BaseRelic extends BaseModule
{
	protected _id:number = 0;
	protected data:RelicData;
	protected detail:string;
    protected detailName:string;
	protected _type:number = 0; 
	protected relic_img:eui.Image;
	protected isPlayerHold = false;
	protected _canUse:boolean = true;

	public constructor(data?:RelicData,isPlayerHold?:boolean) 
	{
		super();
		if(data)
		{
			this.data = data;
		}
		if(isPlayerHold)
		{
			this.isPlayerHold = isPlayerHold;
		}
		this.skinName = "RelicUiSkin";
	}

	public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.setImgIcon();
        this.addEvent();
		this.setPlayerHoldState();
    }

	/**设置玩家是否持有状态 */
	public setPlayerHoldState()
	{
		if(!this.isPlayerHold)
		{
			this.addListener(this,egret.TouchEvent.TOUCH_TAP,this.select,this);
		}
		else
		{
			RelicManager.Instance.pushRelicToArr(this);
		}
	}

	public select()
	{
		if(this.isPlayerHold)
		{
			return;
		}
		var data = {
			img:"l_"+this.data.img,
			detail:this.data.detail,
			detailName:this.data.detailName,
			relic:this
		}
		var selectUi = new RelicSelectUi(data);
		GlobalManager.Instance.addToLayer(selectUi,LayerType.ui,999);
	}

	public selectRelic()
	{
		this.isPlayerHold = true;
		RelicManager.Instance.pushRelicToArr(this);
		Message.instance.send(MsgCMD.RELIC_SELECT_OVER,{relic:this});
		this.removeListener(this,egret.TouchEvent.TOUCH_TAP,this.selectRelic,this);
	}

	public setImgIcon()
	{
		this.relic_img.source = this.data.img;
	}

	public initData()
	{
		if(this.data)
		{
			this._type = this.data.type;
			this.detail = this.data.detail;
			this.detailName = this.data.detailName;
		}
	}

	public set id(value:number)
	{
		this._id = value;
	}

	public get id()
	{
		return this._id;
	}

	public get canUse()
	{
		return this._canUse;
	}

	public set canUse(value:boolean)
	{
		this._canUse = value;
	}

	public addEvent()
	{
		this.addListener(this,egret.TouchEvent.TOUCH_TAP,this.relicDetail,this);
	}

	public relicDetail()
	{
		if(!this.isPlayerHold)
		{
			return;
		}
		var data = {
			img:"l_"+this.data.img,
			detail:this.data.detail,
			detailName:this.data.detailName,
			index:RelicManager.Instance.RelicArr.indexOf(this)
		}
		var relicDetail = new RelicDetail(data)
		GlobalManager.Instance.addToLayer(relicDetail,LayerType.ui,999);
	}

	public getRelicData()
	{
		var data = {
			img:"l_"+this.data.img,
			detail:this.data.detail,
			detailName:this.data.detailName,
			index:RelicManager.Instance.RelicArr.indexOf(this)
		}
		return data
	}

	public relicEffect()
	{
	
	}

	recvMsg(cmd:number, data:any):void
	{

	}

	/**回合开始效果 */
	public roundStartEffect()
	{

	}
	/**回合结束效果 */
	public roundEndEffect()
	{

	}
	/**回合中的效果 */
	public roundInEffect()
	{

	}
}