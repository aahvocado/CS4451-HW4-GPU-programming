//card2.frag: fragment shader for the mandelbrot card

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

vec3 plus(vec3 a, vec3 b);
vec3 times(vec3 a, vec3 b);
float dist(vec3 a, vec3 b);

void main() { 
  vec4 diffuse_color = vec4 (1.0, 0.0, 0.0, 1.0);
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0); 

  //mandelbrot
  int i = 0;//iterations
  int maxi = 20;

  float offset = 2.1;

  float cxmin = -2.1;
  float cxmax = .9;
  float cymin = -1.5;
  float cymax = 1.5;



  float currR = 0.0;//distance from pt to origin

  	vec3 coord = vec3 (vertTexCoord.x, vertTexCoord.y, vertTexCoord.z);
  	coord.x = ((vertTexCoord.x)*(cxmax-cxmin))/(1.0)+cxmin;
  	coord.y = ((vertTexCoord.y)*(cymax-cymin))/(1.0)+cymin;
  	
	vec3 z = vec3 (0,0,0);

	if(coord.x >= cxmin && coord.x <= cxmax && coord.y >= cymin && coord.y <= cymax){
		for(i=0;i<maxi && abs(currR) < 2.0;i++){
			z = times(z, z);
			z = plus(z, coord);
			currR = dist(coord, z);
		}
	}

	diffuse_color = vec4(1.0, 1.0, 1.0, 1.0);
	if(i==maxi){
		gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0); 
	}
}

vec3 plus(vec3 a, vec3 b){
	vec3 r = vec3(0,0,0);
	r.x = a.x + b.x;
	r.y = a.y + b.y;
	return r;
}
vec3 times(vec3 a, vec3 b){
	vec3 r = vec3(0,0,0);
	r.x = a.x*b.x - a.y*b.y;
	r.y = a.x*b.y + a.y*b.x;
	return r;
}
// distance between x and y of two points
float dist(vec3 a, vec3 b){
	return sqrt(pow(a.x - b.x, 2.0) + pow(a.y - b.y, 2.0));
}

