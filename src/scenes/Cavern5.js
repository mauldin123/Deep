/*global Phaser*/
export default class Cavern5 extends Phaser.Scene {
  constructor () {
    super('Cavern5');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.image('logo', './assets/logo.png');

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    //Create the scene
    var logo = this.add.image(this.centerX, this.centerY, 'logo');
  }

  update (time, delta) {
    // Update the scene
  }
}
