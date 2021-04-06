/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */


class MsgCMD {

    static SHOW_EXAMPLE_1_MODULE:number                        = 10000000;
    static SHOW_EXAMPLE_2_MODULE:number                        = 10000001;
    static UPDATE_EXAMPLE_CLICK_NUM:number                     = 10000002;

    static TOUCH_GAMESCENE_BEGIN:number                        = 20000000;
    static TOUCH_GAMESCENE_END:number                          = 20000001;

    static CLEAR_LEVEL:number                                  = 30000000;
    static CHANGE_LEVEL:number                                 = 30000001;
    static CLEAR_CURMAXLEVEL:number                            = 40000000;

    static CONTINUE_GAME:number                                = 50000000;
    static GAME_OVER:number                                    = 50000001;

    static USE_ITEM:number                                     =    333333333333;

    static KEYBOARD_DOWN:number                                = 33333333;
    static KEYBOARD_UP:number                                  = 33333334;

    static CARD_USE:number                                     = 70000000;          //使用卡片
    static CARD_ABANDON:number                                 = 70000001;          //丢弃卡片

    static PLAYER_ROUND_START:number                           = 80000000;          //玩家回合开始
    static PLAYER_ROUND_END:number                             = 80000001;          //玩家回合结束
    static ENEMY_ROUND_START:number                            = 80000002;          //敌人回合开始
    static ENEMY_ROUND_END:number                              = 80000003;          //敌人回合结束
    static NEXT_MONSTER_ACTION:number                          = 80000004;          //下一个怪物动作
    static START_ABANDON:number                                = 80000005;
    static DRAW_CARD:number                                    = 80000006;      
    static ABANDON_CARD:number                                 = 80000007;    
    static ABANDON_END:number                                  = 80000008;
    static GAME_ROUND_END:number                               = 80000009;          //战斗结束

    static PLAYER_POWER_CHANGE:number                          = 90000000;          //玩家力量改变
    static ENEMY_POWER_CHANGE:number                           = 90000001;          //敌人力量改变
    static ADD_CARD:number                                     = 90000002;          //添加额外卡牌到手牌
    static SET_CARD:number                                     = 90000003;          //怪物攻击添加牌到弃牌堆
    static SELECT_CARD:number                                  = 90000004;          //选牌
    static CARD_UPDATE:number                                  = 90000005;          //选择卡牌更新

    static SHAKE_VIEWPORT:number                               = 100000000;          //震动窗口

    static MONSTER_DIE:number                                  = 90000006;          //怪物死亡

    static PLAYER_DEAD:number                                  = 90000007;          //玩家死亡
    static PLAYER_UNDERATTACK:number                           = 90000008;          //玩家被攻击
    static PLAYER_NOTWEAK:number                               = 90000009;          //玩家不在被虚弱

    static ITEM_GET:number                                     = 100000001;         //拾起道具
    static PLAYER_ATTACK:number                                = 100000002;         //玩家攻击

    static PLAYER_HEALTH_CHANGE:number                         = 100000003;         //玩家生命值变化
    static PLAYER_COIN_CHANGE:number                           = 100000004;         //玩家y金币变化
    static PLAYER_HAVECARD_CHANGE:number                       = 100000005;         //玩家拥有卡牌变化
    static PLAYER_LAYER_CHANGE:number                          = 100000006;         //玩家游戏层数变化

    static RELIC_SELECT_OVER:number                            = 100000007;         //选择装备结束
    static REWARD_CARD_SELECT_OVER:number                      = 100000008;         //选择卡牌结束
    static PLAYER_REMOVECARD_OVER:number                       = 100000009;         //玩家移除卡牌结束

}