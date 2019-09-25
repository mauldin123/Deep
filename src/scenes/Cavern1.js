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
    this.load.image('cameraDown', 'cameraDown.png');
    this.load.image('cameraLeft', 'cameraLeft.png');
    this.load.image('cameraUp', 'cameraUp.png');
    this.load.image('ocean', 'oceanBackground.png');
    this.load.image('cavern1', 'cavern1.png');
    this.load.image('coral', 'coral.png');
    this.load.image('seaweed', 'seaweed.png');
    this.load.image('vent', 'vocanicVent.png');
    this.load.image('angler', 'angler.png');
    this.load.image('leftAngler', 'leftAngler.png');
    this.load.image('bubbles', './Bubbles/shapes.png')
  }

  create(data) {
    var cavern;
    var seaweed;
    var coral;

    this.controls = this.input.keyboard.createCursorKeys();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');
    this.drone = new CameraDrone(this, this.droneX, this.droneY);

    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'cavern1');

    //Add thermal vent
    var vent = this.add.sprite(535, 800, 'vent')
    vent.setScale(.4)

    var bubbles = this.add.particles('bubbles')

    var emitter = bubbles.createEmitter({
      lifespan: 200,
      speedX: {min: -300, max: 300 },
      speedY: { min: -300, max: -300 },
      scale: { start: 1, end: 0},
    });
    emitter.setPosition(530, 690).setScale(0.2);

    this.add.image(130, 782, 'coral').setAngle(45).setScale(.6)
    this.add.image(860, 760, 'coral').setAngle(-47).setScale(.7)
    this.add.image(300, 800, 'seaweed').setAngle(20).setScale(.8)
    this.add.image(780, 870, 'seaweed').setAngle(-20).setScale(.4)

    var a1 = this.add.sprite(249, 100, "angler").setScale(.3);
    this.tweens.add({
      targets: a1,
      x: 800,
      y: 200,
      ease: "linear",
      delay: 1000,
      yoyo: true,
      repeat: -1,
    });

    this.timeScale = 0.1

    var a2 = this.add.sprite(849, 600, "leftAngler").setScale(.45);
    this.tweens.add({
      targets: a2,
      x: 200,
      y: 600,
      ease: "linear",
      delay: 1000,
      yoyo: true,
      repeat: -1,

    });

  }

  update(time, delta) {
    this.drone.update(this.controls);

    if (this.drone.y <= 0 && this.drone.x > 290 && this.drone.x < 628) {
      this.scene.start('Cavern2', {
        droneX: 529,
        droneY: 931
      });
    }
  }
}
