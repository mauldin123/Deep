/**global Phaser*/
import CameraDrone from '../objects/CameraDrone.js';
import Angler from '../objects/Angler.js';
import Shark from '../objects/Shark.js';
import Jellyfish from '../objects/Jellyfish.js';
import {getPositionInCanvas, setPositionInCanvas, FONT_FAMILY} from "../utils.js";
import PowerUp from "../objects/PowerUp.js";


export default class MainCavern extends Phaser.Scene {
  constructor() {
    super('MainCavern');
  }

  init(data) {
    this.droneX = this.cameras.main.width / 2;
    this.droneY = this.cameras.main.height / 2;
    if (data) {
      this.droneX = data.droneX || this.cameras.main.width / 2;
      this.droneY = data.droneY || this.cameras.main.height / 2;
      this.droneStamina = data.droneStamina;
      this.droneFlashlight = data.droneFlashlight;
    }
  }

  preload() {
      this.load.setBaseURL('DeepAssets');
      this.load.atlas('camera', 'seaCamera1.png', 'seaCamera1.json');
      this.load.image('angler', 'angler.png');
      this.load.image('shark', 'shark.png');
      this.load.image('jellyfish', 'jellyfish.png');
      this.load.image('deep cavern', 'cavernTileBig.png');
      this.load.image('ocean2', 'ocean.png');
      this.load.image('shipwreck', 'shipwreck.png')
      this.load.atlas('shapes', 'Bubbles/shapes.png', 'Bubbles/shapes.json');
      //Load tilemap
      this.load.tilemapCSV('map', 'DeepMap.csv');
      this.load.tilemapTiledJSON('jsonMap', 'DeepMap.json');
      this.load.image('light', 'triangleLight.png');
  }

  create(data) {

    this.powerUps = [];
    //loads background
    const backgroundImage = this.add.image(-8188, -10023, 'ocean2').setOrigin(0, 0);

    //Add shipwreck
    this.add.image(-2350, -8300, 'shipwreck').setScale(0.9)

    //sets camera in location to start game
    this.drone = new CameraDrone(
      this,
      this.droneX = 500,
      this.droneY = 500,
      this.droneStamina,
      this.droneFlashlight
    );
    const map = this.make.tilemap({ key: "jsonMap" });
    const tileset = map.addTilesetImage("deep cavern");
    const groundLayer = map.createDynamicLayer("Tile Layer 1", tileset, -9200, -10000);

    // groundLayer.setCollisionByProperty({ collides: true });
    groundLayer.setCollisionBetween(1, 7);
    groundLayer.setCollisionBetween(9, 10);
    groundLayer.setCollisionBetween(12, 18);
    this.matter.world.convertTilemapLayer(groundLayer);

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

//*
//     let layer = map.createStaticLayer(0, tileset, -9200, -13000);
    // this.physics.add.collider(this.drone, layer);
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // map.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
//*/


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

    //Add angler fish: Angler(this, x, y, size, speed)
    let a1 = new Angler(this, -177, -991, 0.50, 400);
    let a2 = new Angler(this, -5935, -3117, 0.50, 200);
    let a3 = new Angler(this, 1733, -1378, 0.50, 200);
    let a4 = new Angler(this, 1002, -3468, 0.60, 260);
    let a5 = new Angler(this, 2555, -2826, 0.40, 250);
    let a6 = new Angler(this, -2156, -2475, 0.50, 200);
    let a7 = new Angler(this, -230, -4029, 0.50, 200);
    let a8 = new Angler(this, -844, -2548, 0.7, 300);
    let a9 = new Angler(this, 3574, -3267, 0.7, 300);

    //Add sharks: Shark(this, x, y, size, speed). Size of sharks should be 1 or greater
    let s1 = new Shark(this, -419, -8549, 1.2, 3);
    let s2 = new Shark(this, -3056, -7045, 1, 3);
    let s3 = new Shark(this, -942, -6724, 1.2, 3);
    let s4 = new Shark(this, -2878, -8340, 1, 3);

    //Add Jellyfish
    let j1 = new Jellyfish(this, 3926, -5121, 0.3, 300)
    this.tweens.add({
      targets: j1,
      x: 3926,
      y: -5221,
      ease: "Cubic",
      duration: 2500,
      repeat: -1,
      yoyo: true
    });
    let j2 = new Jellyfish(this, 4286, -5237, 0.2, 300)
    this.tweens.add({
      targets: j2,
      x: 4286,
      y: -5337,
      ease: "Cubic",
      duration: 2700,
      repeat: -1,
      yoyo: true
    });
    let j3 = new Jellyfish(this, 4106, -4941, 0.25, 300)
    this.tweens.add({
      targets: j3,
      x: 4106,
      y: -5041,
      ease: "Cubic",
      duration: 3330,
      repeat: -1,
      yoyo: true
    });
    let j4 = new Jellyfish(this, 3578, -5598, 0.32, 300)
    this.tweens.add({
      targets: j4,
      x: 3578,
      y: -5598,
      ease: "Cubic",
      duration: 3134,
      repeat: -1,
      yoyo: true
    });
    let j5 = new Jellyfish(this, 4510, -5766, 0.3, 300)
    this.tweens.add({
      targets: j5,
      x: 4510,
      y: -5866,
      ease: "Cubic",
      duration: 2900,
      repeat: -1,
      yoyo: true
    });
    let j6 = new Jellyfish(this, 4952, -5065, 0.28, 300)
    this.tweens.add({
      targets: j6,
      x: 4952,
      y: -5065,
      ease: "Cubic",
      duration: 2000,
      repeat: -1,
      yoyo: true
    });
    let j7 = new Jellyfish(this, 4798, -4757, 0.2, 300)
    this.tweens.add({
      targets: j7,
      x: 4798,
      y: -4857,
      ease: "Cubic",
      duration: 2340,
      repeat: -1,
      yoyo: true
    });
    let j8 = new Jellyfish(this, 3740, -5280, 0.3, 300)
    this.tweens.add({
      targets: j8,
      x: 3740,
      y: -5380,
      ease: "Cubic",
      duration: 4000,
      repeat: -1,
      yoyo: true
    });
    let j9 = new Jellyfish(this, 4081, -5343, 0.2, 300)
    this.tweens.add({
      targets: j9,
      x: 4081,
      y: -5443,
      ease: "Cubic",
      duration: 4300,
      repeat: -1,
      yoyo: true
    });
    let j10 = new Jellyfish(this, 3748, -4884, 0.25, 300)
    this.tweens.add({
      targets: j10,
      x: 3748,
      y: -4947,
      ease: "Cubic",
      duration: 3000,
      repeat: -1,
      yoyo: true
    });
    let j11 = new Jellyfish(this, 4977, -4847, 0.32, 300)
    this.tweens.add({
      targets: j11,
      x: 4977,
      y: -5000,
      ease: "Cubic",
      duration: 3300,
      repeat: -1,
      yoyo: true
    });
    let j12 = new Jellyfish(this, 5278, -4403, 0.3, 300)
    this.tweens.add({
      targets: j12,
      x: 5278,
      y: -4503,
      ease: "Cubic",
      duration: 3600,
      repeat: -1,
      yoyo: true
    });
    let j13 = new Jellyfish(this, 5421, -4561, 0.28, 300)
    this.tweens.add({
      targets: j13,
      x: 5421,
      y: -4661,
      ease: "Cubic",
      duration: 5000,
      repeat: -1,
      yoyo: true
    });
    let j14 = new Jellyfish(this, 5532, -4348, 0.2, 300)
    this.tweens.add({
      targets: j14,
      x: 5532,
      y: -4448,
      ease: "Cubic",
      duration: 1000,
      repeat: -1,
      yoyo: true
    });
    let j15 = new Jellyfish(this, 3800, -5489, 0.2, 300)
    this.tweens.add({
      targets: j15,
      x: 3800,
      y: -5589,
      ease: "Cubic",
      duration: 3560,
      repeat: -1,
      yoyo: true
    });
    let j16 = new Jellyfish(this, 4315, -5438, 0.3, 300)
    this.tweens.add({
      targets: j16,
      x: 4315,
      y: -5538,
      ease: "Cubic",
      duration: 3050,
      repeat: -1,
      yoyo: true
    });
    let j17 = new Jellyfish(this, 4758, -5248, 0.2, 300)
    this.tweens.add({
      targets: j17,
      x: 4758,
      y: -5140,
      ease: "Cubic",
      duration: 1900,
      repeat: -1,
      yoyo: true
    });
    let j18 = new Jellyfish(this, 4901, -4575, 0.25, 300)
    this.tweens.add({
      targets: j18,
      x: 4901,
      y: -4675,
      ease: "Cubic",
      duration: 2700,
      repeat: -1,
      yoyo: true
    });
    let j19 = new Jellyfish(this, 5711, -4477, 0.32, 300)
    this.tweens.add({
      targets: j19,
      x: 5711,
      y: -4577,
      ease: "Cubic",
      duration: 3121,
      repeat: -1,
      yoyo: true
    });
    let j20 = new Jellyfish(this, 5354, -4208, 0.3, 300)
    this.tweens.add({
      targets: j20,
      x: 5354,
      y: -4308,
      ease: "Cubic",
      duration: 3090,
      repeat: -1,
      yoyo: true
    });
    let j21 = new Jellyfish(this, 3451, -5994, 0.28, 300)
    this.tweens.add({
      targets: j21,
      x: 3451,
      y: -6094,
      ease: "Cubic",
      duration: 3323,
      repeat: -1,
      yoyo: true
    });
    let j22 = new Jellyfish(this, 3689, -6137, 0.2, 300)
    this.tweens.add({
      targets: j22,
      x: 3689,
      y: -6237,
      ease: "Cubic",
      duration: 2950,
      repeat: -1,
      yoyo: true
    });



    //Add sea mines
    //let m1 = this.add.image(-1338, -1300, 'seaMine').setScale(1.6);
    //let m2 = this.add.image(-1004, -1280, 'seaMine').setScale(1.6);
    //let m3 = this.add.image(-800, -1280, 'seaMine').setScale(1.7);
    //let m4 = this.add.image(-66, -1300, 'seaMine').setScale(1.6);
    //let m5 = this.add.image(388, -1280, 'seaMine').setScale(1.7);
    //let m6 = this.add.image(644, -1260, 'seaMine').setScale(1.6);

    this.enemies = [a1, a2, a3, a4, a5, a6, a7, a8, a9, s1, s2, s3, s4];
    //this.seaMines = [m1, m2, m3, m4, m5, m6];

    //Add powerups
    this.createPowerUp(1248, -854, 'Shield');
    this.createPowerUp(-3166, -5044, 'HealthUp');
    this.createPowerUp(-975, -1029, 'LanternRadiusPlus');
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
      `Health:\t${Math.ceil(this.drone.stamina)}`,
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

    const enemyFlashlightCallback = (enemy) => {
      if (this.drone.flashlight.isOn) {
        enemy.flee(this.drone);
      } else {
        enemy.follow(this.drone);
      }
    };

    // Add collisions between enemies and drone
    for (let a of this.enemies) {
      this.addSensorOverlap(this.drone, a, this.handleDroneEnemyCollision);
      this.matterCollision.addOnCollideStart({
        objectA: this.drone.flashlight,
        objectB: a,
        callback: () => enemyFlashlightCallback(a),
        context: this
      });

      this.matterCollision.addOnCollideEnd({
        objectA: this.drone.flashlight,
        objectB: a,
        callback: () => a.follow(this.drone),
        context: this
      });

      // this.physics.add.overlap(
      //     this.drone,
      //     a,
      //     this.handleDroneEnemyCollision,
      //     undefined,
      //     this
      // );
    }

    this.cameras.main.startFollow(this.drone);
    this.cameras.main.setDeadzone(300, 300);

    //this.cameras.main.setRenderToTexture(this.lanternPipeline);
  }

  update(time, delta) {
    // game over


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

    for (let a of this.enemies) {

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
    // Teleport to the main scene

    if (this.drone.x >= 3000 && this.drone.x <= 4400 && this.drone.y <= -8887) {
      this.scene.start('EndScene', {
        droneX: 3700,
        droneY: 500,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlightPower
  });

}

    if (this.drone.stamina <= 0) {
      this.scene.start('MainCavern');
}
  }

    /** @private */
  handleDroneEnemyCollision() {
    if (!this.drone.shieldActive) {
        this.drone.stamina -= 0.5;
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
      this.staminaText.setText(`Health:\t${Math.ceil(this.drone.stamina)}`);
  }

    /** @private */
    setFlashlightText() {
        this.flashlightText.setText(`Flashlight:\t${Math.ceil(this.drone.flashlightPower)}`);
    }

    /** @private */
    setPositionText() {
        this.positionText.setText(`(${Math.round(this.drone.x)}, ${Math.round(this.drone.y)})`);
    }

    /** @private */
    createPowerUp(x, y, kind) {
        let p = new PowerUp(this, x, y, kind);
        this.powerUps.push(p);
        this.addSensorOverlap(this.drone, p, () => {
          switch (p.kind) {
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
            this.drone.powerUps.get(p.kind).push(p);
          } catch (e) {
            this.drone.powerUps.set(p.kind, []);
            this.drone.powerUps.get(p.kind).push(p);
          } finally {
            p.destroy();
          }
        });
        // this.physics.add.overlap(
        //     this.drone,
        //     p,
        //     this.handleDronePowerUpCollision,
        //     undefined,
        //     this
        // );
    }

    /** @private */
    addSensorOverlap(bodyA, bodyB, onOverlap) {
      this.matterCollision.addOnCollideStart({
        objectA: bodyA,
        objectB: bodyB,
        callback: onOverlap,
        context: this
      });

      this.matterCollision.addOnCollideActive({
        objectA: bodyA,
        objectB: bodyB,
        callback: onOverlap,
        context: this
      });
    }
}
