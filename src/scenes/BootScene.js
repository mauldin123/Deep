/*global Phaser*/

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
    
  }

  init (data) {
    // Initialization code goes here
    this.scene.start('Cavern1');
  }

  preload () {

  }

  create (data) {
    //Create the scene
  }

  update (time, delta) {
    // Update the scene
  }
}
