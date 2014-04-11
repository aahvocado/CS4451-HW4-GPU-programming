//card3.frag fragment shader for the duck card

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D texture;
float getGray(vec4 c);
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

    vec2 leftVert = vec2(vertTexCoord.x-offset, vertTexCoord.y);
    vec2 upVert = vec2(vertTexCoord.x, vertTexCoord.y+offset);
    vec2 rightVert = vec2(vertTexCoord.x+offset, vertTexCoord.y);
    vec2 downVert = vec2(vertTexCoord.x, vertTexCoord.y-offset);

    vec4 leftColor = texture2D(texture, leftVert.xy);
    vec4 upColor = texture2D(texture, upVert.xy);
    vec4 rightColor = texture2D(texture, rightVert.xy);
    vec4 downColor = texture2D(texture, downVert.xy);

    float cg = getGray(diffuse_color);
    float sumg = getGray(leftColor) + getGray(upColor) + getGray(downColor) + getGray(rightColor);
	  float newg = sumg-(4*cg);

    gl_FragColor = vec4(newg, newg, newg, 1.0);

}

float getGray(vec4 c){
  float gray = 0.2989*c.r + 0.5870*c.g + 0.1140*c.b;
  return gray;
}

vec4 getGrayscale(vec4 c){
  	float gray = c.r*.2989 + c.g*.5870 + c.b*.1140;
    vec4 gscale = vec4(gray, gray, gray, 1.0);
    return gscale;
}