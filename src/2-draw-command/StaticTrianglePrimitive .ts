// @ts-nocheck
import * as Cesium from 'cesium';
import { createCommand } from './utils';

class StaticTrianglePrimitive {
  /**
   * @param {Matrix4} modelMatrix matrix to WorldCoordinateSystem
   */
  constructor(modelMatrix) {
    this._modelMatrix = modelMatrix;
  }

  /**
   * @param {FrameState} frameState
   */
  update(frameState) {
    const command = createCommand(frameState, this._modelMatrix);
    frameState.commandList.push(command);
  }
}

const modelCenter = Cesium.Cartesian3.fromDegrees(112, 23, 0);
const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(modelCenter);

export const trianglePrimitive = new StaticTrianglePrimitive(modelMatrix);
