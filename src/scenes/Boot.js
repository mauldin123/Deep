import WavePipeline from '../graphics/WavePipeline.js';
import LanternPipeline from '../graphics/LanternPipeline.js';

export default class Boot extends Phaser.Scene {
	preload() {
		this.load.setBaseURL('DeepAssets');
		this.load.text('lantern_shader', 'shaders/lantern.frag');
	}

	create() {
		this.game.renderer.addPipeline('Lantern', new LanternPipeline(this.game));
		this.game.renderer.addPipeline('Wave', new WavePipeline(this.game));
		this.scene.start('Menu');
	}	
}