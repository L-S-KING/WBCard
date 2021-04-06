class Player extends BaseCharacter
{
    // protected relicArr:BaseRelic[] = [];                //玩家拥有的装备数组
    protected bodyImgAnim:ImgAnim = null;
    public constructor(data?:any)
    {
        super(data);
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        
    }

    public initData()
    {
        this.touchEnabled = true;
        this.touchChildren = true;
        this._type = 0;
        this.health = CharacterManager.Instance.baseHealth;
        this._defense = CharacterManager.Instance.baseDefense;
        this.originX = 280;
        this.originY = 460;
        this.x = this.originX;
        this.y = this.originY;
    }

    protected setBodyImg()
    {
        var texture = RES.getRes(CharacterManager.Instance._curPlayerTextureHand+"0_png");
        if(texture)
        {
            this.bodyImg = new egret.Bitmap();
            this.bodyImg.texture = texture;
            this.addChild(this.bodyImg);
            this.bodyImg.anchorOffsetX = this.bodyImg.texture.textureWidth>>1;
            this.bodyImg.anchorOffsetY = this.bodyImg.texture.textureHeight;
            this.bodyImg.touchEnabled = true;
        }
        else
        {
            //egret.error("人物body图片资源读取失败")
        }
        // this.bodyImg.scaleX = -1;
        this.setImgAnim();
    }
    
    public setImgAnim()
    {
        this.bodyImgAnim = new ImgAnim();
        var textureHand = CharacterManager.Instance._curPlayerTextureHand;
        var animCount = CharacterManager.Instance.playerImgAnimCount;
        this.bodyImgAnim.initData(textureHand,animCount,this.bodyImg,6,false,true);
        this.bodyImgAnim.playAnim();
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            case MsgCMD.PLAYER_ROUND_START:
            if(!this._reserveDefense)
            {
                this.healthC.curDefense-=this.healthC.curDefense;
            }
            break;
            case MsgCMD.PLAYER_ATTACK:
            // if(data.cardEffectType == 0)
            // {
                this.attackMonster();
            // }
            break;
            case MsgCMD.CLEAR_LEVEL:
                this.removeAllBuff();
            break;
        }
    }

    public attackMonster()
    {
        var posX:number = 35;
        var originX:number = 0;
        egret.Tween.get(this.bodyImg).to({x:posX},100,egret.Ease.backOut).to({x:originX},100,egret.Ease.sineOut)
    }

    public addEvent()
    {
        super.addEvent();
        this.addMessage(MsgCMD.CLEAR_LEVEL,this);
        this.addMessage(MsgCMD.PLAYER_ATTACK,this);
        this.addMessage(MsgCMD.PLAYER_ROUND_START,this);
    }

    public update()
    {
        if(GameManager.Instance.pause)
        {
            return;
        }
        super.update();
    }

    public damaged(damageData:DamageData)
    {
        super.damaged(damageData);
        var self = this;
        self.skewX = 0;
        this.bodyImg.x = 0;
        var posX:number = -10;
        egret.Tween.get(this.bodyImg).to({skewX:-10,x:posX},100,egret.Ease.sineIn).to({skewX:0,x:0},150) 
    }

    /**玩家死亡 */
    public dead()
    {
        if(this._isDead)
        {
            return;
        }
        var relicArr = RelicManager.Instance.RelicArr;
        for(var i:number=0;i<relicArr.length;i++)
        {
            if(relicArr[i].name=="LizardTail"&&relicArr[i].canUse==true)
            {
                Message.instance.send(MsgCMD.PLAYER_DEAD);
                return;
            }
        }
        this._isDead = true;
        Message.instance.send(MsgCMD.GAME_OVER);
        egret.Tween.get(this).to({},400).call(function(){
            GlobalManager.Instance.removeAllObj();
            //添加失败场景
            SceneManager.Instance.setCurScene(new FailScene());
        })
    }

    public removeFromViewPort(e:egret.Event)
    {
        super.removefromViewPort(e);
        this.removeBuffScene();
    }
}