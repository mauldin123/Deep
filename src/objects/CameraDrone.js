import Light from "./Light.js";

export default class CameraDrone extends Phaser.Physics.Matter.Sprite {
	constructor(scene, x, y, stamina, flashlight) {
		super(scene.matter.world, x, y, 'camera', 'idle_1');
		this.stamina = stamina || 100;
		this.flashlightPower = flashlight || 100;
		this.speed = 6;
		this.orientation = 'right';
		this.powerUps = new Map();
		this.flashlight = new Light(this.scene, this.x, this.y);
    this.shield = this.scene.add.sprite(this.x, this.y, 'shapes', 'circle_03')
        .setScale(3)
        .setTint(0x005599)
        .setAlpha(0);
    this.shieldActive = false;

		this.scene.add.existing(this);
		const { Bodies } = Phaser.Physics.Matter.Matter;
		const mainBody = Bodies.rectangle(x, y, this.width, this.height, {
		  isSensor: false
    });

		this.setExistingBody(mainBody)
      .setScale(0.5)
      .setFixedRotation();

		// Animation frames
		this.scene.anims.create({
      key: 'camera-idle',
      frames: [
        {
          key: 'camera',
          frame: 'idle_1'
        },
        {
          key: 'camera',
          frame: 'idle_2'
        }
      ],
      frameRate: 2,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'camera-moving',
      frames: [
        {
          key: 'camera',
          frame: 'moving_1'
        },
        {
          key: 'camera',
          frame: 'moving_2'
        }
      ],
      frameRate: 2,
      repeat: -1
    });
	}

	update(controls) {
	  // If the stamina hits zero, game over
		if (this.stamina <= 0) {
			this.scene.scene.start('MainScene');
		}

		let newOrientation = "";
		let newLightAngle = this.flashlight.angle;
		if (controls.left.isDown) {
			this.setVelocityX(-this.speed);
			newOrientation += 'Left';
			newLightAngle = 90;
		} else if (controls.right.isDown) {
			this.setVelocityX(this.speed);
			newOrientation += 'Right';
			newLightAngle = 270;
		} else {
			this.setVelocityX(0);
		}

		if (controls.up.isDown) {
			this.setVelocityY(-this.speed);
			newOrientation += 'Up';
			newLightAngle = 180;
		} else if (controls.down.isDown) {
			this.setVelocityY(this.speed);
			newOrientation += 'Down';
			newLightAngle = 0;
		} else {
			this.setVelocityY(0);
		}
		if (controls.up.isDown || controls.down.isDown || controls.left.isDown || controls.right.isDown) {
      this.anims.play('camera-moving');
    } else {
		  this.anims.play('camera-idle');
    }

		if (newOrientation !== '' && newOrientation !== this.orientation) {
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
      case 'Left':
        this.setFlipX(false);
        this.setAngle(0);
        break;

      case 'LeftUp':
        this.setFlipX(false);
        this.setAngle(45);
        break;

      case 'Up':
        this.setAngle(this.flipX ? 270 : 90);
        break;

      case 'RightUp':
        this.setFlipX(true);
        this.setAngle(-45);
        break;

      case 'Right':
        this.setFlipX(true);
        this.setAngle(0);
        break;

      case 'RightDown':
        this.setFlipX(true);
        this.setAngle(45);
        break;

      case 'Down':
        this.setAngle(this.flipX ? 90 : 270);
        break;

      case 'LeftDown':
        this.setFlipX(false);
        this.setAngle(-45);
        break;
    }
	}
}
