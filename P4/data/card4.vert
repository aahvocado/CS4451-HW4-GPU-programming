//card4.vert: vertex shader for the mountain card

// Our shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER

float getGray(vec4 c);

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;


// Come from the geometry/material of the object
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;

void main() {
    vertColor = color;
    vertNormal = normalize(normalMatrix * normal);
    vec4 vert = vertex;
    gl_Position = transform * vert;
    vertLightDir = normalize(-lightNormal);
    vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);
	
	//your code here
    vec4 tc = texture2D(texture, texCoord);
    float g = getGray(tc);

    vertNormal = vec3(normal.x*g,normal.y*g,normal.z*g)*5000.0;
    vert = vec4(vertex.x + vertNormal.x, vertex.y + vertNormal.y, vertex.z + vertNormal.z, 1.0);
}

float getGray(vec4 c){
  float gray = 0.2989*c.r + 0.5870*c.g + 0.1140*c.b;
  return gray;
}