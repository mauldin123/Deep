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
}
