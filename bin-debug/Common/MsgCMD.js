/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MsgCMD = (function () {
    function MsgCMD() {
    }
    MsgCMD.SHOW_EXAMPLE_1_MODULE = 10000000;
    MsgCMD.SHOW_EXAMPLE_2_MODULE = 10000001;
    MsgCMD.UPDATE_EXAMPLE_CLICK_NUM = 10000002;
    MsgCMD.TOUCH_GAMESCENE_BEGIN = 20000000;
    MsgCMD.TOUCH_GAMESCENE_END = 20000001;
    MsgCMD.CLEAR_LEVEL = 30000000;
    MsgCMD.CHANGE_LEVEL = 30000001;
    MsgCMD.CLEAR_CURMAXLEVEL = 40000000;
    MsgCMD.CONTINUE_GAME = 50000000;
    MsgCMD.GAME_OVER = 50000001;
    MsgCMD.USE_ITEM = 333333333333;
    MsgCMD.KEYBOARD_DOWN = 33333333;
    MsgCMD.KEYBOARD_UP = 33333334;
    MsgCMD.CARD_USE = 70000000; //使用卡片
    MsgCMD.CARD_ABANDON = 70000001; //丢弃卡片
    MsgCMD.PLAYER_ROUND_START = 80000000; //玩家回合开始
    MsgCMD.PLAYER_ROUND_END = 80000001; //玩家回合结束
    MsgCMD.ENEMY_ROUND_START = 80000002; //敌人回合开始
    MsgCMD.ENEMY_ROUND_END = 80000003; //敌人回合结束
    MsgCMD.NEXT_MONSTER_ACTION = 80000004; //下一个怪物动作
    MsgCMD.START_ABANDON = 80000005;
    MsgCMD.DRAW_CARD = 80000006;
    MsgCMD.ABANDON_CARD = 80000007;
    MsgCMD.ABANDON_END = 80000008;
    MsgCMD.GAME_ROUND_END = 80000009; //战斗结束
    MsgCMD.PLAYER_POWER_CHANGE = 90000000; //玩家力量改变
    MsgCMD.ENEMY_POWER_CHANGE = 90000001; //敌人力量改变
    MsgCMD.ADD_CARD = 90000002; //添加额外卡牌到手牌
    MsgCMD.SET_CARD = 90000003; //怪物攻击添加牌到弃牌堆
    MsgCMD.SELECT_CARD = 90000004; //选牌
    MsgCMD.CARD_UPDATE = 90000005; //选择卡牌更新
    MsgCMD.SHAKE_VIEWPORT = 100000000; //震动窗口
    MsgCMD.MONSTER_DIE = 90000006; //怪物死亡
    MsgCMD.PLAYER_DEAD = 90000007; //玩家死亡
    MsgCMD.PLAYER_UNDERATTACK = 90000008; //玩家被攻击
    MsgCMD.PLAYER_NOTWEAK = 90000009; //玩家不在被虚弱
    MsgCMD.ITEM_GET = 100000001; //拾起道具
    MsgCMD.PLAYER_ATTACK = 100000002; //玩家攻击
    MsgCMD.PLAYER_HEALTH_CHANGE = 100000003; //玩家生命值变化
    MsgCMD.PLAYER_COIN_CHANGE = 100000004; //玩家y金币变化
    MsgCMD.PLAYER_HAVECARD_CHANGE = 100000005; //玩家拥有卡牌变化
    MsgCMD.PLAYER_LAYER_CHANGE = 100000006; //玩家游戏层数变化
    MsgCMD.RELIC_SELECT_OVER = 100000007; //选择装备结束
    MsgCMD.REWARD_CARD_SELECT_OVER = 100000008; //选择卡牌结束
    MsgCMD.PLAYER_REMOVECARD_OVER = 100000009; //玩家移除卡牌结束
    return MsgCMD;
}());
__reflect(MsgCMD.prototype, "MsgCMD");
//# sourceMappingURL=MsgCMD.js.map