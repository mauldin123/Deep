/*global Phaser*/
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern2 extends Phaser.Scene {
  constructor() {
    super('Cavern2');
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
    this.load.image('cavern2', 'cavern2.png');
    this.load.image('ocean', 'oceanBackground.png');
    this.load.image('coral', 'coral.png');
    this.load.image('seaweed', 'seaweed.png');
    this.load.image('vent', 'vocanicVent.png');
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    
    this.drone = new CameraDrone(
      this, 
      this.droneX, 
      this.droneY, 
      this.droneStamina, 
      this.droneFlashlight
    );

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern2');
    let coral = this.physics.add.staticGroup();
    let seaweed = this.physics.add.staticGroup();
    let vent = this.physics.add.staticGroup();

    // Environment objects
    coral.create(855, 755, 'coral').setAngle(-45).setScale(0.5);
    vent.create(300, 810, 'vent').setAngle(30).setScale(0.3);
    seaweed.create(100, 600, 'seaweed').setAngle(45).setScale(0.5);
    seaweed.create(90, 650, 'seaweed').setAngle(45).setScale(0.5);
    seaweed.create(100, 658, 'seaweed').setAngle(45).setScale(0.5);
    seaweed.create(100, 658, 'seaweed').setAngle(70).setScale(0.5);
    seaweed.create(50, 558, 'seaweed').setAngle(70).setScale(0.5);
    seaweed.create(120, 720, 'seaweed').setAngle(60).setScale(0.5);

    // Display text for the health and flashlight battery
    this.staminaText = this.add.text(
      this.cameras.main.width - 20,
      16,
      `Power:\t${this.drone.stamina}`,
      {
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);

    this.flashlightText = this.add.text(
      this.cameras.main.width - 20,
      40,
      `Flashlight:\t${this.drone.flashlightPower}`,
      {
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);
  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.y >= this.cameras.main.height && this.drone.x > 400 && this.drone.x <= 678) {
      this.scene.start('Cavern1', {
        droneX: 461,
        droneY: 7,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlightPower
      });
    }

    if (this.drone.x >= this.cameras.main.width && this.drone.y >= 378 && this.drone.y <= 640) {
      this.scene.start('Cavern3', {
        droneX: 3,
        droneY: 455,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlightPower
      });
    }
  }
}
