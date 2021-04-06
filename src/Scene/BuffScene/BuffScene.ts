class BuffScene extends BaseScene
{
	private buffGroup:eui.Group;
	public constructor(character:BaseCharacter) 
	{
		super();
		this.skinName = "BuffSceneSkin";

		this._character = character;
		var detailArr:any[] = [];
		if(this._character)
		{
			for(let i=0;i<this._character.getHaveBuff().length;i++)
			{
				var data = {
					detail:this._character.getHaveBuff()[i].getDetail(),
					name:this._character.getHaveBuff()[i].getDetailName()
				}
				//egret.log(this._character.getHaveBuff());
				var detail = new BuffItemrenerer(data);
				this.buffGroup.addChild(detail);
			}
		}
	}

	private _character:BaseCharacter = null;
	private buffList:eui.List;
}