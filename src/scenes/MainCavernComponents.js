import CameraDrone from "../objects/CameraDrone.js";
import Angler from "../objects/Angler.js";
import Shark from "../objects/Shark.js";
import {FONT_FAMILY, getPositionInCanvas} from "../utils.js";
import PowerUp from "../objects/PowerUp.js";
import "../packages/matter-js/build/matter.js";
const { BehaviorSubject } = rxjs;

// A Subject tracks and broadcasts changes to the data it encapsulates
// A BehaviorSubject is a Subject that sends its most-recently broadcasted state to new subscribers
const sharedData = new BehaviorSubject({
  droneStamina: 0,
  droneFlashlight: 0,
  dronePosition: new Phaser.Math.Vector2(0, 0),
  droneScroll: new Phaser.Math.Vector2(1, 1),
  foregroundCamera: null
});

export class Background extends Phaser.Scene {
  init() {}

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('ocean1', 'ocean.png');
  }

  create() {
    this.add.image(-8188, -10023, 'ocean1').setOrigin(0,0);
  }

  update() {}
}

export class Foreground extends Phaser.Scene {
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
    this.load.image('deep cavern', 'cavernTileBig.png');
    this.load.atlas('shapes', 'Bubbles/shapes.png', 'Bubbles/shapes.json');
    this.load.image('light', 'triangleLight.png');
    this.load.tilemapCSV('map', 'DeepMap.csv');
    this.load.tilemapTiledJSON('jsonMap', 'DeepMap.json');
    this.load.image('light', 'triangleLight.png');
    this.load.image('angler', 'angler.png');
    this.load.image('shark', 'shark.png');
    this.load.image('seaMine', 'seaMine.png');
  }

  create() {
    this.powerUps = [];
    this.drone = new CameraDrone(
      this,
      this.droneX,
      this.droneY,
      this.droneStamina,
      this.droneFlashlight
    );
    this.pushData();
    const map = this.make.tilemap({ key: "jsonMap" });
    const tileset = map.addTilesetImage("deep cavern");
    const groundLayer = map.createDynamicLayer("Tile Layer 1", tileset, -9200, -10000);
    groundLayer.setCollisionBetween(1, 7);
    groundLayer.setCollisionBetween(9, 10);
    groundLayer.setCollisionBetween(12, 18);
    this.matter.world.convertTilemapLayer(groundLayer);

    this.controls = this.input.keyboard.createCursorKeys();

    //Add angler fish: Angler(this, x, y, size, speed)
    let a1 = new Angler(this, 2705, -1242, 0.50, 200);
    let a2 = new Angler(this, -2758, -3133, 0.50, 200);
    let a3 = new Angler(this, 5000, -1000, 0.50, 200);
    let a4 = new Angler(this, 6812, -3305, 0.50, 200);

    //Add sharks: Shark(this, x, y, size, speed). Size of sharks should be 1 or greater
    let s1 = new Shark(this, 3209, -8549, 1.2, 3);
    let s2 = new Shark(this, 152, -7072, 1, 3);

    //Add sea mines
    let m1 = this.add.image(-1338, -1300, 'seaMine').setScale(1.6);
    let m2 = this.add.image(-1004, -1280, 'seaMine').setScale(1.6);
    let m3 = this.add.image(-800, -1280, 'seaMine').setScale(1.7);
    let m4 = this.add.image(-66, -1300, 'seaMine').setScale(1.6);
    let m5 = this.add.image(388, -1280, 'seaMine').setScale(1.7);
    let m6 = this.add.image(644, -1260, 'seaMine').setScale(1.6);

    this.enemies = [a1, a2, a3, a4, s1, s2];
    this.seaMines = [m1, m2, m3, m4, m5, m6];

    //Add powerups
    this.createPowerUp(511, -200, 'Shield');
    this.createPowerUp(1500, -770, 'HealthUp');
    this.createPowerUp(-1000, -770, 'LanternRadiusPlus');

    // Add collisions between enemies and drone
    for (let a of this.enemies) {
      this.addSensorOverlap(this.drone, a, this.handleDroneEnemyCollision);
    }

    this.cameras.main.startFollow(this.drone);
    this.cameras.main.setDeadzone(300, 300);
  }

  update(time, delta) {
    if (this.drone.stamina <= 0) {
      this.scene.start('MainCavern');
    }

    this.drone.update(this.controls);

    if (this.drone.flashlight.isOn) {
      this.drone.flashlightPower -= delta / 300;
    }

    if (this.drone.flashlightPower <= 0) {
      this.drone.stamina -= delta / 1000;
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

    if (this.drone.x >= 6251 && this.drone.x <= 7573 && this.drone.y <= -9900) {
      this.scene.start('EndScene', {
        droneX: 3700,
        droneY: 500,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlightPower
      });
    }

    for (let e of this.enemies) {
      if (Matter.Query.collides(this.drone.flashlight, e) && this.drone.flashlight.isOn) {
        e.flee(this.drone);
      } else {
        e.follow(this.drone);
      }
    }

    this.pushData();
  }

  /** @private */
  pushData() {
    sharedData.next({
      droneStamina: this.drone.stamina,
      droneFlashlight: this.drone.flashlightPower,
      dronePosition: this.drone.getCenter(),
      droneScroll: new Phaser.Math.Vector2(this.drone.scrollFactorX, this.drone.scrollFactorY),
      foregroundCamera: this.cameras.main
    });
  }

  /** @private */
  createPowerUp(x, y, kind) {
    let p = new PowerUp(this, x, y, kind);
    this.powerUps.push(p);
    this.addSensorOverlap(this.drone, p, () => {
      switch (p.kind) {
        case 'HealthUp':
          this.drone.stamina += 50;
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


export class LanternOverlay extends Phaser.Scene {
  init() {}

  preload() {
    this.load.setBaseURL('DeepAssets');
  }

  create() {
    sharedData.subscribe({
      next: (data) => this.pullData(data)
    });

    // this.wavePipeline = this.game.renderer.getPipeline('Wave');
    this.lanternPipeline = this.game.renderer.getPipeline('Lantern');

    // this.wavePipeline.setFloat2('uResolution', this.cameras.main.width, this.cameras.main.height);
    this.lanternPipeline.setFloat2('uResolution', 1022, 950);
    this.lanternPipeline.setInt1('uRadiusPlus', 0);
    //this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'ocean');

    this.cameras.main.setRenderToTexture('Lantern');
  }

  update() {
    if (this.foregroundCamera) {
      let dronePositionInCanvas = (() => {
        let x = this.dronePosition.x - this.foregroundCamera.scrollX * this.droneScroll.x + this.foregroundCamera.x;
        let y = this.dronePosition.y - this.foregroundCamera.scrollY * this.droneScroll.y + this.foregroundCamera.y;
        return new Phaser.Math.Vector2(x, y);
      })();
      this.lanternPipeline.setFloat2('uDronePosition', dronePositionInCanvas.x, dronePositionInCanvas.y);
    } else {
      this.lanternPipeline.setFloat2('uDronePosition', this.dronePosition.x, this.dronePosition.y);
    }
  }

  /** @private */
  pullData(sharedData) {
    this.droneStamina = sharedData.droneStamina;
    this.droneFlashlight = sharedData.droneFlashlight;
    this.dronePosition = sharedData.dronePosition;
    this.droneScroll = sharedData.droneScroll;
    this.foregroundCamera = sharedData.foregroundCamera;
  }
}

export class Hud extends Phaser.Scene {
  init() {
    this.droneStamina = 0;
    this.droneFlashlight = 0;
    this.dronePosition = new Phaser.Math.Vector2(0, 0);
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
  }

  create() {
    sharedData.subscribe({
      next: (data) => this.pullData(data)
    });
    // Display text for the health and flashlight battery
    this.statusBar = this.add.rectangle(this.cameras.main.width - 10, 10, 220, 60, 0x999999)
      .setOrigin(1, 0)
      .setScrollFactor(0);

    this.staminaText = this.add.text(
      this.cameras.main.width - 20,
      16,
      `Power:\t${Math.ceil(this.droneStamina)}`,
      {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0)
      .setScrollFactor(0);

    this.flashlightText = this.add.text(
      this.cameras.main.width - 20,
      40,
      `Flashlight:\t${Math.ceil(this.droneFlashlight)}`,
      {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0)
      .setScrollFactor(0);

    this.positionText = this.add.text(
      20,
      this.cameras.main.height + 20,
      `(${Math.round(this.dronePosition.x)}, ${Math.round(this.dronePosition.y)})`,
      {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        fill: '#FFF',
      }
    );
  }

  update() {
    this.staminaText.setText(`Stamina:\t${Math.ceil(this.droneStamina)}`);
    this.flashlightText.setText(`Flashlight:\t${Math.ceil(this.droneFlashlight)}`);
    this.positionText.setText(`(${Math.round(this.dronePosition.x)}, ${Math.round(this.dronePosition.y)})`);
  }

  /** @private */
  pullData(sharedData) {
    this.droneStamina = sharedData.droneStamina;
    this.droneFlashlight = sharedData.droneFlashlight;
    this.dronePosition = sharedData.dronePosition;
  }
}
