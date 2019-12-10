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

export class TutorialBackground extends Phaser.Scene {
  init() {}

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('ocean5', 'tutorialBackground.png');
    this.load.image('ocean5', 'ocean.png');
  }

  create() {
    this.add.image(-8188, -10023, 'ocean1').setOrigin(0,0);
  }

  update() {}
}

export class TutorialForeground extends Phaser.Scene {
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
    this.load.image('tiles', 'cavernTileBig.png');
    this.load.image('ocean5', 'tutorialBackground.png');
    this.load.atlas('shapes', 'Bubbles/shapes.png', 'Bubbles/shapes.json');

    //Load tilemap
    this.load.tilemapTiledJSON('tMap', 'newwwTutorialMap.json');
    this.load.image('light', 'triangleLight.png');
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
    const map = this.make.tilemap({ key: "tMap" });
    const tileset = map.addTilesetImage("tiles");
    const groundLayer = map.createDynamicLayer("Tile Layer 1", tileset, -2200, -3000);
    groundLayer.setCollisionBetween(1, 7);
    groundLayer.setCollisionBetween(9, 10);
    groundLayer.setCollisionBetween(12, 18);
    this.matter.world.convertTilemapLayer(groundLayer);

    this.controls = this.input.keyboard.createCursorKeys();

    //Add angler fish: Angler(this, x, y, size, speed)
    let a1 = new Angler(this, this.droneX - 1800, this.droneY, 0.45, 120);
    this.enemies = [a1];

    //Add powerup
    this.createPowerUp(this.droneX - 1800, this.droneY + 2600, 'Shield');

    // Add collisions between enemies and drone
    for (let a of this.enemies) {
      this.addSensorOverlap(this.drone, a, this.handleDroneEnemyCollision);
    }

    this.cameras.main.startFollow(this.drone);
    this.cameras.main.setDeadzone(300, 300);

    if (!this.helloTutPlayed) {
      this.helloTutPlayed = true;
      this.playTutorial([
        'Welcome to Deep!\n     (press enter)',
        'Deep is an underwater exploration game!',
        'To move, use the arrow keys',
        '          To skip the tutorial\n just swim past the text',
        'To continue with the tutorial\n just keep swimming.\n Make sure to stop and read the instructions!',
      ]);
    }
  }

  update(time, delta) {
    //Enemies tutorial
    if (!this.enemyTutPlayed && Phaser.Math.Distance.Between(this.drone.x, this.drone.y, this.enemies[0].x, this.enemies[0].y) <= 500) {
      this.playTutorial([
        'Uh-oh! That\'s an enemy!',
        'This one\'s called an angler\nand they can kill you fast',
        'You can scare it off using your flashlight',
        'Hold <space> to power it on',
        'But be careful, you have limited power and\nif you run out you\'ll start slowly\nlosing stamina',
        '(Press enter to continue)'
      ]);
      this.enemyTutPlayed = true;
    }

    //Powerup tutorial
    if (!this.powerTutPlayed && this.enemyTutPlayed && Phaser.Math.Distance.Between(this.drone.x, this.drone.y, this.powerUps[0].x, this.powerUps[0].y) <= 250) {
      this.powerTutPlayed = true;
      this.playTutorial([
        'Wow! This is a powerUp',
        'PowerUps help me in escaping the scary\nsea creatures',
        'There are 3 types of powerUps:\n Health+, Lantern+, and Sheild',
        'This one is a Sheild.\nIt protects me from getting hurt.',
        'To pick up a powerUp, swim over it.',
      ]);
    }
    if (this.drone.stamina <= 0) {
      this.scene.start('Menu');
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

    if (this.drone.x >= -716 && this.drone.y >= 3000 && this.drone.y <=  3400) {
      this.scene.start('Menu', {
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
  playTutorial(tut) {
    //this.physics.pause();
    let tutIndex = 0;
    let tutText = this.add.text(
      this.cameras.main.scrollX + this.cameras.main.centerX,
      this.cameras.main.scrollY + this.cameras.main.centerY + 200,
      tut[tutIndex++],
      {
        fontFamily: FONT_FAMILY,
        fontSize: '48px',
        fill: '#FFF'
      }
    ).setOrigin(0.5);

    const handleKeyPress = (e) => {
      if (e.which === 13) {
        if (tutIndex >= tut.length) {
          tutText.destroy();
          // this.physics.resume();
          document.removeEventListener('keypress', handleKeyPress);
        } else {
          console.log(tutIndex);
          tutText.setText(tut[tutIndex++]);
        }
      }
    };

    document.addEventListener('keypress', handleKeyPress);
  }
}


export class TutorialLanternOverlay extends Phaser.Scene {
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

    //this.cameras.main.setRenderToTexture('Lantern');
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

export class TutorialHud extends Phaser.Scene {
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
