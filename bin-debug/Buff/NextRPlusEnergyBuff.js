var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var NextRPlusEnergyBuff = (function (_super) {
    __extends(NextRPlusEnergyBuff, _super);
    function NextRPlusEnergyBuff(data, buffTarget) {
        return _super.call(this, data, buffTarget) || this;
    }
    //接收消息
    NextRPlusEnergyBuff.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_ROUND_START:
                if (this.buffTarget.type == 0) {
                    if (this.name == "nextPlusEnergy")
                        this.plusEnergy();
                }
                break;
        }
    };
    NextRPlusEnergyBuff.prototype.plusEnergy = function () {
        egret.Tween.get(this).to({}, 800).call(removeSelf);
        function removeSelf() {
            GameManager.Instance.curPlayerPP += this.roundCount;
            var data = { pp: 0 };
            Message.instance.send(MsgCMD.CARD_USE, data);
            Message.instance.remove(MsgCMD.PLAYER_ROUND_START, this);
            if (this.parent && this.parent.contains(this)) {
                var player = CharacterManager.Instance.player;
                player.removeBuff(this);
            }
        }
    };
    return NextRPlusEnergyBuff;
}(BaseBuff));
__reflect(NextRPlusEnergyBuff.prototype, "NextRPlusEnergyBuff");
//# sourceMappingURL=NextRPlusEnergyBuff.js.map