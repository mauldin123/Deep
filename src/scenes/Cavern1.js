/**global Phaser*/
import CameraDrone from '../objects/CameraDrone.js';
import Angler from '../objects/Angler.js';
import {getPositionInCanvas, setPositionInCanvas, FONT_FAMILY} from "../utils.js";
import PowerUp from "../objects/PowerUp.js";


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

      this.load.image('cavern1', 'cavern1.png');
      this.load.image('coral', 'coral.png');
      this.load.image('seaweed', 'seaweed.png');
      this.load.image('vent', 'vocanicVent.png');
      this.load.image('angler', 'angler.png');
      this.load.image('leftAngler', 'leftAngler.png');
      this.load.image('bubbles', './Bubbles/shapes.png');
      //this.load.image('tiles', 'cavernTiles.png');
      //this.load.image('tilesInverse', 'inverseCavern.png');
      this.load.image('deep cavern', 'cavernTileBig.png');
      this.load.image('ocean1', 'ocean.png');
      this.load.tilemapCSV('map', 'DeepMap.csv');
      this.load.tilemapTiledJSON('jsonMap', 'DeepMap.json');
      this.load.image('light', 'triangleLight.png');
      this.load.atlas('shapes', 'Bubbles/shapes.png', 'Bubbles/shapes.json');
  }

  create(data) {
    this.powerUps = [];
    const backgroundImage = this.add.image(0, 0,'ocean1').setOrigin(0, 0);
    this.drone = new CameraDrone(
      this,
      this.droneX,
      this.droneY,
      this.droneStamina,
      this.droneFlashlight
    );
    const map = this.make.tilemap({ key: "jsonMap" });
    const tileset = map.addTilesetImage("deep cavern");
    const groundLayer = map.createDynamicLayer("Tile Layer 1", tileset, -9200, -10000);

    groundLayer.setCollisionByProperty({ collides: true });
    //this.matter.world.convertTilemapLayer(groundLayer);
    map.setCollisionBetween(0, 18);



    this.controls = this.input.keyboard.createCursorKeys();

    // this.wavePipeline = this.game.renderer.getPipeline('Wave');
    this.lanternPipeline = this.game.renderer.getPipeline('Lantern');

    // this.wavePipeline.setFloat2('uResolution', this.cameras.main.width, this.cameras.main.height);
    this.lanternPipeline.setFloat2('uResolution', 1022, 950);
    this.lanternPipeline.setInt1('uRadiusPlus', 0);
    //this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'ocean');




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
/*
    let layer = map.createStaticLayer(0, tileset, -9200, -13000);
    this.physics.add.collider(this.drone, layer);
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    map.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

*/


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

    let a1 = new Angler(this, 249, -770, 800, 200, .5, 120);
    let a2 = new Angler(this, 520, 700, 200, 600, 0.55, 120);
    let a3 = new Angler(this, 3336, -1000, 200, 600, .9, 120);
    let a4 = new Angler(this, 5718, -2120, 200, 600, 0.55, 120);
    let a5 = new Angler(this, 6812, -3305, 200, 600, 0.55, 120);
    let a6 = new Angler(this, 8234, -2129, 200, 600, 0.55, 120);
    let a7 = new Angler(this, 7705, -6619, 200, 600, 0.55, 120);
    let a8 = new Angler(this, 4540, -4592, 200, 600, 0.55, 120);
    let a9 = new Angler(this, 486, -3822, 200, 600, 0.55, 120);
    let a10 = new Angler(this, -256, -2417, 200, 600, 0.55, 120);
    let a11 = new Angler(this, -1047, -4543, 200, 600, 0.55, 120);
    let a12 = new Angler(this, -1937, -6224, 200, 600, 0.55, 120);


    this.anglers = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12];
    this.createPowerUp(511, -200, 'Shield');
    this.createPowerUp(1500, -770, 'HealthUp');
    this.createPowerUp(-1000, -770, 'LanternRadiusPlus');
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
      `Power:\t${Math.ceil(this.drone.stamina)}`,
      {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);

    this.flashlightText = this.add.text(
      this.cameras.main.width - 20,
      40,
      `Flashlight:\t${Math.ceil(this.drone.flashlightPower)}`,
      {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);

    this.positionText = this.add.text(
      20,
      this.cameras.main.height + 20,
      `(${Math.round(this.drone.x)}, ${Math.round(this.drone.y)})`,
      {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        fill: '#FFF',
      }
    );

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
    if (this.drone.stamina <= 0) {
      this.scene.start('Cavern1');
    }

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

    this.positionText.setPosition(
      this.cameras.main.scrollX + 20,
      this.cameras.main.scrollY + this.cameras.main.y + 40
    );

    this.positionText.setText(`(${Math.round(this.drone.x)}, ${Math.round(this.drone.y)})`);

    this.drone.update(this.controls);

    if (this.drone.flashlight.isOn) {
        this.drone.flashlightPower -= delta / 300;
        this.setFlashlightText();
    }

    if (this.drone.flashlightPower <= 0) {
        this.drone.stamina -= delta / 1000;
        this.setStaminaText();
    }

    let dronePositionInCanvas = this.getPositionInCanvas(this.drone);
    this.lanternPipeline.setFloat2('uDronePosition', dronePositionInCanvas.x, dronePositionInCanvas.y);

    for (let a of this.anglers) {
      if (this.drone.flashlight.isOn && this.physics.world.overlap(a, this.drone.flashlight)) {
          a.flee(this.drone);
      } else {
          a.follow(this.drone);
      }
    }

    this.drone.powerUps.forEach((v, k, m) => {
        try {
            v[0].duration -= delta;
            if (v[0].duration <= 0) {
                v.shift();
            }
        } catch (e) {}

        if (k === 'LanternRadiusPlus') {
            if (v.length > 0) {
                this.lanternPipeline.setInt1('uRadiusPlus', 1);
            } else {
                this.lanternPipeline.setInt1('uRadiusPlus', 0);
            }
        }
    });
  }

    /** @private */
  handleDroneAnglerCollision(drone, angler) {
    if (!drone.shieldActive) {
        drone.stamina -= 0.5;
      this.setStaminaText();
    }

  }

  /** @private */
  handleDronePowerUpCollision(drone, powerUp) {
      switch (powerUp.kind) {
          case 'HealthUp':
              this.drone.stamina += 50;
              this.setStaminaText();
              break;
          case 'Shield':
              this.drone.shieldActive = true;
              break;
          case 'LanternRadiusPlus':
              break;
          case 'Taser':
              break;
      }

      try {
          drone.powerUps.get(powerUp.kind).push(powerUp);
      } catch (e) {
          drone.powerUps.set(powerUp.kind, []);
          drone.powerUps.get(powerUp.kind).push(powerUp);
      } finally {
          powerUp.destroy();
      }
  }

  getPositionInCanvas(obj) {
    return getPositionInCanvas(obj, this.cameras.main);
  }

  setPositionInCanvas(obj, x, y) {
    setPositionInCanvas(obj, this.cameras.main, x, y);
  }

  /** @private */
  setStaminaText() {
      this.staminaText.setText(`Stamina:\t${Math.ceil(this.drone.stamina)}`);
  }

    /** @private */
    setFlashlightText() {
        this.flashlightText.setText(`Flashlight:\t${Math.ceil(this.drone.flashlightPower)}`);
    }

    /** @private */
    createPowerUp(x, y, kind) {
        let p = new PowerUp(this, x, y, kind);
        this.powerUps.push(p);
        this.physics.add.overlap(
            this.drone,
            p,
            this.handleDronePowerUpCollision,
            undefined,
            this
        );
    }
}
