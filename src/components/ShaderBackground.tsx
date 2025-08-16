import { Component, onMount, onCleanup } from 'solid-js';
import fragmentShader from './bg.glsl?raw';



interface ShaderBackgroundProps {
  class?: string;
  style?: string;
}

const ShaderBackground: Component<ShaderBackgroundProps> = (props) => {

    let canvasRef: HTMLCanvasElement | undefined;
  let animationFrameId: number | undefined;
  let startTime = Date.now();
  let gl: WebGLRenderingContext | null = null;
  let program: WebGLProgram | null = null;
  let timeUniformLocation: WebGLUniformLocation | null = null;
  let resolutionUniformLocation: WebGLUniformLocation | null = null;
  let aspectUniformLocation: WebGLUniformLocation | null = null;

  const vertexShader = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
    }
  `;

  const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  };

  const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  };

  const render = () => {
    if (!gl || !program || !canvasRef) return;
    
    const time = (Date.now() - startTime) / 1000;
    
    gl.viewport(0, 0, canvasRef.width, canvasRef.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.useProgram(program);
    
    gl.uniform1f(timeUniformLocation, time);
    gl.uniform2f(resolutionUniformLocation, canvasRef.width, canvasRef.height);
    gl.uniform1f(aspectUniformLocation, canvasRef.width / canvasRef.height);
    
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    animationFrameId = requestAnimationFrame(render);
  };

  const handleResize = () => {
    if (!canvasRef || !gl) return;
    
    canvasRef.width = window.innerWidth;
    canvasRef.height = window.innerHeight;
    
    // Update aspect ratio uniform
    const aspect = canvasRef.width / canvasRef.height;
    gl.uniform1f(aspectUniformLocation, aspect);
  };
  
  onMount(() => {
    if (!canvasRef) return;
    
    // Initialize WebGL context
    gl = canvasRef.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    
    // Create shaders
    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    
    if (!vertShader || !fragShader) return;
    
    // Create program
    program = createProgram(gl, vertShader, fragShader);
    if (!program) return;
    
    // Create a buffer for the rectangle
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Two triangles that cover the whole screen
    const positions = [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1, 
       1, -1,
       1,  1
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // Set up attribute
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Get uniform locations
    timeUniformLocation = gl.getUniformLocation(program, "u_time");
    resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    aspectUniformLocation = gl.getUniformLocation(program, "aspect");
    
    // Set initial size
    canvasRef.width = window.innerWidth;
    canvasRef.height = window.innerHeight;
    
    // Set up resize handler
    window.addEventListener('resize', handleResize);
    
    // Start animation loop
    render();
  });
  
  onCleanup(() => {
    window.removeEventListener('resize', handleResize);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
  
  return (
    <canvas 
      ref={canvasRef} 
      class={`absolute top-0 left-0 w-screen h-screen ${props.class || ''}`} 
    />
  );
};

export default ShaderBackground;