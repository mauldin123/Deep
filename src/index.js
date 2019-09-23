/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('BootScene', BootScene);
    this.scene.start('BootScene');
  }
}

window.game = new Game();
