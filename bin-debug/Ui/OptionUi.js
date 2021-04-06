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
var OptionUi = (function (_super) {
    __extends(OptionUi, _super);
    function OptionUi() {
        var _this = _super.call(this) || this;
        _this.skinName = "OptionUiSkin";
        _this.name = "OptionUi";
        _this.main_group.scaleX = _this.main_group.scaleY = 0;
        return _this;
    }
    OptionUi.prototype.addToViewPort = function (e) {
        _super.prototype.addToViewPort.call(this, e);
    };
    OptionUi.prototype.initData = function () {
        this.judgeMusicVolume();
        egret.Tween.get(this.main_group).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut);
    };
    OptionUi.prototype.addEvent = function () {
        this.addListener(this.btn_music, egret.TouchEvent.TOUCH_TAP, this.musicSwitch, this);
        this.addListener(this.slider_music, egret.Event.CHANGE, this.changeMusicVolume, this);
        this.addListener(this.label_saveQuit, egret.TouchEvent.TOUCH_TAP, this.saveAndQuit, this);
        this.addListener(this.img_giveUp, egret.TouchEvent.TOUCH_TAP, this.giveUp, this);
        this.addListener(this.img_return, egret.TouchEvent.TOUCH_TAP, this.returnToGame, this);
    };
    OptionUi.prototype.returnToGame = function () {
        var self = this;
        egret.Tween.get(this.main_group).to({ scaleX: 0, scaleY: 0 }, 400, egret.Ease.sineIn).call(self.removeSelf, self);
    };
    OptionUi.prototype.saveAndQuit = function () {
        SaveManager.Instance.saveGame();
        GlobalManager.Instance.removeAllObj();
        SceneManager.Instance.setCurScene(new MainMenu());
    };
    OptionUi.prototype.giveUp = function () {
        egret.localStorage.clear();
        this.removeSelf();
        GlobalManager.Instance.removeAllObj();
        SceneManager.Instance.setCurScene(new FailScene());
    };
    OptionUi.prototype.removeSelf = function () {
        if (this && this.parent && this.parent.contains(this)) {
            UiManager.Instance.removeUiFromLayer(this);
        }
    };
    OptionUi.prototype.judgeMusicVolume = function () {
        var curVolume = SoundManager.instance.getSoundVolume();
        if (curVolume <= 0) {
            this.btn_music.selected = true;
            this.slider_music.value = 0;
        }
        else {
            this.btn_music.selected = false;
            this.slider_music.value = curVolume * 10;
        }
    };
    OptionUi.prototype.musicSwitch = function () {
        if (this.btn_music.selected) {
            SoundManager.instance.setSwitchSoundVolume(this.slider_music.value * 0.1);
            SoundManager.instance.setSoundVolume(0);
            this.slider_music.value = 0;
        }
        else {
            var volume = SoundManager.instance.getSwitchSoundVolume();
            this.slider_music.value = volume * 10;
            SoundManager.instance.setSoundVolume(volume);
        }
    };
    OptionUi.prototype.changeMusicVolume = function () {
        var volume = this.slider_music.value * 0.1;
        SoundManager.instance.setSoundVolume(volume);
        if (volume <= 0) {
            this.btn_music.selected = true;
        }
        else {
            this.btn_music.selected = false;
        }
    };
    return OptionUi;
}(BaseUi));
__reflect(OptionUi.prototype, "OptionUi");
//# sourceMappingURL=OptionUi.js.map