//card1.frag: fragment shader for the swiss cheese card.

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

void main() { 
   	vec4 diffuse_color = vec4 (0.0, 1.0, 2.0, 1.0);
   	float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  	gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.8);

   	//your code here
	float d = .166;//distance between the center of each circle

	float numRows = 3.0;
  	float numCols = 3.0;

  	float radius = 0.09;

  	for(float x = 0.0; x < numRows; x++){
	  	for(float y = 0.0; y < numCols; y++){

	  		vec3 c = vec3(d * 2.0 * x + d, d * 2.0 * y + d, 0.0);//center point of this circle
//vertTexCoord.x > c.x - radius && vertTexCoord.x < c.x + radius && vertTexCoord.y > c.y - radius && vertTexCoord.y < c.y + radius 
	  		vec3 v3coord = vec3(vertTexCoord.x, vertTexCoord.y, vertTexCoord.z);
	  		float distance = sqrt( pow((c.x - v3coord.x), 2.0) + pow((c.y - v3coord.y), 2.0) );
	  		if( distance < radius){

  				gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.0);

	  		}
	  	}
  	}	
}
