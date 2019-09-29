export default class LanternPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
	constructor(game) {
		super({
			game: game,
			renderer: game.renderer,
			fragShader: game.cache.text.get('lantern_shader')
		});
	}
}