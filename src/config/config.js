/*global Phaser*/

import PhaserMatterCollisionPlugin from "../packages/phaser-matter-collision-plugin.js";

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
    default: 'matter',
    matter: {
        gravity: { y: 0 },
        debug: true
    }
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision"
      }
    ]
  }
};
