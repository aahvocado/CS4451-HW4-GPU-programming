//card3.frag fragment shader for the duck card

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D texture;
vec4 getGrayscale(vec4 c);

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;


void main() { 
  vec4 diffuse_color = texture2D(texture, vertTexCoord.xy);
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
  
  //your code here
  vec4 gscale = getGrayscale(diffuse_color);
    // gl_FragColor = vec4(diffuse * gscale.rgb, 1.0);

    float offset = 0.01;

    vec2 leftVert = (vertTexCoord.x-offset, vertTexCoord.y);
    vec4 leftColor = texture2D(texture, leftVert);
    vec4 lg = getGrayscale(leftColor);//left grayscale

    vec2 upVert = (vertTexCoord.x, vertTexCoord.y+offset);
    vec4 upColor = texture2D(texture, upVert);
    vec4 ug = getGrayscale(upColor);//up grayscale


    vec2 rightVert = (vertTexCoord.x+offset, vertTexCoord.y);
    vec4 rightColor = texture2D(texture, rightVert);
    vec4 rg = getGrayscale(rightColor);//right grayscale

    vec2 downVert = (vertTexCoord.x, vertTexCoord.y-offset);
    vec4 downColor = texture2D(texture, downVert);
    vec4 dg = getGrayscale(leftColor);//down grayscale

    lg = leftColor;//test to make it not grayscale again
    ug = upColor;
	rg = rightColor;
	dg = downColor;
	
    vec4 laplacianValue = vec4(lg+ug+rg+dg);//we added it
    vec4 newg = getGrayscale(laplacianValue);//we turned it into grayscale
    newg = newg - (4*gscale);

    gl_FragColor = vec4(diffuse * newg.rgb, 1.0);

}

vec4 getGrayscale(vec4 c){
  	float gray = c.r*.2989 + c.g*.5870 + c.b*.1140;
    vec4 gscale = vec4(gray, gray, gray, 1.0);
    return gscale;
}