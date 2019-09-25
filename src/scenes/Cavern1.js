/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern1 extends Phaser.Scene {
  constructor() {
    super('Cavern1');
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
    this.load.image('cavern1', 'cavern1.png');
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.drone = new CameraDrone(this, this.droneX, this.droneY);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern1');

    
  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.y <= 0 && this.drone.x > 290 && this.drone.x < 430) {
      this.scene.start('Cavern2', {
        droneX: this.drone.x,
        droneY: this.cameras.main.height
      });
    }
  }
}
