import Light from "./Light.js";

export default class CameraDrone extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, stamina, flashlight) {
		super(scene, x, y, 'camera');
		this.stamina = stamina || 100;
		this.flashlightPower = flashlight || 100;
		this.speed = 300;
		this.orientation = 'right';
		this.powerUps = new Map();
		this.flashlight = new Light(this.scene, this.x, this.y);
        this.shield = this.scene.add.sprite(this.x, this.y, 'shapes', 'circle_03')
            .setScale(3)
            .setTint(0x005599)
            .setAlpha(0);
        this.shieldActive = false;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setScale(0.25);
	}

	update(controls) {
		if (this.stamina <= 0) {
			this.scene.scene.start('Cavern1');
		}

		let newOrientation = this.orientation;
		let newLightAngle = this.flashlight.angle;
		if (controls.left.isDown) {
			this.setVelocityX(-this.speed);
			this.setDrag(2000);
			newOrientation = 'Left';
			newLightAngle = 90;
		} else if (controls.right.isDown) {
			this.setVelocityX(this.speed);
			this.setDrag(2000);
			newOrientation = 'Right';
			newLightAngle = 270;
		} else {
			this.setVelocityX(0);
			this.setDrag(2000);
		}

		if (controls.up.isDown) {
			this.setVelocityY(-this.speed);
			this.setDrag(2000);
			newOrientation = 'Up';
			newLightAngle = 180;
		} else if (controls.down.isDown) {
			this.setVelocityY(this.speed);
			this.setDrag(2000);
			newOrientation = 'Down';
			newLightAngle = 0;
		} else {
			this.setVelocityY(0);
		}

		if (newOrientation !== this.orientation) {
			this.setOrientation(newOrientation);
		}

		if (this.flashlightPower >= 0) {
			this.flashlight.setOn(controls.space.isDown);
		} else {
			this.flashlight.setOn(false);
		}
		this.flashlight.update(this, newLightAngle);

		this.shield.setPosition(this.x, this.y);
		this.powerUps.forEach((v, k, m) => {
			if (k === 'Shield') {
				if (v.length > 0) {
					this.shieldActive = true;
					this.shield.setAlpha(0.7);
				} else {
					this.shieldActive = false;
					this.shield.setAlpha(0);
				}
			}
		});
	}

	/** @private */
	setOrientation(newOrientation) {
		this.orientation = newOrientation;
		switch (this.orientation) {
            default:
            case 'Right':
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
