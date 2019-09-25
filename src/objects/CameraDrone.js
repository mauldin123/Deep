export default class CameraDrone extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'camera');

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setScale(0.5);
	}

	update(controls) {
		if (controls.left.isDown) {
			this.setVelocityX(-400);
		} else if (controls.right.isDown) {
			this.setVelocityX(400);
		} else {
			this.setVelocityX(0);
		}

		if (controls.up.isDown) {
			this.setVelocityY(-400);
		} else if (controls.down.isDown) {
			this.setVelocityY(400);
		} else {
			this.setVelocityY(0);
		}
	}
}