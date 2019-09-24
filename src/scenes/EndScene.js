/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  init(data) {
    // Initialization code goes here
  }

  preload() {
    this.load.setBaseURL('DeepAssets');

    this.load.image('EndScene', 'endScene.png');
  }

  create(data) {

    ChangeScene.addSceneEventListeners(this);
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'EndScene');


  }

  update(time, delta) {

  }
}
