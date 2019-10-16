/*global Phaser*/
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern3 extends Phaser.Scene {
  constructor() {
    super('Cavern3');
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
    this.load.image('cavern3', 'cavern3.png');
    this.load.image('ocean', 'oceanBackground.png');
    this.load.image('mine', 'seaMine.png');
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    this.drone = new CameraDrone(this, this.droneX, this.droneY, this.droneStamina, this.droneFlashlight);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern3');

    // Mines
    let mine = this.physics.add.staticGroup();
    mine.create(555, 655, 'mine').setScale(0.8);
    mine.create(255, 755, 'mine').setScale(0.6);
    mine.create(420, 800, 'mine').setScale(0.4);
    mine.create(800, 720, 'mine').setScale(0.8);

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

    if (this.drone.x <= 0 && this.drone.y >= 380 && this.drone.y <= 527) {
      this.scene.start('Cavern2', {
        droneX: 1002,
        droneY: 500,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlightPower
      });
    }

    if (this.drone.y <= 0 && this.drone.x >= 408 && this.drone.x <= 612) {
      this.scene.start('Cavern5', {
        droneX: 533,
        droneY: 900,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlightPower
      });
    }

    if (this.drone.x >= this.cameras.main.width && this.drone.y >= 734 && this.drone.y <= 819) {
      this.scene.start('Cavern4', {
        droneX: 7,
        droneY: 326,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlightPower
      });
    }
  }
}
