/*global Phaser, window*/
import Config from './config/config.js';
import Boot from './scenes/Boot.js';
import Cavern1 from './scenes/Cavern1.js';
import Cavern2 from './scenes/Cavern2.js';
import Cavern3 from './scenes/Cavern3.js';
import Cavern4 from './scenes/Cavern4.js';
import Cavern5 from './scenes/Cavern5.js';
import Cavern6 from './scenes/Cavern6.js';
import Cavern7 from './scenes/Cavern7.js';
import EndScene from './scenes/EndScene.js';
import Menu from './scenes/Menu.js';
import Tutorial from './scenes/Tutorial.js';
import StoryScene from './scenes/StoryScene.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', Boot);
    this.scene.add('Cavern1', Cavern1);
    this.scene.add('Menu', Menu);
    this.scene.add('Cavern2', Cavern2);
    this.scene.add('Cavern3', Cavern3);
    this.scene.add('Cavern4', Cavern4);
    this.scene.add('Cavern5', Cavern5);
    this.scene.add('Cavern6', Cavern6);
    this.scene.add('Cavern7', Cavern7);
    this.scene.add('EndScene', EndScene);
    this.scene.add('Tutorial', Tutorial);
    this.scene.add('StoryScene', StoryScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
