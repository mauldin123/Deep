/**global Phaser*/
import CameraDrone from '../objects/CameraDrone.js';
import Angler from '../objects/Angler.js';
import Shark from '../objects/Shark.js';
import {getPositionInCanvas, setPositionInCanvas, FONT_FAMILY} from "../utils.js";
import PowerUp from "../objects/PowerUp.js";


export default class Tutorial extends Phaser.Scene {
  constructor() {
    super('Tutorial');
  }

  init(data) {
    this.droneX = -571;
    this.droneY = 508;
    if (data !== undefined) {
      this.droneX = data.droneX || -571;
      this.droneY = data.droneY || 508;
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
      this.load.image('ocean1', 'tutorialBackground.png');
      this.load.atlas('shapes', 'Bubbles/shapes.png', 'Bubbles/shapes.json');

      //Load tilemap
      this.load.tilemapTiledJSON('tMap', 'newwwTutorialMap.json');
      this.load.image('light', 'triangleLight.png');
  }

  create(data) {
    this.powerUps = [];

    const backgroundImage = this.add.image(-2537, 145,'ocean1');
    this.drone = new CameraDrone(
      this,
      this.droneX,
      this.droneY,
      this.droneStamina,
      this.droneFlashlight
    );
    const map = this.make.tilemap({ key: "tMap" });
    const tileset = map.addTilesetImage("tiles");
    const groundLayer = map.createDynamicLayer("Tile Layer 1", tileset, -3200, -3000);

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

    // this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'MainCavern');

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
    //this.droneX = -571;
    //this.droneY = 508;
    //Add angler
    let a1 = new Angler(this, -2537, 145, 0.45, 120);
    this.anglers = [a1];

    //Add powerup
    this.createPowerUp(-2256, 2735, 'Shield');

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
    this.staminaBar = this.add.rectangle(this.statusBar.x + 5, this.statusBar.y + 5, this.statusBar.width - 40, this.statusBar.y + 5, 0xff0000);
    this.lanternPipeline.setFloat4('uStatusBar', this.statusBar.getTopLeft().x, this.statusBar.getTopLeft().y, this.statusBar.width, this.statusBar.height);

    this.staminaText = this.add.text(
      this.cameras.main.width - 20,
      16,
      `Health:\t${this.drone.stamina}`,
      {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        fill: '#FFF'
      }
    ).setOrigin(1, 0);



    this.flashlightText = this.add.text(
      this.cameras.main.width - 20,
      40,
      `Flashlight:\t${this.drone.flashlightPower}`,
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
            fill: '#FFF'
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
        for (let a of this.anglers) {
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

    // Add collisions between anglers and drone
    //for (let a of this.anglers) {
      // this.physics.add.overlap(
      //     this.drone,
      //     a,
      //     this.handleDroneAnglerCollision,
      //     undefined,
      //     this
      // );
    //}

    this.enemyTutPlayed = false;
    this.helloTutPlayed = false;
    this.powerTutPlayed = false;


    this.cameras.main.startFollow(this.drone);
    this.cameras.main.setDeadzone(300, 300);


     if (!this.helloTutPlayed) {
       this.helloTutPlayed = true;
       this.playTutorial([
         'Welcome to Deep!\n     (press enter)',
         'Deep is an underwater exploration game!',
         'To move, use the arrow keys',
         '          To skip the tutorial\n follow the cavern to the right',
         'To continue with the tutorial\n follow the cavern to the left',
         '(Press enter to continue)'
       ]);
}

// this.cameras.main.setRenderToTexture(this.lanternPipeline);
}
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

    this.positionText.setPosition(
        this.cameras.main.scrollX + 20,
        this.cameras.main.scrollY + this.cameras.main.y + 40
    );

    this.positionText.setText(`(${Math.round(this.drone.x)}, ${Math.round(this.drone.y)})`);

    this.drone.update(this.controls);

    if (this.drone.stamina <= 0) {
      this.scene.start('Tutorial');
    }

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


    //Enemies tutorial
    if (!this.enemyTutPlayed && Phaser.Math.Distance.Between(this.drone.x, this.drone.y, this.anglers[0].x, this.anglers[0].y) <= 250) {
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
        'There are 3 types of powerUps: Health+, Lantern+, and Sheild',
        'This one is a Sheild.\nIt protects me from getting hurt.',
        'To pick up a powerUp, swim over it.',
      ]);
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
    if (this.drone.x >= -716 && this.drone.y >= 3000 && this.drone.y <=  3400) {
      this.scene.start('Menu', {
        droneX: 3700,
        droneY: 500,
        droneStamina: this.drone.stamina,
        droneFlashlight: this.drone.flashlightPower
  });
}
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

  /**
   * @param {Phaser.GameObjects.GameObject} obj
   * @returns {Phaser.Math.Vector2}
   */
  getPositionInCanvas(obj) {
    return getPositionInCanvas(obj, this.cameras.main);
  }

  /**
   * @param {Phaser.GameObjects.GameObject} obj
   * @param {number} x
   * @param {number} y
   */
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
    /**
     * @private
     * @param {Array<string>} tut
     */
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
