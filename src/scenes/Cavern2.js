/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern2 extends Phaser.Scene {
  constructor() {
    super('Cavern2');
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
    this.load.image('cavern2', 'cavern2.png');
    this.load.image('ocean', 'oceanBackground.png');
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    this.drone = new CameraDrone(this, this.droneX, this.droneY);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern2');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);
  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.y >= this.cameras.main.height && this.drone.x > 400 && this.drone.x <= 678) {
      this.scene.start('Cavern1', {
        droneX: this.drone.x,
        droneY: 0
      });
    }

    if (this.drone.x >= this.cameras.main.width && this.drone.y >= 378 && this.drone.y <= 640) {
      this.scene.start('Cavern3', {
        droneX: 0,
        droneY: this.drone.y
      });
    }
  }
}
