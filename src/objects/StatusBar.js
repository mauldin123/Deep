export default class StatusBar extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'camera');
		scene.add.rectangle(x, y, x + 100, y + 50, 0x999999);
	}
}