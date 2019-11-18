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
uniform int uRadiusPlus;

void main(void)
{
	// Standardize positions relative to screen size
	vec2 st = gl_FragCoord.xy / uResolution;
	// OpenGL indexes the screen from the bottom-left pixel, Phaser from the top-left
	// So we need to flip the image vertically for it to render correctly
	st.y = 1. - st.y;
	vec2 stDronePos = uDronePosition / uResolution;

	// Get the screen's pixels
	vec4 texColor = vec4(0.1, 0.1, 0.1, 0.9);

	// Take the distance from this pixel to the drone
	float radius = distance(st, stDronePos);

	// Now to make the actual light effect
	float innerLanternRadius, outerLanternRadius;
	if (uRadiusPlus == 0)
	{
		innerLanternRadius = 0.1;
		outerLanternRadius = 0.3;
	}
	else
	{
		innerLanternRadius = 0.2;
		outerLanternRadius = 0.4;
	}
	float greyValue = 0.15;

//	// Everything outside the light's outer radius will be a flat, almost black color
//	// Not totally black, so that silhouettes can still be seen
//	if(radius > outerLanternRadius)
//	{
//		texColor *= vec4(vec3(greyValue), 1.);
//	}
//	// Between the inner and outer radii, we "tween" the color between the pixel's
//	// original color and that dark dark grey color, to make a light falloff effect
//	else if(radius > innerLanternRadius && radius <= outerLanternRadius)
//	{
//		texColor *= vec4(vec3(1. - (1. - greyValue) * smoothstep(innerLanternRadius, outerLanternRadius, radius)), 1.);
//		texColor.a *= 1. - smoothstep(innerLanternRadius, outerLanternRadius, radius);
//	}

    if (radius < innerLanternRadius)
    {
        texColor = vec4(0.);
    }
    else if (radius > innerLanternRadius && radius <= outerLanternRadius)
    {
        // Tween opacity between 0 and 0.9
        texColor *= smoothstep(innerLanternRadius, outerLanternRadius, radius);
    }

	// Everything within the inner radius will be left its original color
	
	gl_FragColor = texColor;
}