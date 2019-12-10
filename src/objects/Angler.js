export default class Angler extends Phaser.Physics.Matter.Sprite {
	constructor(
		scene,
		x,
		y,
		size,
		speed
	) {
		super(scene.matter.world, x, y, 'angler');
		this.speed = speed / 60;
		this.sight = 400;

		this.scene.add.existing(this);

		const { Bodies } = Phaser.Physics.Matter.Matter;
		const mainBody = Bodies.rectangle(x, y, this.width, this.height, {
		  isSensor: true
    });

		this.setExistingBody(mainBody)
      .setScale(size)
      .setFixedRotation();
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
        if (target.distance(this.getCenter()) >= this.sight + 50) {
            this.setVelocity(0);
            return;
        }

        let velocityVec = target.subtract(this.getCenter())
            .normalize() // Makes a unit vector
            .scale(-this.speed); // Scales the unit vector so its speed is constant
        this.setVelocity(velocityVec.x, velocityVec.y);
	}
}
