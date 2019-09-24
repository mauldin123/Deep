/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern4 extends Phaser.Scene {
  constructor() {
    super('Cavern4');
  }

  init(data) {
    // Initialization code goes here
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('camera', 'camera.png');
    this.load.image('cavern4', 'cavern4 (treasure).png');
  }

  create(data) {
    ChangeScene.addSceneEventListeners(this);
    this.drone = new CameraDrone(this, 200, 200);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern4');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);
  }

  update(time, delta) {
    this.drone.update(delta);
  }
}
