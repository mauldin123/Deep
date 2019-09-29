// The older ES versions of GLSL require you to specify the float precision
#ifdef GL_ES
precision mediump float;
#endif

// Some GL versions have a texture function, some don't
// If this version doesn't we'll just make `texture` an alias of the texture2D function
// since we're only dealing with 2D textures
#ifndef texture
#define texture texture2D
#endif

uniform vec2 uDronePosition;
uniform vec2 uResolution;
uniform sampler2D uMainSampler; // The screen
uniform vec4 uStatusBar; // x coord, y coord, width, and height of status bar

void main(void)
{
	// Standardize positions relative to screen size
	vec2 st = gl_FragCoord.xy / uResolution;
	// OpenGL indexes the screen from the bottom-left pixel, Phaser from the top-left
	// So we need to flip the image vertically for it to render correctly
	st.y = 1. - st.y;
	vec2 stDronePos = uDronePosition / uResolution;
	vec4 stStatusBar = uStatusBar / uResolution.xyxy;

	// Get the screen's pixels
	vec4 texColor = texture(uMainSampler, st);

	// Take the distance from this pixel to the drone
	float radius = distance(st, stDronePos);

	// Since we want to be able to see the status bar at all times, we should just set
	// the pixels of the status bar to their input pixels.
	if (st.x >= stStatusBar.x && st.x <= stStatusBar.x + stStatusBar.z &&
	   st.y >= stStatusBar.y && st.y <= stStatusBar.y + stStatusBar.w)
	{
		gl_FragColor = texColor;
		return;
	}

	// Now to make the actual light effect
	float innerLanternRadius = 0.1;
	float outerLanternRadius = 0.3;
	float greyValue = 0.15;

	// Everything outside the light's outer radius will be a flat, almost black color
	// Not totally black, so that silhouettes can still be seen
	if(radius > outerLanternRadius)
	{
		texColor *= vec4(vec3(greyValue), 1.);
	}
	// Between the inner and outer radii, we "tween" the color between the pixel's 
	// original color and that dark dark grey color, to make a light falloff effect
	else if(radius > innerLanternRadius && radius <= outerLanternRadius)
	{
		texColor *= vec4(vec3(1. - (1. - greyValue) * smoothstep(innerLanternRadius, outerLanternRadius, radius)), 1.);
	}

	// Everything within the inner radius will be left its original color
	
	gl_FragColor = texColor;
}