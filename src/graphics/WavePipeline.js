export default class WavePipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
	constructor(game) {
		super({
			game: game,
			renderer: game.renderer,
			fragShader: `
			#ifdef GL_ES
			precision mediump float;
			#endif

			uniform vec2 uResolution;
			uniform float uTime;
			uniform sampler2D uMainSampler;

			vec4 waveFilter(sampler2D image, float amplitude, float period, float phase)
			{
				vec2 st = gl_FragCoord.xy;
				st.y = 1. - st.y;
				st.x += amplitude * sin(st.y / period + phase * 0.0005 * uTime);
				st /= uResolution.xy;
				vec4 texColor = texture2D(image, st);
				return texColor;
			}

			void main() 
			{
				gl_FragColor = waveFilter(uMainSampler, 10., 50., -10.);
			}`
		});

		
	}
}