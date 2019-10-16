/*global Phaser*/

export default {
  type: Phaser.WEBGL,
  parent: 'deep',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
  // backgroundColor: '#153a4f',
  width: 1022,
  height: 950,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
    }
  }
};
