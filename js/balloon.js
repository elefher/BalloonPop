class Balloon extends Phaser.GameObjects.Sprite {
	constructor(scene, x,y, key) {
		super(scene, x,y, key);
		scene.add.existing(this);
		this.setInteractive();
		this.blowBallon = false;
		this.scaleVal = 1;
		this.scaleMax = 2;

		this.on('pointerdown', e => {
			this.blowBallon = true;
		});

		this.on('pointerup', e => {
			this.blowBallon = false;
			this.scene.getDuration(e);
		});

		this.angle = -15 + Math.random()*30;				// -15 to 15
		this.angleDir = -1 + Math.round(Math.random())*2;	// 1 or -1
	}

	// update(time,delta) {
	// 	if(this.y<-64) return this.scene.gameOver();
	//
	// 	this.x += this.angle/20;
	// 	if(this.x<64) this.x = 64;
	// 	if(this.x>(this.scene.sys.game.config.width-64)) this.x = this.scene.sys.game.config.width-64;
	//
	// 	this.angle += this.angleDir/5;
	// 	if(this.angle>25 || this.angle<-25) this.angleDir *= -1;
	//
	// 	this.y -= this.speed;
	// }

	update(time,delta) {
		if(this.blowBallon){
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
