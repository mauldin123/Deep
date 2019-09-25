export default class CameraDrone extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, stamina, flashlight) {
		super(scene, x, y, 'camera');
		this.stamina = stamina || 100;
		this.flashlight = flashlight || 100;
		this.speed = 250;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setScale(0.25);
	}

	update(controls) {



		if (controls.left.isDown) {
			this.setVelocityX(-this.speed);
			this.setDrag(2000);
			this.setTexture('cameraLeft');
		} else if (controls.right.isDown) {
			this.setVelocityX(this.speed);
			this.setDrag(2000);
			this.setTexture('camera');

		} else {
			this.setVelocityX(0);
			this.setDrag(2000);
		}

		if (controls.up.isDown) {
			this.setVelocityY(-this.speed);
			this.setDrag(2000);
			this.setTexture('cameraUp');
		} else if (controls.down.isDown) {
			this.setVelocityY(this.speed);
			this.setDrag(2000);
			this.setTexture('cameraDown');
		} else {
			this.setVelocityY(0);
		}
	}
}
