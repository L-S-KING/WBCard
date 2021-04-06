class CardManager
{
    private static _instance:CardManager = null;
    public static get Instance()
    {
        if(!this._instance)
        {
            this._instance = new CardManager();
        }
        return this._instance;
    }

    //private _cardArr:Card[] = [];
    private _handCard:Card[] = [];
    //private _haveCardId:number[] = [11,11,1,22,22,3,3,21,21,20,20,19,4,18,19,18,21,19,17,20,17,17,21,16,21,15,20,13,14,12,11,8,19,12,18,9,10,1,15,20,2,11,18,13,14,3,4,15,12,7,11,2,3,15,4,1,2,7,11,3,5,6,7,5,1,2,6,6,8,8,9,9,10,10];
    private _haveCardId:number[]=[1,1,1,1,1,2,2,2,2]
    private _cardArr_holdId:number[] = [];
    private _cardArr_discardId:number[] = [];
    private _abandonCardCount:number = 0;                       //需要丢弃的手牌数量
    private _selectCard:Card[] = [];
    private _isDoubleEffect:boolean = false;

    // public get cardArr()
    // {
    //     return this._cardArr;
    // }
    public initData()
    {
        this._cardArr_holdId = [];
        var temp:number[] = [];
        for(var i=0;i<this._haveCardId.length;i++)
        {
            temp.push(this._haveCardId[i]);
        }

        while(temp.length>0)
        {
            var index = Math.floor(Math.random()*temp.length);
            this._cardArr_holdId.push(temp[index]);
            temp.splice(index,1);
        }
        this._abandonCardCount = 0;
        this._cardArr_discardId = [];
        this._handCard = [];
        this._selectCard = [];
        this._isDoubleEffect = false;
    }

    public set isDoubleEffect(value:boolean)
    {
        this._isDoubleEffect = value;
    }

    public get isDoubleEffect()
    {
        return this._isDoubleEffect;
    }

    public get selectCard()
    {
        return this._selectCard;
    }

    public set abandonCardCount(value:number)
    {
        this._abandonCardCount = value;
    }

    public get abandonCardCount()
    {
        return this._abandonCardCount;
    }

    public set haveCardId(value:number[])
    {
        this._haveCardId = value;
        
    }

    public set cardArr_holdId(value:number[])
    {
        this._cardArr_holdId = value;
    }

    public set cardArr_discardId(value:number[])
    {
        this._cardArr_discardId = value;
    }

    public get handCard()
    {
        return this._handCard;
    }

    public get cardArr_holdId()
    {
        return this._cardArr_holdId;
    }

    public get cardArr_discardId()
    {
        return this._cardArr_discardId;
    }

    public get haveCardId()
    {
        return this._haveCardId;
    }

    public pushCardToArrById(id:number):Card
    {
        var _data = DataManager.Instance.getCardDataByIdKey(id+"");
        var card:Card = new Card(_data);
        GlobalManager.Instance.addToLayer(card,LayerType.ui);
        this._handCard.push(card);
        return card;
    }

    /**随机获得卡牌数据 */
    public randomGetCardData()
    {
        var id = Math.floor(Math.random()*GameConst.cardCount)+1;
        var data = DataManager.Instance.getCardDataByIdKey(id+"");
        while(data.getType==2)
        {
            var id = Math.floor(Math.random()*GameConst.cardCount)+1;
            var data = DataManager.Instance.getCardDataByIdKey(id+"");
        }
        return data;
    }
}