/*global Phaser*/
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern3 extends Phaser.Scene {
  constructor() {
    super('Cavern3');
  }

  init(data) {
    // Initialization code goes here
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('camera', 'camera.png');
    this.load.image('cavern3', 'cavern3.png');
  }

  create(data) {
    this.drone = new CameraDrone(this, 200, 200);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern3');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);
  }

  update(time, delta) {
    this.drone.update(delta);

    if (this.drone.x <= 0 && this.drone.y >= 380 && this.drone.y <= 527) {
      this.scene.start('Cavern2');
    }

    if (this.drone.y <= 0 && this.drone.x >= 408 && this.drone.x <= 612) {
      this.scene.start('Cavern5');
    }

    if (this.drone.x >= this.cameras.main.width && this.drone.y >= 734 && this.drone.y <= 819) {
      this.scene.start('Cavern4');
    }
  }
}
