// @ts-nocheck
import * as Cesium from 'cesium';
import { vertexShaderText, fragmentShaderText } from './shader';

export const createCommand = (frameState, matrix) => {
  const attributeLocations = {
    position: 0,
  };
  const uniformMap = {
    u_color() {
      return Cesium.Color.HONEYDEW;
    },
  };
  const positionBuffer = Cesium.Buffer.createVertexBuffer({
    usage: Cesium.BufferUsage.STATIC_DRAW,
    typedArray: new Float32Array([10000, 50000, 5000, -20000, -10000, 5000, 50000, -30000, 5000]),
    context: frameState.context,
  });
  const vertexArray = new Cesium.VertexArray({
    context: frameState.context,
    attributes: [
      {
        index: 0, // 等于 attributeLocations['position']
        vertexBuffer: positionBuffer,
        componentsPerAttribute: 3,
        componentDatatype: Cesium.ComponentDatatype.FLOAT,
      },
    ],
  });
  const program = Cesium.ShaderProgram.fromCache({
    context: frameState.context,
    vertexShaderSource: vertexShaderText,
    fragmentShaderSource: fragmentShaderText,
    attributeLocations: attributeLocations,
  });
  const renderState = Cesium.RenderState.fromCache({
    depthTest: {
      enabled: true,
    },
  });
  return new Cesium.DrawCommand({
    modelMatrix: matrix,
    vertexArray: vertexArray,
    shaderProgram: program,
    uniformMap: uniformMap,
    renderState: renderState,
    pass: Cesium.Pass.OPAQUE,
  });
};
