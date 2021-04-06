var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    GameConst.stage = null;
    GameConst.cardCount = 55; //总牌数
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
// interface CardData
// {
//     id:number,              //id
//     pp:number,              //卡牌消耗的PP点
//     type:number,            //0为指向性牌，1为非指向性牌
//     cardEffectType:number,  //0为攻击牌，1为效果牌，2为能力牌
//     getType:number,         //0为基础牌，1为稀有牌，2位非卖牌
//     name:string,            //卡牌名字
//     imgIcon:string,         //卡牌显示的图片
//     buff:string,            //卡牌所有的buff数据
//     buffValue:string,       //卡牌所有的buff对应的buff数值
//     damageType:string,      //卡牌所有的伤害类型
//     damageValue:string,     //卡牌所有的伤害类型所对应的伤害值
//     damageVfx:string,       //卡牌对应的伤害特效
//     sp:string,              //卡牌的特殊类型功能
//     spValue:string          //卡牌特殊类型对应的数值
// }
var DeBuff;
(function (DeBuff) {
    DeBuff[DeBuff["Cauterize"] = 0] = "Cauterize";
    DeBuff[DeBuff["Frozen"] = 1] = "Frozen";
    DeBuff[DeBuff["Poisoning"] = 2] = "Poisoning";
    DeBuff[DeBuff["Bleeding"] = 3] = "Bleeding";
    DeBuff[DeBuff["BrokenDefence"] = 4] = "BrokenDefence"; //破防
})(DeBuff || (DeBuff = {}));
var Buff;
(function (Buff) {
    Buff[Buff["powerUp"] = 0] = "powerUp";
    Buff[Buff["defense"] = 1] = "defense";
    Buff[Buff["crazy"] = 2] = "crazy";
    Buff[Buff["multipleDefense"] = 3] = "multipleDefense";
    Buff[Buff["poisoning"] = 4] = "poisoning";
    Buff[Buff["nextPlusEnergy"] = 5] = "nextPlusEnergy";
    Buff[Buff["week"] = 6] = "week";
    Buff[Buff["maimed"] = 7] = "maimed";
    Buff[Buff["regrowth"] = 8] = "regrowth";
    Buff[Buff["roundPowerUp"] = 9] = "roundPowerUp";
    //怪物专属buff
    Buff[Buff["injuryReduction"] = 10] = "injuryReduction";
    Buff[Buff["notDefenseDown"] = 11] = "notDefenseDown";
    Buff[Buff[""] = 12] = "";
})(Buff || (Buff = {}));
var DamageType;
(function (DamageType) {
    DamageType[DamageType["single"] = 0] = "single";
    DamageType[DamageType["aoe"] = 1] = "aoe"; //范围伤害
})(DamageType || (DamageType = {}));
var Sp;
(function (Sp) {
    Sp[Sp["jumpPlayerRound"] = 0] = "jumpPlayerRound";
    Sp[Sp["jumpEnemyRound"] = 1] = "jumpEnemyRound";
    Sp[Sp["drawCard"] = 2] = "drawCard";
    Sp[Sp["abandonCard"] = 3] = "abandonCard";
    Sp[Sp["expends"] = 4] = "expends";
    Sp[Sp["extra"] = 5] = "extra";
    Sp[Sp["consume"] = 6] = "consume";
    Sp[Sp["plusEnergy"] = 7] = "plusEnergy";
    Sp[Sp["selectionCard"] = 8] = "selectionCard";
    Sp[Sp["confrontationCard"] = 9] = "confrontationCard";
    Sp[Sp["heavyBlade"] = 10] = "heavyBlade";
    Sp[Sp["doubleEffect"] = 11] = "doubleEffect";
})(Sp || (Sp = {}));
//# sourceMappingURL=GameConst.js.map