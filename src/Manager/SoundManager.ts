class SoundManager 
{
	private static _instance:SoundManager;

	public static get instance():SoundManager
	{
		if( this._instance == null )
		{
			this._instance = new SoundManager();
		}
		return this._instance;
	}

	private bgSound:egret.Sound;
	private bgSoundChannel:egret.SoundChannel;

	private soundVolume:number = 1;
	private switchMusciVolume:number = 0; //当直接使用音乐开关关闭音乐的时候，在关闭之前的音乐音量

	public constructor() 
	{
			
	}

	public saveSoundVolume()
	{
		egret.localStorage.setItem("soundVolume",this.soundVolume+"");
	}

	public loadSoundVolume()
	{
		var data:number = parseFloat(egret.localStorage.getItem("soundVolume"));
		if(isNaN(data))
		{
			this.soundVolume = 1;
			egret.localStorage.setItem("soundVolume",this.soundVolume+"");
		}
		else
		{
			this.soundVolume = data;
		}
	}

	public setSoundVolume(value:number)
	{
		this.soundVolume = value;
		this.saveSoundVolume();
		if(this.bgSoundChannel)
		{
			this.bgSoundChannel.volume = this.soundVolume;
		}
	}

	public getSoundVolume()
	{
		return this.soundVolume;
	}

	public setSwitchSoundVolume(value:number)
	{
		this.switchMusciVolume = value;
		this.saveSwitchSoundVolume();
	}

	public getSwitchSoundVolume()
	{
		return this.switchMusciVolume;
	}
	
	public saveSwitchSoundVolume()
	{
		egret.localStorage.setItem("switchSoundVolume",this.switchMusciVolume+"");
	}

	public loadSwitchDoundVolume()
	{
		var data:number = Number(egret.localStorage.getItem("switchSoundVolume"));
		if(!data)
		{
			this.switchMusciVolume = 1;
			egret.localStorage.setItem("switchSoundVolume",this.soundVolume+"");
		}
		else
		{
			this.switchMusciVolume = data;
		}
	}

	public startBgMusic( key:string ):void{

		this.stopBgMusic();
		RES.getResAsync( key , this.loadBgMusicHandler , this );
	}

	private loadBgMusicHandler( sound:egret.Sound , url:string ):void{

		this.stopBgMusic();
		this.bgSound = sound;
		this.bgSound.type = egret.Sound.MUSIC;
		this.bgSoundChannel = this.bgSound.play( 0 , 0 );
		this.bgSoundChannel.volume = this.soundVolume;
		this.bgSoundChannel.addEventListener( egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
	}

	public stopBgMusic():void{

		if( this.bgSound )
		{
			this.bgSound = null;
		}
		if( this.bgSoundChannel )
		{
			this.bgSoundChannel.stop();
			this.bgSoundChannel.removeEventListener( egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
			this.bgSoundChannel = null;
		}
	}

	public getBgMusic()
	{
		return this.bgSound;
	}

	private onSoundComplete(event:egret.Event):void 
	{
        //egret.log("bgSoundComplete");
    }

	public playEffect( key:string ):void{

		RES.getResAsync( key , this.loadEffectHandler , this );
	}

	private loadEffectHandler( sound:egret.Sound , url:string ):void{

		sound.type = egret.Sound.EFFECT;
		sound.play( 0 , 1 );
	}
}