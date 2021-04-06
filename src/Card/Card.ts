class Card extends BaseModule
{
    private id:number = 0;
    private data:CardData;                      //卡牌数据
    private cardEffect:BaseCardEffect[] = [];   //卡牌效果
    private label_pp:eui.Label;
    private label_detail:eui.Label;
    private label_icon:eui.Label;
    private oldIndex:number = 0;

    private img_cardNameBg:eui.Image            //卡牌名字背景图片
    private img_cardBg:eui.Image                //卡牌背景图片
    private label_cardEffectType:eui.Label;     //卡牌效果类型文本
    private img_cardBox:eui.Image;              //卡牌效果类型框
    private img_cardPortrait:eui.Image;         //卡牌显示

    private _type:number = 1;                   //0为指向牌，1为非指向牌
    private targetX:number = 0;
    private targetY:number = 0;
    private originRotation:number = 0;
    private originX:number = 0;
    private originY:number = 0;
    private _isMove:boolean = false;

    private _cardEffectType:number = 0;         //0为攻击卡，1为效果卡

    private cardDetailLabel:game.Label = null;  //卡牌描述

    private _isEffecting:boolean = false;       //正在使用中

    private _startAbandon:boolean = false;      //是否在丢弃中

    private _isSelect:boolean = false;          //是否是在选牌阶段

    private _effectTimes:number = 0;            //卡牌作用次数

    private shader:eui.Image;

    private show:boolean = false;               //是否是展示卡牌

    private _isShop:boolean = false;            //贩卖中

    public constructor(data?:CardData,show:boolean = false,isShop:boolean = false)
    {
        super();
        if(data)
        {
            this.data = data;
        }
        this.show = show;
        this._isShop = isShop;
        this.skinName = "CardUiSkin"
    }

    public addToViewPort(e:egret.Event)
    {
        super.addToViewPort(e);
        this.initData();
        this.addEvent();
        this.setCardIcon();
        this.judgeIsShow();
    }

    public judgeIsShow()
    {
        if(this.show)
        {
            for(var i=0;i<this.cardEffect.length;i++)
            {
                this.cardEffect[i].removeSelf();
                this.cardEffect.splice(i,1);
                i--;
            }
        }
    }
    public setOriginRotation(value:number)
    {
        this.originRotation = value;
    }

    public get cardData()
    {
        return this.data;
    }

    public setCardIcon()
    {
        this.label_pp.text = this.data.pp+"";
        this.label_icon.text = this.data.name;
        switch(this.cardData.cardEffectType)
        {
            case 0:
            var text = "攻击";
            break;
            case 1:
            var text = "效果";
            break;
            case 2:
            var text = "能力";
            break;
        }
        this.label_cardEffectType.text = text;
        this.img_cardPortrait.source = this.cardData.imgPortrait;
        this.img_cardBox.source = "bottom_"+this.cardData.cardEffectType+"_png"
        if(this.cardData.getType>1)
        {
            this.img_cardBg.source = "sp_cardBg_"+this.cardData.cardEffectType+"_png"
        }
        else
        {
            this.img_cardBg.source = "normal_cardBg_"+this.cardData.cardEffectType+"_png"
        }
        this.img_cardNameBg.source = "cardName_"+this.cardData.cardEffectType+"_png"
    }

    public initData()
    {
        egret.Tween.get(this.shader,{loop:true}).to({alpha:0.7},800).to({alpha:1},800)
        this.id = this.data.id;
        this.cardDetailLabel = new game.Label();
        this.addChild(this.cardDetailLabel);
        this.cardDetailLabel.x = 28;
        this.cardDetailLabel.y = 199;
        this.cardDetailLabel.width = 170;
        this.cardDetailLabel.height = 90;
        this.cardDetailLabel.size = 32;
        this.anchorOffsetX = this.width>>1;
        this.anchorOffsetY = this.height>>1;
        if(!this.show)
        {
            this.scaleX = this.scaleY = 0.1;
        }
        this._type = this.data.type;
        this.name = this.data.name;
        this._cardEffectType = this.data.cardEffectType;
        if(this.data.sp!="null")
        {
            var sp = this.data.sp.split(',');
            var spValue = this.data.spValue.split(',');
            if(sp[0] == "confrontationCard")
            {
                var confrontationCardData = {
                    sp:sp[0],
                    spValue:spValue[0]
                }
                var confrontationCard = new ConfrontationCardEffect(confrontationCardData,this);
                GlobalManager.Instance.addToLayer(confrontationCard,LayerType.scene);
                this.cardEffect.push(confrontationCard);
            }
        }
        if(this.data.buff!="null")
        {
            var buff = this.data.buff.split(',');
            var buffValue = this.data.buffValue.split(',');
            for(var i in buff)
            {
                if(buff[i]=="defense")
                {
                    var _data = {
                        defenseValue:buffValue[i]
                    }
                    var defenseEffect = new DefenseCardEffect(_data,this);
                    GlobalManager.Instance.addToLayer(defenseEffect,LayerType.scene);
                    this.cardEffect.push(defenseEffect);
                }
                else if(buff[i]=="nextPlusEnergy")
                {
                    var buffData = DataManager.Instance.getBuffDataByName(buff[i]);
                    buffData.value = parseInt(buffValue[i]);
                    var nextPlusEnergy = new NextRPECardEffect(buffData,this);
                    GlobalManager.Instance.addToLayer(nextPlusEnergy,LayerType.scene);
                    this.cardEffect.push(nextPlusEnergy);
                }
                else if(buff[i]=="ResultCardEffect")
                {
                    var bdata = {
                        buff:buff[i],
                        buffValue:buffValue[i]
                    }
                    var buffEffect2 = new ResultCardEffect(bdata,this);
                    GlobalManager.Instance.addToLayer(buffEffect2,LayerType.scene);
                    this.cardEffect.push(buffEffect2);
                }
                else 
                {
                    var buffData = DataManager.Instance.getBuffDataByName(buff[i]);
                    buffData.value = parseInt(buffValue[i]);
                    var buffEffect = new BuffCardEffect(buffData,this);
                    GlobalManager.Instance.addToLayer(buffEffect,LayerType.scene);
                    this.cardEffect.push(buffEffect);
                }
            }   
        }

        if(this.data.sp!="null")
        {
            var sp = this.data.sp.split(',');
            var spValue = this.data.spValue.split(',');
            for(var i in sp)
            {
                if(sp[i]=="jumpEnemyRound"||sp[i]=="jumpPlayerRound")
                {
                    var spData = {
                        sp:Sp[sp[i]],
                        spValue:spValue[i]
                    }
                    var spEffect = new JumpRoundCardEffect(spData,this);
                    GlobalManager.Instance.addToLayer(spEffect,LayerType.scene);
                    this.cardEffect.push(spEffect);
                }
                if(sp[i]=="drawCard"||sp[i]=="abandonCard")
                {
                    var spData1 = {
                        sp:Sp[sp[i]],
                        spValue:spValue[i]
                    }
                    var spEffect1 = new AbandonCardEffect(spData1,this);
                    GlobalManager.Instance.addToLayer(spEffect1,LayerType.scene);
                    this.cardEffect.push(spEffect1);
                }
                if(sp[i] == "consume")
                {
                    var noCardEffect = new NoCardEffect(this.data,this);
                    GlobalManager.Instance.addToLayer(noCardEffect,LayerType.scene);
                    this.cardEffect.push(noCardEffect);
                }
                if(sp[i] == "extra")
                {
                    var additionalCardEffect = new AdditionalCardEffect(this.data,this);
                    GlobalManager.Instance.addToLayer(additionalCardEffect,LayerType.scene);
                    this.cardEffect.push(additionalCardEffect);
                }
                if(sp[i] == "plusEnergy")
                {
                    var data = {
                        spValue:spValue[i]
                    }
                    var plusEnergy = new PlusEnergyCardEffect(data,this);
                    GlobalManager.Instance.addToLayer(plusEnergy,LayerType.scene);
                    this.cardEffect.push(plusEnergy);
                }
                if(sp[i] == "expends")
                {
                    var expendsCard= new ExpendsCardEffect(this.data,this);
                    GlobalManager.Instance.addToLayer(expendsCard,LayerType.scene);
                    this.cardEffect.push(expendsCard);
                }
                if(sp[i] == "selectionCard")
                {
                    var selectionCardEffect = new SelectionCardEffect(this.data,this);
                    GlobalManager.Instance.addToLayer(selectionCardEffect,LayerType.scene);
                    this.cardEffect.push(selectionCardEffect);
                }
                if(sp[i] == "heavyBlade")
                {
                    var HBladeCardEffect = new HeavyBladeCardEffect(this.data,this);
                    GlobalManager.Instance.addToLayer(HBladeCardEffect,LayerType.scene);
                    this.cardEffect.push(HBladeCardEffect);
                }
                if(sp[i] == "doubleEffect")
                {
                    var doubleHairCardEffect = new DoubleHairCardEffect(this.data,this);
                    GlobalManager.Instance.addToLayer(doubleHairCardEffect,LayerType.scene);
                    this.cardEffect.push(doubleHairCardEffect);
                }
            }
        }

        if(this.data.damageType!="null")
        {
            var damageEffect = new DamageCardEffect(this.data,this);
            GlobalManager.Instance.addToLayer(damageEffect,LayerType.scene);
            this.cardEffect.push(damageEffect);
        }
        
        this.setCardDetail();
    }

    //接收消息
    recvMsg(cmd:number, data:any)
    {
        switch(cmd)
        {
            case MsgCMD.PLAYER_POWER_CHANGE:
            // for(var i=0;i<this.cardEffect.length;i++)
            // {
            //     this.cardEffect[i].name == "DamageCardEffect";
            //     this.cardEffect[i].changeDamageValue({value:CharacterManager.Instance.player.powerUpValue});
            // }
            break;
        }
        if(data.setCardDetail)
        {
            this.setCardDetail();
        }
    }

    public setCardDetail()
    {
        while(this.cardDetailLabel.textFlow.length>0)
        {
            this.cardDetailLabel.textFlow.splice(0,1);
        }
        
        for(var i=0;i<this.cardEffect.length;i++)
        {
            this.cardEffect[i].setCardDetail();
        }
    }

    /**设置卡牌描述 */
    public addCardDetail(text:string)
    {
        this.cardDetailLabel.addTextFlow(text,0xffffff,18,"Arial",false,1,2);
    }

    public addEvent()
    {
        if(!this.show)
        {
            this.addMessage(MsgCMD.PLAYER_POWER_CHANGE,this);
            this.addListener(this,egret.TouchEvent.TOUCH_END,this.touchCancelSelect,this);
            this.addListener(this,egret.TouchEvent.TOUCH_BEGIN,this.select,this);
        }
    }

    /**卡牌移动动画 */
    public moveAnim(targetX:number,targetY:number,targetRotation:number,changeTime:number)
    {
        this.touchEnabled = false;
        this.touchChildren = false;
        this.originRotation = targetRotation;
        this.originX = targetX;
        this.originY = targetY;
        egret.Tween.get(this).to({x:targetX,y:targetY,rotation:targetRotation,scaleX:0.6,scaleY:0.6},changeTime,egret.Ease.circOut).call(this.resetTouch);
    }

    /**结束移动 */
    public resetTouch()
    {
        this.touchEnabled = true;
        this.touchChildren = true;
    }

    /**卡牌选中 */
    public select()
    {
        if(!GameManager.Instance.canTouchCard)
        {
            return;
        }

        var oldSelectCard = GameManager.Instance.curSelectCard;
        if(oldSelectCard)
        {
            oldSelectCard.cancelSelect();
        }
        // this.oldIndex = this.parent.getChildIndex(this);
        this.parent.setChildIndex(this,999);
        if(this._isSelect == true)
        {
            CardManager.Instance.handCard.push(this);
            var a = CardManager.Instance.handCard.indexOf(this);
            var index =  CardManager.Instance.selectCard.indexOf(this);
            CardManager.Instance.selectCard.splice(index,1);
            Message.instance.send(MsgCMD.CARD_UPDATE);
            GameManager.Instance.setCurSelectCard(null);
            return;
        }
        if(this._startAbandon)
        {
            this.abandonState();
        }
        else if(!this._startAbandon || SceneManager.Instance.getAbandonScene.card.length>=2)
        {
            var posX = this.x;
            var posY = GameConst.stage.stageHeight - this.height*0.5*0.8;
            egret.Tween.get(this).to({x:posX,y:posY,scaleX:0.8,scaleY:0.8,rotation:0,},80,egret.Ease.sineOut);
            GameManager.Instance.setCurSelectCard(this);
        }

        
        
        if(this._type == 0)
        {
             
        }
    }

    public abandonState()
    {
        var _self = this;
        var cardCount = CardManager.Instance.abandonCardCount;
        var posX:number = 0;
        var posY:number = 0;
        if(cardCount == 1)
        {
            posX = 650;
            posY = 160;
            if(SceneManager.Instance.getAbandonScene.card.length>=1)
            {
                
                var card = SceneManager.Instance.getAbandonScene.card[0];
                posX = card.x;
                posY = card.y;
            }
        }
        else if(cardCount == 2)
        {
            if(SceneManager.Instance.getAbandonScene.card.length>=2)
            {
                var card = SceneManager.Instance.getAbandonScene.card[0];
                posX= card.x;
                posY = card.y;
            }
            else if(SceneManager.Instance.getAbandonScene.card.length>0)
            {
                posX = 800;
                posY = 160;
            }
            else{
                posX = 500;
                posY = 160;
            }
        }
        _self.touchEnabled = false;
        _self.touchChildren = false;
        egret.Tween.get(this).to({x:posX,y:posY,rotation:0},200,egret.Ease.sineOut).call(this.cardToAbandonScene);
    }

    public cardToAbandonScene()
    {
        var _self = this;
        var cardCount = CardManager.Instance.abandonCardCount;
        if(SceneManager.Instance.getAbandonScene)
            {
                if(cardCount == 1)
                {
                    _self.x = 650;
                    _self.y = 160;
                    if(SceneManager.Instance.getAbandonScene.card.length>=1)
                    {
                        
                        var card = SceneManager.Instance.getAbandonScene.card[0];
                        var posx = card.x;
                        var posy = card.y;
                        card.moveAnim(card.originX,card.originY,card.originRotation,300);
                        var cardArr = CardManager.Instance.handCard;
                        SceneManager.Instance.getAbandonScene.card.splice(0,1)
                        cardArr.push(card)
                        card._startAbandon = true;
                        _self.x = posx;
                        _self.y = posy;
                    }
                }
                else if(cardCount == 2)
                {
                    if(SceneManager.Instance.getAbandonScene.card.length>=2)
                    {
                        
                        var card = SceneManager.Instance.getAbandonScene.card[0];
                        var posx = card.x;
                        var posy = card.y;
                        card.moveAnim(card.originX,card.originY,card.originRotation,300);
                        var cardArr = CardManager.Instance.handCard;
                        
                        SceneManager.Instance.getAbandonScene.card.splice(0,1)
                        cardArr.push(card)
                        card._startAbandon = true;
                        _self.x = posx;
                        _self.y = posy;
                    }
                    else if(SceneManager.Instance.getAbandonScene.card.length>0)
                    {
                        _self.x = 800;
                        _self.y = 160;
                    }
                    else{
                        _self.x = 500;
                        _self.y = 160;
                    }
                }
                SceneManager.Instance.getAbandonScene.card.push(this);
                var cardArr = CardManager.Instance.handCard;
                cardArr.splice(cardArr.indexOf(this),1);
                _self._startAbandon = false;
                cardArr.sort(function(a,b){return a.originX - b.originX});
                for(var i=0;i<cardArr.length;i++)
                {
                    cardArr[i].parent.setChildIndex(cardArr[i],5+i);
                }
                //CardManager.Instance.handCard.splice(CardManager.Instance.handCard.indexOf(this),1);
                //egret.log(CardManager.Instance.handCard)
            }
    }

    public touchCancelSelect(e:egret.TouchEvent)
    {
        if(e.stageY>=this.y)
        {
            this.cancelSelect();
        }
    }
    /**取消选中 */
    public cancelSelect()
    {
        if(this._isSelect == true)
        {
            return;
        }
        if(!GameManager.Instance.canTouchCard)
        {
            return;
        }
        var card = GameManager.Instance.curSelectCard;
        if(card == this)
        {
            this.touchEnabled = false;
            egret.Tween.get(this).to({x:this.originX,y:this.originY,scaleX:0.6,scaleY:0.6,rotation:this.originRotation},80,egret.Ease.sineIn).call(setIndex);
            GameManager.Instance.setCurSelectCard(null);
        }
        function setIndex()
        {
            var cardArr = CardManager.Instance.handCard;
            cardArr.sort(function(a,b){return a.originX - b.originX});
            for(var i=0;i<cardArr.length;i++)
            {
                cardArr[i].parent.setChildIndex(cardArr[i],5+i);
            }
            this.touchEnabled = true;
            
        }
    }


    /**卡牌开始执行效果 */
    public beginEffect(data?:any)
    {
        if(this._isSelect == true)
        {
            return;
        }
        var self = this;
        var player = CharacterManager.Instance.player;
        GameManager.Instance.canTouchCard = false;
        if(GameManager.Instance.curPlayerPP>=this.data.pp)
        {  
            for(var i:number=0;i<player.getHaveBuff().length;i++)
            {
                if(player.getHaveBuff()[i].name== "Twining")
                {
                    if(this.cardEffecType==0)
                    {
                        TipsManager.Instance.createTips("攻击牌无法使用");
                        GameManager.Instance.canTouchCard=true;
                        this.cancelSelect();
                        return;
                    }
                }
            }
            if(this.data.damageType!="null"&&CardManager.Instance.isDoubleEffect)
            {
                this._effectTimes = 2;
            }
            else
            {
                this._effectTimes = 1;
            }
            for(var j=0;j<this._effectTimes;j++)
            {
                for(var i=0;i<this.cardEffect.length;i++)
                {
                    if(this.cardEffect[0].name == "ConfrontationCardEffect")
                    {
                        //egret.log(":thrthy")
                        if(!this.cardEffect[0].useCardEffect(data.character))
                        {
                            TipsManager.Instance.createTips("无法打出");
                            GameManager.Instance.canTouchCard = true;
                            this.cancelSelect();
                            return;
                        }
                    }
                    // else
                    // {
                    //     this.cardEffect[i].useCardEffect(data.character);
                    // }
                    this.cardEffect[i].useCardEffect(data.character);
                }
                if(CardManager.Instance.isDoubleEffect&&self.data.damageType!="null")
                {
                    
                    CardManager.Instance.isDoubleEffect = false;
                }
            }
            
            var spArr = this.data.sp.split(',');
            // if(spArr.indexOf("confrontationCard")<0)
            // {
                if(spArr.indexOf("expends")>=0)
                {
                    egret.Tween.get(this).to({x:640,y:360,scaleX:0.8,scaleY:0.8,rotation:0},300,egret.Ease.sineOut).to({alpha:0},650,egret.Ease.quartOut).call(this.remove);
                }
                else
                {
                    egret.Tween.get(this).to({x:640,y:360,scaleX:0.8,scaleY:0.8,rotation:0},300,egret.Ease.sineOut).to({},150).call(this.abandonCard);
                }
                var player = CharacterManager.Instance.player;
                var monsterArr = CharacterManager.Instance.monsterArr;
                for(var i=0;i<monsterArr.length;i++)
                {
                    for(var j=0;j<monsterArr[i].getHaveBuff().length;j++)
                    {
                        if(monsterArr[i].getHaveBuff()[j].name == "damageAdd" )
                        {
                            monsterArr[i].attackTimes += 0.1;
                            monsterArr[i].getHaveBuff()[j].roundCount++;
                        }
                    }
                }
            // }
            Message.instance.send(MsgCMD.CARD_USE,this.data);
            GameManager.Instance.setCurSelectCard(null);
        }
        else
        {
            TipsManager.Instance.createTips("PP不足");
            GameManager.Instance.canTouchCard = true
            this.cancelSelect();
        }
    }   

    /**卡牌使用一次后删除卡牌 */
    private remove()
    {
        GameManager.Instance.canTouchCard = true;
        var _index = CardManager.Instance.handCard.indexOf(this);
        CardManager.Instance.handCard.splice(_index,1);
        this.parent.removeChild(this);
        Message.instance.send(MsgCMD.CARD_ABANDON,{updateDiscardGroup:false});
    } 

    /**丢弃卡牌 */
    public abandonCard()
    {
        this.touchEnabled = false;
        this.touchChildren = false;

        //var spArr = this.data.sp.split(',');
        // if(spArr.indexOf("expends")>=0)
        // {
        //     egret.Tween.get(this).to({x:640,y:360,scaleX:0.8,scaleY:0.8,rotation:0},300,egret.Ease.sineOut).to({alpha:0},300).call(this.remove);
        //     return;
        // }
        
        this.abandonX = this.x;
        this.abandonY = this.y;
        this.abandonP1X = this.x - Math.floor(Math.random()*(240)+160);
        this.abandonP1Y = this.y - Math.floor(Math.random()*(360)+160);
        var kx = 1170 - this.x;
        var ky = 590 - this.y;
        var k = ky/kx
        var radius = Math.atan(k);
        this.abandonRotate = radius*180/Math.PI+90;
        var _index = CardManager.Instance.handCard.indexOf(this);
        if(_index>=0)
        {
            CardManager.Instance.handCard.splice(_index,1);
        }
        egret.Tween.get(this,{onChange:this.move,onChangeObj:this}).to({scaleX:0.1,scaleY:0.1,f:1},500,egret.Ease.sineIn).call(this.cardToDiscard);
    }

    private f:number = 0;
    private abandonX:number = 0;
    private abandonY:number = 0;
    private abandonP1X:number = 0;
    private abandonP1Y:number = 0;
    private abandonRotate:number = 0;

    /**卡牌的丢弃移动 */
    public move(){
        if(this.f<=1){
            this.rotation = this.abandonRotate*this.f;
            this.f += 0.05;
            this.x = (1-this.f)*(1-this.f)*this.abandonX+2*this.f*(1-this.f)*this.abandonP1X+this.f*this.f*1170;
            this.y = (1-this.f)*(1-this.f)*this.abandonY+2*this.f*(1-this.f)*this.abandonP1Y+this.f*this.f*590;
        }
    }

    /**卡牌到了弃牌堆 */
    public cardToDiscard()
    {
        GameManager.Instance.canTouchCard = true;
        CardManager.Instance.cardArr_discardId.push(this.id)
        this.parent.removeChild(this);
        Message.instance.send(MsgCMD.CARD_ABANDON,{updateDiscardGroup:true});
    }

    public get isEffecting()
    {
        return this._isEffecting;
    }

    public get type()
    {
        return this._type;
    }

    public get cardEffecType()
    {
        return this._cardEffectType;
    }

    public set startAbandon(value:boolean)
    {
        this._startAbandon = value;
    }

    public get startAbandon()
    {
        return this._startAbandon;
    }

    public set isSelect(value:boolean)
    {
        this._isSelect = value;
    }

    public get isSelect()
    {
        return this._isSelect;
    }

    public getOriginX()
    {
        return this.originX;
    }

    public getOriginY()
    {
        return this.originY;
    }
    // public showDetail()
    // {
    //     this.cancelSelect();
    //     UiManager.Instance.addUiToUiLayer(CardUi,true,this.data);
    // }
}