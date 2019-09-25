export default class Angler extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'angler');
	}

	update(dronePosition) {
		// Todo: It should move toward the camera drone
	}
}