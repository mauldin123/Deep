/*global Phaser*/
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern5 extends Phaser.Scene {
  constructor() {
    super('Cavern5');
  }

  init(data) {
    // Initialization code goes here
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('camera', 'camera.png');
    this.load.image('cavern5', 'cavern5.png');
  }

  create(data) {
    this.drone = new CameraDrone(this, 200, 200);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern5');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);
  }

  update(time, delta) {
    this.drone.update(delta);
  }
}
