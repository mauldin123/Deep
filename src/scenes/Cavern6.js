/*global Phaser*/
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern6 extends Phaser.Scene {
  constructor() {
    super('Cavern6');
  }

  init(data) {
    // Initialization code goes here
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('camera', 'camera.png');
    this.load.image('cavern6', 'cavern6.png');
  }

  create(data) {
    this.drone = new CameraDrone(this, 200, 200);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern6');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);
  }

  update(time, delta) {
    this.drone.update(delta);
  }
}
