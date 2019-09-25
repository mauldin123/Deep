/*global Phaser*/
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern4 extends Phaser.Scene {
  constructor() {
    super('Cavern4');
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
    this.load.image('cavern4', 'cavern4 (treasure).png');
    this.load.image('ocean', 'oceanBackground.png');
    this.load.image('treasure', 'treasureChest.png');
    this.load.image('seaweed', 'seaweed.png');
    this.load.image('vent', 'vocanicVent.png');


  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    this.drone = new CameraDrone(this, this.droneX, this.droneY, this.droneStamina, this.droneFlashlight);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern4');

    // Environment objects
    this.add.image(900,700, 'treasure').setScale(0.5);
    this.add.image(160,142,'seaweed').setScale(0.5).setAngle(-250);
    this.add.image(95,203,'seaweed').setScale(0.6).setAngle(-270);
    this.add.image(890,142,'seaweed').setScale(0.5).setAngle(-90);
    this.add.image(940,203,'seaweed').setScale(0.6).setAngle(-100);
    this.add.image(123,850,'seaweed').setScale(0.6).setAngle(30);
    this.add.image(800,865,'seaweed').setScale(0.4).setAngle(-20);
    this.add.image(950,850,'seaweed').setScale(0.5).setAngle(-10);
    this.add.image(270,90,'seaweed').setScale(0.2).setAngle(-200);
    this.add.image(250,80,'seaweed').setScale(0.1).setAngle(-200);

    // Add thermal vent
    this.add.image(200,860, 'vent').setScale(0.2).setAngle(20);

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
      `Flashlight:\t${this.drone.flashlight}`,
      {
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);

  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.x <= 0 && this.drone.y >= 280 && this.drone.y <= 377) {
      this.scene.start('Cavern3', {
        droneX: 968,
        droneY: 766,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlight
      });
    }
  }
}
