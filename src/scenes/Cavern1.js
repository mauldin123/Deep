/*global Phaser*/
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern1 extends Phaser.Scene {
  constructor() {
    super('Cavern1');
  }

  init(data) {
    // Initialization code goes here
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('camera', 'camera.png');
    this.load.image('cavern1', 'cavern1.png');
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.drone = new CameraDrone(this, 200, 200);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern1');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);
  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.y <= 0 && this.drone.x > 290 && this.drone.x < 330) {
      this.scene.start('Cavern2');
    }
  }
}
