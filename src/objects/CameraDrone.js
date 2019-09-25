export default class CameraDrone extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'camera');
	}

	update(controls) {
		if (controls.left.isDown) {
			this.setVelocityX(-100);
		} else if (controls.right.isDown) {
			this.setVelocityX(100);
		} else {
			this.setVelocityX(0);
		}

		if (controls.up.isDown) {
			this.setVelocityY(-100);
		} else if (controls.down.isDown) {
			this.setVelocityY(100);
		} else {
			this.setVelocityY(0);
		}
	}
}