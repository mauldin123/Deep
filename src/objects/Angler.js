export default class Angler extends Phaser.Physics.Arcade.Sprite {
	constructor(
		scene,
		xStart,
		yStart,
		xEnd,
		yEnd,
		size,
		speed
	) {
		super(scene, xStart, yStart, 'angler');
		this.speed = speed;
		this.sight = 300;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setScale(size);
		// let duration = Phaser.Math.Distance.Between(xEnd, yEnd, xStart, yStart) / speed;
		// this.scene.tweens.add({
		// 	targets: this,
		// 	x: xEnd,
		// 	y: yEnd,
		// 	delay: 1000,
		// 	duration: duration,
		// 	yoyo: true,
		// 	repeat: -1
		// });
	}

	follow(obj) {
		let target = obj.getCenter();
		if (target.distance(this.getCenter()) < 5) {
			return;
		} else if (target.distance(this.getCenter()) >= this.sight) {
			this.setVelocity(0);
			return;
		}
		let velocityVec = target.subtract(this.getCenter())
			.normalize() // Makes a unit vector
			.scale(this.speed); // Scales the unit vector so its speed is constant
		this.setVelocity(velocityVec.x, velocityVec.y);
	}

	flee(obj) {
        let target = obj.getCenter();
        if (target.distance(this.getCenter()) < 5) {
            return;
        } else if (target.distance(this.getCenter()) >= this.sight) {
            this.setVelocity(0);
            return;
        }
        let velocityVec = target.subtract(this.getCenter())
            .normalize() // Makes a unit vector
            .scale(-this.speed); // Scales the unit vector so its speed is constant
        this.setVelocity(velocityVec.x, velocityVec.y);
	}
}