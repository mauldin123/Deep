/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern6 extends Phaser.Scene {
  constructor() {
    super('Cavern6');
  }

  init(data) {
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
    this.load.image('cavern6', 'cavern6.png');
    this.load.image('ocean', 'oceanBackground.png');
    this.load.image('coral', 'coral.png');
    this.load.image('seaweed', 'seaweed.png');
    this.load.image('vent', 'vocanicVent.png');
    this.load.image('mine', 'seaMine.png');
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    this.drone = new CameraDrone(this, this.droneX, this.droneY, this.droneStamina, this.droneFlashlight);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern6');

    // let coral = this.physics.add.staticGroup();
    // let seaweed = this.physics.add.staticGroup();
    let vent = this.physics.add.staticGroup();
    let mine = this.physics.add.staticGroup();

    // Environment objects
    vent.create(100, 510, 'vent').setAngle(90).setScale(0.3);
    mine.create(555, 615, 'mine').setScale(0.8);
    mine.create(255, 755, 'mine').setScale(0.6);
    mine.create(420, 800, 'mine').setScale(0.4);
    mine.create(800, 720, 'mine').setScale(0.8);

    // Display text for the health and flashlight battery
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
      `Flashlight:\t${this.drone.flashlight}`,
      {
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);
  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.x >= this.cameras.main.height && this.drone.y >= 450 && this.drone.y <= 660) {
      this.scene.start('Cavern5', {
        droneX: 70,
        droneY: 300,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlight
      });
    }
    if (this.drone.y <= 0 && this.drone.x >= 350 && this.drone.x <= 600) {
      this.scene.start('Cavern7', {
        droneX: 500,
        droneY: 850,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlight
      });
    }
  }
}
