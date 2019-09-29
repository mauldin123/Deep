export default class CameraDrone extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, stamina, flashlight) {
		super(scene, x, y, 'camera');
		this.stamina = stamina || 100;
		this.flashlight = flashlight || 100;
		this.speed = 250;
		this.orientation = "right";

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setScale(0.25);
	}

	update(controls) {
		if (this.stamina <= 0) {
			this.scene.scene.start('Cavern1');
		}

		let newOrientation;
		if (controls.left.isDown) {
			this.setVelocityX(-this.speed);
			this.setDrag(2000);
			newOrientation = 'Left';
		} else if (controls.right.isDown) {
			this.setVelocityX(this.speed);
			this.setDrag(2000);
			newOrientation = 'Right';
		} else {
			this.setVelocityX(0);
			this.setDrag(2000);
		}

		if (controls.up.isDown) {
			this.setVelocityY(-this.speed);
			this.setDrag(2000);
			newOrientation = 'Up';
		} else if (controls.down.isDown) {
			this.setVelocityY(this.speed);
			this.setDrag(2000);
			newOrientation = 'Down';
		} else {
			this.setVelocityY(0);
		}

		if (newOrientation !== undefined && newOrientation !== this.orientation) {
			this.setOrientation(newOrientation);
		}
	}

	setOrientation(newOrientation) {
		this.orientation = newOrientation;
		switch (this.orientation) {
			case 'Right':
			default:
				this.setTexture('camera');
				break;

			case 'Left':
			case 'Up':
			case 'Down':
				this.setTexture('camera' + this.orientation);
				break;
		}

		this.body.setSize();
	}
}
