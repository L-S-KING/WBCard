interface  IAttributeGain
{
    "Health",       //生命值
    "Defense",      //防御值
    "Normal",       //普通伤害
    "ChopBlow",     //斩击伤害
    "Lunge",        //突刺伤害
    "BluntImpact",  //钝击伤害
    "Cauterize",    //灼烧
    "Frozen",       //冰冻
    "Poisoning",    //中毒
    "Bleeding",     //出血
    "BrokenDefence" //破防
}

class AttributeGain
{
    public "Health";        //生命值
    public "Defense";       //防御值
    public "Normal";        //普通伤害
    public "ChopBlow";      //斩击伤害
    public "Lunge";         //突刺伤害
    public "BluntImpact";   //钝击伤害
    public "Cauterize";     //灼烧
    public "Frozen";        //冰冻
    public "Poisoning";     //中毒
    public "Bleeding";      //出血
    public "BrokenDefence"; //破防
}

class DamageData
{
    public damageType:DamageType = null;
    public damageValue:number = 0;
    public damageEffect:string;
}