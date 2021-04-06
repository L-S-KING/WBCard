var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventManager = (function () {
    function EventManager() {
        this.tapCount = 0;
        this.AttackEventArr = [AdventurerCorpse, MaskedRobber, MysteriousBall];
        this.SpEventArr = [CursedBook, ForgottenAltar, TransformingShrines, WindingCorridor, HarvestDayEvent, MucousWorld, TombEvent, Nest, PriestEvent];
        this.DamnationEventArr = [CursedBook, ForgottenAltar, HarvestDayEvent, MaskedRobber, MucousWorld, MysteriousBall];
    }
    Object.defineProperty(EventManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new EventManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    EventManager.prototype.randomAddEventScene = function () {
        if (egret.localStorage.getItem("userData")) {
            var userData = SaveManager.Instance.loadGame();
            this.tapCount = userData.tap;
        }
        this.tapCount++;
        SaveManager.Instance.saveGame();
        if (this.tapCount > 2) {
            var index = Math.floor(Math.random() * this.DamnationEventArr.length);
            var clsName = this.DamnationEventArr[index];
            var spEvent1 = new clsName();
            GlobalManager.Instance.addToLayer(spEvent1, LayerType.scene);
        }
        else {
            if (Math.random() < 0.3) {
                var index = Math.floor(Math.random() * this.AttackEventArr.length);
                var clsName = this.AttackEventArr[index];
                var attackEvent = new clsName();
                GlobalManager.Instance.addToLayer(attackEvent, LayerType.scene);
            }
            else {
                var index = Math.floor(Math.random() * this.SpEventArr.length);
                var clsName = this.SpEventArr[index];
                var spEvent = new clsName();
                GlobalManager.Instance.addToLayer(spEvent, LayerType.scene);
            }
        }
    };
    EventManager._instance = null;
    return EventManager;
}());
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map