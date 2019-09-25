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
    }
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('camera', 'camera.png');
    this.load.image('cavern5', 'cavern5.png');
    this.load.image('ocean', 'oceanBackground.png');
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    this.drone = new CameraDrone(this, this.droneX, this.droneY);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern5');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);
  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.y >= this.cameras.main.height && this.drone.x >= 401 && this.drone.x <= 677) {
      this.scene.start('Cavern3');
    }

    if (this.drone.x <= 0 && this.drone.y >= 207 && this.drone.y <= 362) {
      this.scene.start('Cavern6');
    }
  }
}
