export default class CameraDrone extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'camera');

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
<<<<<<< HEAD
		this.setScale(.33)
=======
		this.setScale(0.5);
>>>>>>> 0507eb61d7ef1db28fa1e5d7ed4646db54ed6349
	}

	update(controls) {



		if (controls.left.isDown) {
<<<<<<< HEAD
			this.setVelocityX(-200);
			this.setDrag(2000);
			this.setTexture(cameraLeft.png)
		} else if (controls.right.isDown) {
			this.setVelocityX(200);
			this.setDrag(2000);
			this.setAngle(0)

=======
			this.setVelocityX(-400);
		} else if (controls.right.isDown) {
			this.setVelocityX(400);
>>>>>>> 0507eb61d7ef1db28fa1e5d7ed4646db54ed6349
		} else {
			this.setVelocityX(0);
			this.setDrag(2000);
		}

		if (controls.up.isDown) {
<<<<<<< HEAD
			this.setVelocityY(-200);
			this.setDrag(2000);
			this.setAngle(-90)
		} else if (controls.down.isDown) {
			this.setVelocityY(200);
			this.setDrag(2000);
			this.setAngle(90)
=======
			this.setVelocityY(-400);
		} else if (controls.down.isDown) {
			this.setVelocityY(400);
>>>>>>> 0507eb61d7ef1db28fa1e5d7ed4646db54ed6349
		} else {
			this.setVelocityY(0);
		}
	}
}
