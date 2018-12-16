class PlayScene extends Phaser.Scene {
	constructor() {
		super({key: 'play', active: true});
	}

	preload() {
		this.load.image('sky', 'assets/img/skyCloud.png');
		// this.load.image('balloon-red', 'assets/img/balloon-red.png');
		// this.load.image('balloon-blue', 'assets/img/balloon-blue.png');
		this.load.image('balloon-yellow', 'assets/img/balloon-yellow.png');
		// this.load.image('balloon-green', 'assets/img/balloon-green.png');
		// this.load.image('balloon-purple', 'assets/img/balloon-purple.png');
		this.load.audio('pop', 'assets/audio/pop.mp3');
	}

	create() {
		this.sky = this.add.image(0, 0, 'sky');
		this.sky.setOrigin(0, 0);
		this.sky.setScale(3, 3);

		this.balloons = [];
		this.duration = 0;
		this.durations = [];
		this.clickDuration = 0;
		this.totalClickDuration = 0;
		this.startPointArrayText = 150;

		// this.scoreText = this.add.text(50, 50, '', {fontFamily: 'Arial Black', fontSize: 74, color: '#c51b7d'});
		this.scoreText = this.getNewScoreText(50, 50);
		this.scoreText.setStroke('#de77ae', 5);
		this.scoreText.setShadow(2, 2, '#333333', 2, true, false);

		this.popSound = this.sound.add('pop');

		this.startGame();
	}

	getDuration(pointer) {
		this.clickDuration = Math.round(pointer.upTime - pointer.downTime);
	}

	startGame() {
		this.addBalloon((this.sys.game.config.width) / 2, this.sys.game.config.height);
	}

	addBalloon(x, y) {
		// if (!x) x = Math.floor(Math.random() * (this.sys.game.config.width - 128)) + 64;
		let maxScale = 2;
		var balloon = new Balloon(this, x, y, 'balloon-yellow', maxScale);
		// balloon.speed = 0.25 + Math.random() + (this.score / 10);
		this.balloons.push(balloon);
	}

	blowBallon(balloon, scaleVal) {
		if(!this.ballonHealthIsGood(balloon, scaleVal)){
			this.killBalloon(balloon);
		}

		balloon.setScale(scaleVal, scaleVal);
	}

	ballonHealthIsGood(balloon, scaleVal){
		return scaleVal > balloon.scaleMax ? false : true
	}

	// initBalloon(balloon){
	// 	var tweenInitBalloon = this.tweens.add({
	// 		targets: balloon,
	// 		scaleX: 1,
	// 		scaleY: 1,
	// 		duration: 2000,
	// 		delay: 500,
	// 	});
	// }

	killBalloon(balloon) {
		this.popSound.play();
		this.balloons = this.balloons.filter(b => b !== balloon);
		var tweenDestroyBalloon = this.tweens.add({
			targets: balloon,
			scaleX: 0,
			scaleY: 0,
			duration: 150,
			delay: 100,
			onComplete: () => balloon.destroy()
		});
	}

	// gameOver() {
	// 	this.cameras.main.shake(500);
	// 	this.balloons.forEach(b => this.killBalloon(b));
	// 	this.score = 0;
	// 	this.startGame();
	// }

	saveClickDuration(){
		let l = this.durations.length;
		let y = this.startPointArrayText;
		if(l){
			y = (l * 50) + y;
		}
		let t = 'Click Duration: ' + this.balloons[0].lastActivePointerDuration;
		this.durations.push(this.getNewScoreText(50, y, t));
	}

	getNewScoreText(x, y, text = ''){
		return this.add.text(x, y, text, {fontFamily: 'Arial Black', fontSize: 30, color: '#c51b7d'});
	}

	update(time, delta) {
		if(this.balloons[0]){
			this.duration = this.balloons[0].lastActivePointerDuration;
			this.balloons[0].update(time, delta);
		}
		this.scoreText.setText(' Last Click Duration: ' + this.duration);
	}
}
