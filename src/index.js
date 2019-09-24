/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';
import Cavern1 from './scenes/Cavern1.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('BootScene', BootScene);
    this.scene.add('Cavern1', Cavern1);
    this.scene.start('BootScene');
  }
}

window.game = new Game();
