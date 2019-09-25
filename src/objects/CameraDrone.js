export default class CameraDrone extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'camera');

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setScale(.33)
	}

	update(controls) {



		if (controls.left.isDown) {
			this.setVelocityX(-200);
			this.setDrag(2000);
			this.setTexture(cameraLeft.png)
		} else if (controls.right.isDown) {
			this.setVelocityX(200);
			this.setDrag(2000);
			this.setAngle(0)

		} else {
			this.setVelocityX(0);
			this.setDrag(2000);
		}

		if (controls.up.isDown) {
			this.setVelocityY(-200);
			this.setDrag(2000);
			this.setAngle(-90)
		} else if (controls.down.isDown) {
			this.setVelocityY(200);
			this.setDrag(2000);
			this.setAngle(90)
		} else {
			this.setVelocityY(0);
		}
	}
}
