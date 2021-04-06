class GameScene extends BaseScene
{
    private touch_group:eui.Group;
    private character_group:eui.Group;
    private round_group:eui.Group;
    private round_label:eui.Label;
    private scene_bg:eui.Image;

    public constructor(data?:any)
    {
        super(data);
        this.skinName = "GameSceneSkin"
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.addEvent();
    }

    public initData()
    {
        GameManager.Instance.roundCount = 0;
        CardManager.Instance.initData();
        CharacterManager.Instance.clearData();
        this.round_group.visible = false;
        var levelData = DataManager.Instance.getLevelDataByKey(this.data.id+"")
        GameManager.Instance.curLevelType = levelData.levelType;
        this.round_group.alpha = 0;
        CharacterManager.Instance.createPlayer(this.character_group);
        CharacterManager.Instance.createMonsterByLevelData(this.character_group,this.data.id);
        
    }

    public addEvent()
    {
        this.addMessage(MsgCMD.PLAYER_ROUND_START,this);
        this.addMessage(MsgCMD.ENEMY_ROUND_START,this);
        this.addMessage(MsgCMD.SHAKE_VIEWPORT,this);
        this.addListener(egret.MainContext.instance.stage,egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
    }

    public update()
    {
        this.updateShake();
    }

    private shacking:boolean = false;
    private shackTime:number = 0;
    private shackBi:number = 0;
    private shackDura:number = 0;
    private shackX:number = 0;
    private shackY:number = 0;
    private shackCount:number = 0;
    private sDistance:number = 0; 

    public updateShake()
	{
		if(this.shacking)
		{
			let layerAll = this;
			if(this.shackTime--)
			{
				this.shackBi = this.shackTime / this.shackDura;
				layerAll.x = this.shackX * this.shackBi;
				layerAll.y = this.shackY * this.shackBi;
			}
			else
			{
				if(this.shackCount--)
				{
					this.shackTime= this.shackDura = 5;
					this.shackX = (Math.random() > .5 ? 1 : -1) * (Math.random() * this.sDistance + 8);
					this.shackY = (Math.random() > .5 ? 1 : -1) * (Math.random() * this.sDistance + 8);
					layerAll.x = this.shackX;
					layerAll.y = this.shackY;
				}
				else
				{
					this.shacking = false;
				}  
			}
		}
	}

    public cameraShake(dis, count = 1)
    {
        this.sDistance = dis; 
		this.shacking = true;
		this.shackCount = count;
		this.shackTime = 0;
    }

    public touchEnd(e:egret.TouchEvent)
    {
        var card = GameManager.Instance.curSelectCard;
        if(card)
        {
            if(e.stageY>=530)
            {
                
                card.cancelSelect();
            }
            else
            {
                if(card.type == 1)
                {
                    card.beginEffect({character:CharacterManager.Instance.player});
                }
            }
        }
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        var self = this;
        switch(cmd)
        {
            case MsgCMD.PLAYER_ROUND_START:
            this.round_group.visible = true;
            this.round_label.text = "玩家回合"
            var self = this;
            egret.Tween.get(this.round_group).to({alpha:1},200,egret.Ease.sineOut).wait(100).call(function(){
                egret.Tween.get(self.round_label).to({x:-500},1000,egret.Ease.sineInOut).call(function(){
                    self.round_group.visible = false;
                    self.round_group.alpha = 0;
                    self.round_label.x = 520;
                })
            });
            break;
            case MsgCMD.ENEMY_ROUND_START:
            this.round_group.visible = true;
            this.round_label.text = "敌人回合"
            CharacterManager.Instance.monsterArr.sort(function(a,b){return a.x - b.x})
            egret.Tween.get(this.round_group).to({alpha:1},100,egret.Ease.sineOut).wait(100).to({alpha:0},600,egret.Ease.sineIn).wait(100).call(function(){
                    self.round_group.visible = false;
                    self.round_group.alpha = 0;
                    self.round_label.x = 520;
                    Message.instance.send(MsgCMD.NEXT_MONSTER_ACTION,{target:CharacterManager.Instance.monsterArr[0]});
            });
            break;
            case MsgCMD.SHAKE_VIEWPORT:
            this.cameraShake(data.dis,data.count);
            break;
        }
    }

    public removefromViewPort(e:egret.Event)
    {
        super.removefromViewPort(e);
        CharacterManager.Instance.clearData();
        GameManager.Instance.curLevelType = 0;
    }

    // public RoundStart()
    // {
    //     egret.log(this);
    //     egret.Tween.get(this.round_label).to({x:0},1000,egret.Ease.sineInOut).call(this.setRoundGroupVisible,this)
    // }

    // private setRoundGroupVisible()
    // {
    //     this.round_group.visible = false;
    //     this.round_group.alpha = 0;
    // }
}