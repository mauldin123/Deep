/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern4 extends Phaser.Scene {
  constructor() {
    super('Cavern4');
  }

  init(data) {
    // Initialization code goes here
    this.droneX = this.cameras.main.width / 2;
    this.droneY = this.cameras.main.height / 2;
    if (data !== undefined) {
      this.droneX = data.droneX || this.cameras.main.width / 2;
      this.droneY = data.droneY || this.cameras.main.height / 2;
    }
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('camera', 'camera.png');
    this.load.image('cavern4', 'cavern4 (treasure).png');
    this.load.image('ocean', 'oceanBackground.png');
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    this.drone = new CameraDrone(this, this.droneX, this.droneY);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern4');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);
  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.x <= 0 && this.drone.y >= 280 && this.drone.y <= 377) {
      this.scene.start('Cavern3');
    }
  }
}
