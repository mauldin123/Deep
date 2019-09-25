/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern5 extends Phaser.Scene {
  constructor() {
    super('Cavern5');
  }

  init(data) {
    // Initialization code goes here
    this.droneX = this.cameras.main.width / 2;
    this.droneY = this.cameras.main.height / 2;
    if (data !== undefined) {
      this.droneX = data.droneX || this.cameras.main.width / 2;
      this.droneY = data.droneY || this.cameras.main.height / 2;
      this.droneStamina = data.droneStamina;
      this.droneFlashlight = data.droneFlashlight;
    }
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('camera', 'camera.png');
    this.load.image('cavern5', 'cavern5.png');
    this.load.image('ocean', 'oceanBackground.png');
    this.load.image('seaweed', 'seaweed.png')
    this.load.image('coral', 'coral.png')
    this.load.image('vent', 'vocanicVent.png')
    this.load.image('eel', 'eel.png');
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    this.drone = new CameraDrone(this, this.droneX, this.droneY, this.droneStamina, this.droneFlashlight);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern5');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);

    // Add foliage to perimeter
    this.add.image(130, 782, 'coral').setAngle(45).setScale(.6)
    this.add.image(860, 760, 'coral').setAngle(-47).setScale(.7)
    this.add.image(300, 800, 'seaweed').setAngle(20).setScale(.8)
    this.add.image(780, 870, 'seaweed').setAngle(-20).setScale(.4)
    this.add.image(160,142,'seaweed').setScale(0.5).setAngle(-250)
    this.add.image(95,203,'seaweed').setScale(0.6).setAngle(-270)
    this.add.image(890,142,'seaweed').setScale(0.5).setAngle(-90)
    this.add.image(940,203,'seaweed').setScale(0.6).setAngle(-100)
    this.add.image(123,850,'seaweed').setScale(0.6).setAngle(30)
    this.add.image(800,865,'seaweed').setScale(0.4).setAngle(-20)
    this.add.image(950,850,'seaweed').setScale(0.5).setAngle(-10)
    this.add.image(270,90,'seaweed').setScale(0.2).setAngle(-200)
    this.add.image(250,80,'seaweed').setScale(0.1).setAngle(-200)
    this.add.image(130, 500, 'vent').setScale(.3).setAngle(90)
    this.add.image(190, 850, 'seaweed').setAngle(35).setScale(0.4)
    this.add.image(100, 800, 'seaweed').setAngle(10).setScale(0.6)
    this.add.image(800,100,'coral').setAngle(-110).setScale(0.6)
    this.add.image(700,90,'coral').setAngle(-150).setScale(0.5)
    this.add.image(600,80,'coral').setAngle(-180).setScale(0.3)

    //eel
    var e1 = this.add.sprite(249, 100, "eel").setScale(.15).setAngle(45);
    this.tweens.add({
      targets: e1,
      x: 800,
      y: 700,
      yoyo: true,
      repeat: -1,
      ease: "linear",

    });

    var e2 = this.add.sprite(249, 900, "eel").setScale(.15);
    this.tweens.add({
      targets: e2,
      x: 800,
      y: 200,
      yoyo: true,
      delay: 1500,
      repeat: -1,
      ease: "linear",

    });

    this.staminaText = this.add.text(
      this.cameras.main.width - 20,
      16,
      `Stamina:\t${this.drone.stamina}`,
      {
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);

    this.flashlightText = this.add.text(
      this.cameras.main.width - 20,
      40,
      `Flashligh:\t${this.drone.flashlight}`,
      {
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);

  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.y >= this.cameras.main.height && this.drone.x >= 401 && this.drone.x <= 677) {
      this.scene.start('Cavern3', {
        droneX: 506,
        droneY: 31,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlight
      });
    }

    if (this.drone.x <= 0 && this.drone.y >= 207 && this.drone.y <= 362) {
      this.scene.start('Cavern6', {
        droneX: 938,
        droneY: 550,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlight
      });
    }
  }
}
