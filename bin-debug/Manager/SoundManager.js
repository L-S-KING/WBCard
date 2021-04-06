var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this.soundVolume = 1;
        this.switchMusciVolume = 0; //当直接使用音乐开关关闭音乐的时候，在关闭之前的音乐音量
    }
    Object.defineProperty(SoundManager, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new SoundManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.saveSoundVolume = function () {
        egret.localStorage.setItem("soundVolume", this.soundVolume + "");
    };
    SoundManager.prototype.loadSoundVolume = function () {
        var data = parseFloat(egret.localStorage.getItem("soundVolume"));
        if (isNaN(data)) {
            this.soundVolume = 1;
            egret.localStorage.setItem("soundVolume", this.soundVolume + "");
        }
        else {
            this.soundVolume = data;
        }
    };
    SoundManager.prototype.setSoundVolume = function (value) {
        this.soundVolume = value;
        this.saveSoundVolume();
        if (this.bgSoundChannel) {
            this.bgSoundChannel.volume = this.soundVolume;
        }
    };
    SoundManager.prototype.getSoundVolume = function () {
        return this.soundVolume;
    };
    SoundManager.prototype.setSwitchSoundVolume = function (value) {
        this.switchMusciVolume = value;
        this.saveSwitchSoundVolume();
    };
    SoundManager.prototype.getSwitchSoundVolume = function () {
        return this.switchMusciVolume;
    };
    SoundManager.prototype.saveSwitchSoundVolume = function () {
        egret.localStorage.setItem("switchSoundVolume", this.switchMusciVolume + "");
    };
    SoundManager.prototype.loadSwitchDoundVolume = function () {
        var data = Number(egret.localStorage.getItem("switchSoundVolume"));
        if (!data) {
            this.switchMusciVolume = 1;
            egret.localStorage.setItem("switchSoundVolume", this.soundVolume + "");
        }
        else {
            this.switchMusciVolume = data;
        }
    };
    SoundManager.prototype.startBgMusic = function (key) {
        this.stopBgMusic();
        RES.getResAsync(key, this.loadBgMusicHandler, this);
    };
    SoundManager.prototype.loadBgMusicHandler = function (sound, url) {
        this.stopBgMusic();
        this.bgSound = sound;
        this.bgSound.type = egret.Sound.MUSIC;
        this.bgSoundChannel = this.bgSound.play(0, 0);
        this.bgSoundChannel.volume = this.soundVolume;
        this.bgSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    SoundManager.prototype.stopBgMusic = function () {
        if (this.bgSound) {
            this.bgSound = null;
        }
        if (this.bgSoundChannel) {
            this.bgSoundChannel.stop();
            this.bgSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            this.bgSoundChannel = null;
        }
    };
    SoundManager.prototype.getBgMusic = function () {
        return this.bgSound;
    };
    SoundManager.prototype.onSoundComplete = function (event) {
        //egret.log("bgSoundComplete");
    };
    SoundManager.prototype.playEffect = function (key) {
        RES.getResAsync(key, this.loadEffectHandler, this);
    };
    SoundManager.prototype.loadEffectHandler = function (sound, url) {
        sound.type = egret.Sound.EFFECT;
        sound.play(0, 1);
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map