/*global Phaser*/
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern1 extends Phaser.Scene {
  constructor() {
    super('Cavern1');
  }

  init(data) {
    // Initialization code goes here
    this.drone = new CameraDrone(this, 200, 200);
  }

  preload() {
    this.load.setBaseURL('assets/DeepAssets');
    this.load.spritesheet('camera', 'camera.png');
    this.load.image('cavern1', 'cavern1.png');
  }

  create(data) {
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern1');
    this.physics.add.existing(this.drone);
  }

  update(time, delta) {
    this.drone.update(delta);
  }
}
