export default class Jellyfish extends Phaser.Physics.Matter.Sprite {
	constructor(
		scene,
		x,
		y,
		size,  //size should always be between 0.2 and 0.35
		speed
	) {
		super(scene.matter.world, x, y, 'jellyfish');
		this.speed = speed;
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
	}

	flee(obj) {
				let target = obj.getCenter();
				if (target.distance(this.getCenter()) >= this.sight + 50) {
						this.setVelocity(0);
						return;
				}
	}
}
