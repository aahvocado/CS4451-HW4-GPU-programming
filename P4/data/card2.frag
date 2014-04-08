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

float mandelbrot();
float dist(vec3 a, vec3 b);

void main() { 
  vec4 diffuse_color = vec4 (1.0, 0.0, 0.0, 1.0);
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0); 

  //mandelbrot
  float arbitrary = 10;//using a number to multiply and divide to get larger and work with ints
  int i = 0;//iterations
  int maxi = 20;

  double cxmin = -2.1;
  double cxmax = .9;
  double cymin = -1.5;
  double cymax = 1.5;

 	for(int x = 0; x < (1.0*arbitrary); x++){
		for(int y = 0; y < (1.0*arbitrary); y++){
			vec3 p = vec3 (0,0,0);
			x = x/arbitrary;
			y = y/arbitrary;
			double z = 0;
			while(z < 2 && i<maxi){
				i = i+1;
			}

		}
	}
}

float mandelbrot(){
	return 1.0;
}

//calculates distance between x and y of two points
float dist(vec3 a, vec3 b){
	return sqrt(pow(a.x - b.x, 2) + pow(a.y - b.y, 2));
}

