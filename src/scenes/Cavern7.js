/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
import CameraDrone from "../objects/CameraDrone.js";
export default class Cavern7 extends Phaser.Scene {
  constructor() {
    super('Cavern7');
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
    this.load.image('cavern7', 'cavern7.png');
    this.load.image('ocean', 'oceanBackground.png');
    this.load.image('ship', 'shipwreck.png')
    this.load.image('coral', 'coral.png')
    this.load.image('seaweed', 'seaweed.png')
  }

  create(data) {
    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    this.drone = new CameraDrone(this, this.droneX, this.droneY);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern7');

    this.add.existing(this.drone);
    this.physics.add.existing(this.drone);

    this.add.image(190, 650, 'ship').setAngle(50).setScale(0.4)
    this.add.image(190, 850, 'seaweed').setAngle(35).setScale(0.4)
    this.add.image(100, 800, 'seaweed').setAngle(10).setScale(0.6)
    this.add.image(911,800,'coral').setAngle(-50).setScale(0.6)
    this.add.image(850,830,'coral').setAngle(-20).setScale(0.5)
    this.add.image(760,850,'coral').setAngle(-10).setScale(0.3)

  }

  update(time, delta) {
    this.drone.update(this.controls);

    /* if (this.drone.y <= 1000 && this.drone.x >= 320 && this.drone.x <= 700) {
      this.scene.start('Cavern6', {
        droneX: 483,
        droneY: 5
      });
    }
    */
    if (this.drone.y <= 0 && this.drone.x >= 350 && this.drone.x <= 600) {
      this.scene.start('EndScene', {
        droneX: 484,
        droneY: 9
      });
    }
  }

}
