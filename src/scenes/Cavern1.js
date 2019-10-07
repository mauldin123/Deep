/*global Phaser*/
import CameraDrone from '../objects/CameraDrone.js';
import Angler from '../objects/Angler.js';
import {getPositionInCanvas, setPositionInCanvas, FONT_FAMILY} from "../utils.js";


export default class Cavern1 extends Phaser.Scene {
  constructor() {
    super('Cavern1');
  }

  init(data) {
    this.droneX = this.cameras.main.width / 2;
    this.droneY = this.cameras.main.height / 2;
    if (data !== undefined) {
      this.droneX = data.droneX || this.cameras.main.width / 2;
      this.droneY = data.droneY || this.cameras.main.height / 2;
      this.droneStamina = data.droneStamina;
      this.droneFlashlight = data.droneFlashlight;
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
      this.load.image('bubbles', './Bubbles/shapes.png');
      this.load.image('tiles', 'cavernTiles.png');
      this.load.image('tilesInverse', 'inverseCavern.png');
      this.load.image('tilesBig', 'cavernTileBig.png');
      this.load.tilemapCSV('map', 'DeepMap.csv');
      this.load.tilemapTiledJSON('jsonMap', 'DeepMap.json');
  }

  create(data) {
    let map = this.make.tilemap({
      key: 'map',
      tileHeight: 200,
      tileWidth: 200
    });
    let tiles = map.addTilesetImage('tilesBig');

    this.controls = this.input.keyboard.createCursorKeys();

    // this.wavePipeline = this.game.renderer.getPipeline('Wave');
    this.lanternPipeline = this.game.renderer.getPipeline('Lantern');

    // this.wavePipeline.setFloat2('uResolution', this.cameras.main.width, this.cameras.main.height);
    this.lanternPipeline.setFloat2('uResolution', 1022, 950);

    // this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'ocean');

    this.drone = new CameraDrone(
      this,
      this.droneX,
      this.droneY,
      this.droneStamina,
      this.droneFlashlight
    );

    // this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'cavern1');

    // Add thermal vent
    // let vent = this.add.sprite(535, 800, 'vent');
    // vent.setScale(0.4);
    //
    // let bubbles = this.add.particles('bubbles');
    // let emitter = bubbles.createEmitter({
    //   lifespan: 200,
    //   speedX: { min: -300, max: 300 },
    //   speedY: { min: -300, max: -300 },
    //   scale: { start: 1, end: 0 },
    // });
    // emitter.setPosition(530, 690).setScale(0.2);

    // Environment objects
    // this.add.image(130, 782, 'coral').setAngle(45).setScale(0.6);
    // this.add.image(860, 760, 'coral').setAngle(-47).setScale(0.7);
    // this.add.image(300, 800, 'seaweed').setAngle(20).setScale(0.8);
    // this.add.image(780, 870, 'seaweed').setAngle(-20).setScale(0.4);

    let layer = map.createStaticLayer(0, tiles, -9200, -13000);


      // Angler fish that dart about
    // let a1 = this.physics.add.sprite(249, 100, "angler").setScale(0.3);
    // this.tweens.add({
    //   targets: a1,
    //   x: 800,
    //   y: 200,
    //   ease: "linear",
    //   delay: 1000,
    //   yoyo: true,
    //   repeat: -1,
    // });

    let a1 = new Angler(this, 249, 100, 800, 200, 0.3, 20);
    let a2 = new Angler(this, 849, 600, 200, 600, 0.45, 20);
    this.anglers = [a1, a2];

    // var a2 = this.physics.add.sprite(849, 600, "leftAngler").setScale(0.45);
    // this.tweens.add({
    //   targets: a2,
    //   x: 200,
    //   y: 600,
    //   ease: "linear",
    //   delay: 1000,
    //   yoyo: true,
    //   repeat: -1,
    // });

    // Display text for the health and flashlight battery
    this.statusBar = this.add.rectangle(this.cameras.main.width - 10, 10, 220, 60, 0x999999).setOrigin(1, 0);
    this.lanternPipeline.setFloat4('uStatusBar', this.statusBar.getTopLeft().x, this.statusBar.getTopLeft().y, this.statusBar.width, this.statusBar.height);

    this.staminaText = this.add.text(
      this.cameras.main.width - 20,
      16,
      `Power:\t${this.drone.stamina}`,
      {
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);

    this.flashlightText = this.add.text(
      this.cameras.main.width - 20,
      40,
      `Flashlight:\t${this.drone.flashlight}`,
      {
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);

    // Add collisions between anglers and drone
    for (let a of this.anglers) {
      this.physics.add.overlap(
          this.drone,
          a,
          this.handleDroneAnglerCollision,
          undefined,
          this
      );
    }

    this.cameras.main.startFollow(this.drone);
    this.cameras.main.setDeadzone(300, 300);

    this.cameras.main.setRenderToTexture(this.lanternPipeline);
  }

  update(time, delta) {
    this.statusBar.setPosition(
      this.cameras.main.scrollX + this.cameras.main.width - 10,
      this.cameras.main.scrollY + 10
    );

    this.staminaText.setPosition(
      this.cameras.main.scrollX + this.cameras.main.width - 20,
      this.cameras.main.scrollY + 16
    );

    this.flashlightText.setPosition(
      this.cameras.main.scrollX + this.cameras.main.width - 20,
      this.cameras.main.scrollY + 40
    );

    this.drone.update(this.controls);

    let dronePositionInCanvas = this.getPositionInCanvas(this.drone);
    this.lanternPipeline.setFloat2('uDronePosition', dronePositionInCanvas.x, dronePositionInCanvas.y);

    for (let a of this.anglers) {
      a.follow(this.drone);
    }

    if (this.controls.space.isDown) {

    }

    // if (this.drone.y <= 0 && this.drone.x > 290 && this.drone.x < 628) {
    //   this.scene.start('Cavern2', {
    //     droneX: 529,
    //     droneY: 931,
    //     droneStamina: this.drone.stamina,
    //     droneFlashlight: this.drone.flashlight
    //   });
    // }
  }

  handleDroneAnglerCollision(drone, angler) {
    drone.stamina -= 2;
    this.staminaText.setText(`Power:\t${drone.stamina}`);
  }

  getPositionInCanvas(obj) {
    return getPositionInCanvas(obj, this.cameras.main);
  }

  setPositionInCanvas(obj, x, y) {
    setPositionInCanvas(obj, this.cameras.main, x, y);
  }
}
