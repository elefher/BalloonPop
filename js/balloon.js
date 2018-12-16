class Balloon extends Phaser.GameObjects.Sprite {
	constructor(scene, x,y, key) {
		super(scene, x,y, key);
		scene.add.existing(this);
		this.setInteractive();
		this.scaleVal = 1;
		this.scaleMax = 2;
		this.lastActivePointerDuration = 0;
		this.touched = false;

		this.on('pointerdown', e => {
			this.touched = true;
		});

		this.on('pointerup', e => {
			this.touched = false;
			this.scene.saveClickDuration();
			this.scene.getDuration(e);
		});

		this.angle = -15 + Math.random()*30;				// -15 to 15
		this.angleDir = -1 + Math.round(Math.random())*2;	// 1 or -1
	}

	update(time,delta) {
		if(window.game.input.activePointer.isDown && this.touched){
			this.lastActivePointerDuration = Math.round(time - window.game.input.activePointer.downTime);
			this.scaleVal += 0.005;
			this.scene.blowBallon(this, this.scaleVal);
		}

		this.x += this.angle/20;
		if(this.x<64) this.x = 64;
		if(this.x>(this.scene.sys.game.config.width-64)) this.x = this.scene.sys.game.config.width-64;

		this.angle += this.angleDir/5;
		if(this.angle>25 || this.angle<-25) this.angleDir *= -1;

		this.y = this.scene.sys.game.config.height / 2;
	}
}
