var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardManager = (function () {
    function CardManager() {
        //private _cardArr:Card[] = [];
        this._handCard = [];
        //private _haveCardId:number[] = [11,11,1,22,22,3,3,21,21,20,20,19,4,18,19,18,21,19,17,20,17,17,21,16,21,15,20,13,14,12,11,8,19,12,18,9,10,1,15,20,2,11,18,13,14,3,4,15,12,7,11,2,3,15,4,1,2,7,11,3,5,6,7,5,1,2,6,6,8,8,9,9,10,10];
        this._haveCardId = [1, 1, 1, 1, 1, 2, 2, 2, 2];
        this._cardArr_holdId = [];
        this._cardArr_discardId = [];
        this._abandonCardCount = 0; //需要丢弃的手牌数量
        this._selectCard = [];
        this._isDoubleEffect = false;
    }
    Object.defineProperty(CardManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new CardManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    // public get cardArr()
    // {
    //     return this._cardArr;
    // }
    CardManager.prototype.initData = function () {
        this._cardArr_holdId = [];
        var temp = [];
        for (var i = 0; i < this._haveCardId.length; i++) {
            temp.push(this._haveCardId[i]);
        }
        while (temp.length > 0) {
            var index = Math.floor(Math.random() * temp.length);
            this._cardArr_holdId.push(temp[index]);
            temp.splice(index, 1);
        }
        this._abandonCardCount = 0;
        this._cardArr_discardId = [];
        this._handCard = [];
        this._selectCard = [];
        this._isDoubleEffect = false;
    };
    Object.defineProperty(CardManager.prototype, "isDoubleEffect", {
        get: function () {
            return this._isDoubleEffect;
        },
        set: function (value) {
            this._isDoubleEffect = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardManager.prototype, "selectCard", {
        get: function () {
            return this._selectCard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardManager.prototype, "abandonCardCount", {
        get: function () {
            return this._abandonCardCount;
        },
        set: function (value) {
            this._abandonCardCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardManager.prototype, "haveCardId", {
        get: function () {
            return this._haveCardId;
        },
        set: function (value) {
            this._haveCardId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardManager.prototype, "cardArr_holdId", {
        get: function () {
            return this._cardArr_holdId;
        },
        set: function (value) {
            this._cardArr_holdId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardManager.prototype, "cardArr_discardId", {
        get: function () {
            return this._cardArr_discardId;
        },
        set: function (value) {
            this._cardArr_discardId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardManager.prototype, "handCard", {
        get: function () {
            return this._handCard;
        },
        enumerable: true,
        configurable: true
    });
    CardManager.prototype.pushCardToArrById = function (id) {
        var _data = DataManager.Instance.getCardDataByIdKey(id + "");
        var card = new Card(_data);
        GlobalManager.Instance.addToLayer(card, LayerType.ui);
        this._handCard.push(card);
        return card;
    };
    /**随机获得卡牌数据 */
    CardManager.prototype.randomGetCardData = function () {
        var id = Math.floor(Math.random() * GameConst.cardCount) + 1;
        var data = DataManager.Instance.getCardDataByIdKey(id + "");
        while (data.getType == 2) {
            var id = Math.floor(Math.random() * GameConst.cardCount) + 1;
            var data = DataManager.Instance.getCardDataByIdKey(id + "");
        }
        return data;
    };
    CardManager._instance = null;
    return CardManager;
}());
__reflect(CardManager.prototype, "CardManager");
//# sourceMappingURL=CardManager.js.map