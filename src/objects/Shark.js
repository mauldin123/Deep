export default class Shark extends Phaser.Physics.Matter.Sprite {
	constructor(
		scene,
		x,
		y,
		size,  //size should always be 1 or greater
		speed
	) {
		super(scene.matter.world, x, y, 'shark');
		this.speed = speed + 4;
		this.sight = 400;

		this.scene.add.existing(this);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    const mainBody = Bodies.rectangle(x, y, this.width, this.height, {
      isSensor: true
    });

    this.setExistingBody(mainBody)
      .setScale(size)
      .setFixedRotation();
		// this.scene.physics.add.existing(this);
		// this.setScale(size);
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
        } else if (target.distance(this.getCenter()) >= this.sight + 50) {
            this.setVelocity(0);
            return;
        }
        let velocityVec = target.subtract(this.getCenter())
            .normalize() // Makes a unit vector
            .scale(-this.speed); // Scales the unit vector so its speed is constant
        this.setVelocity(velocityVec.x, velocityVec.y);
	}
}
