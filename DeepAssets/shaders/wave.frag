#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uMainSampler;

vec4 waveFilter(sampler2D image, float amplitude, float period, float phase)
{
	vec2 st = gl_FragCoord.xy;
	st.x += amplitude * sin(st.y / period + phase * uTime);
	st /= uResolution;
	vec4 texColor = texture2D(image, st);
	return texColor;
}

void main(void) 
{
	gl_FragColor = waveFilter(uMainSampler, 20., 20., -1.);
}