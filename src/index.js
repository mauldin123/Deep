/*global Phaser, window*/
import Config from './config/config.js';
import Boot from './scenes/Boot.js';
import MainCavern from './scenes/MainCavern.js';
import EndScene from './scenes/EndScene.js';
import Menu from './scenes/Menu.js';
import Tutorial from './scenes/Tutorial.js';
import StoryScene from './scenes/StoryScene.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', Boot);
    this.scene.add('MainCavern', MainCavern);
    this.scene.add('Menu', Menu);
    this.scene.add('EndScene', EndScene);
    this.scene.add('Tutorial', Tutorial);
    this.scene.add('StoryScene', StoryScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
