class GameConst
{
    public static stage:egret.Stage = null;
    public static cardCount:number = 55     //总牌数
}

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

enum DeBuff
{
    "Cauterize",    //灼烧
    "Frozen",       //冰冻
    "Poisoning",    //中毒
    "Bleeding",     //出血
    "BrokenDefence" //破防
}

enum Buff
{
    "powerUp",              //力量增强
    "defense",              //减伤
    "crazy",                //暴走
    "multipleDefense",      //多重格挡
    "poisoning",            //中毒
    "nextPlusEnergy",       //下一回合增加能量
    "week",                 //虚弱
    "maimed",               //易伤
    "regrowth",             //再生
    "roundPowerUp",         //每回合开始加力量

    //怪物专属buff
    "injuryReduction",      //减伤50%
    "notDefenseDown",       //格挡每回合不重制
    ""
}


enum DamageType
{
    "single",      //单体伤害
    "aoe"         //范围伤害
}

enum Sp
{
    "jumpPlayerRound",
    "jumpEnemyRound",
    "drawCard",
    "abandonCard",
    "expends",                  //消耗
    "extra",                    //添加额外牌
    "consume",                  //无法被打出
    "plusEnergy",               //增加能量值
    "selectionCard",            //选牌
    "confrontationCard",        //0为手牌全为攻击牌使出，1为技能
    'heavyBlade',               //重刃效果，力量成倍
    "doubleEffect",             //双倍卡牌效果
}


