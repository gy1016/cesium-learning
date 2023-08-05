export const vertexShaderText = `attribute vec3 position;
void main() {
  gl_Position = czm_projection * czm_view * czm_model * vec4(position, 1.0);
}`;

export const fragmentShaderText = `uniform vec3 u_color;
void main(){
  gl_FragColor = vec4(u_color, 1.0);
}`;
