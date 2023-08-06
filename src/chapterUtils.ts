import { Cartesian3, Matrix4, Transforms } from 'cesium';
import cubePrimitive from './1-primitive/cube';
import { addFourBuilding } from './2-screen-space-error/sse';
import MyPrimitive from './3-draw-command/CubePrimitive';
import { viewer } from './main';
import { CustomGeometry, CustomPrimitve } from './4-custom-geometry';

function chapter1() {
  viewer.scene.primitives.add(cubePrimitive);
}

function chapter2() {
  const fourBuilding = addFourBuilding(viewer, '../assets/models/fourbuilding/tileset.json');
  viewer.zoomTo(fourBuilding);
}

function chapter3() {
  let origin = Cartesian3.fromDegrees(106, 26, 250000 / 2);
  let modelMatrix = Transforms.eastNorthUpToFixedFrame(origin);
  Matrix4.multiplyByUniformScale(modelMatrix, 500000.0, modelMatrix);
  viewer.scene.primitives.add(new MyPrimitive(modelMatrix));
}

function chapter4() {
  let modelMatrix = Transforms.eastNorthUpToFixedFrame(Cartesian3.fromDegrees(106, 26, 250000 / 2));
  Matrix4.multiplyByUniformScale(modelMatrix, 500000.0, modelMatrix);
  const position = new Float64Array([
    -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5,

    -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,

    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5,

    -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5,

    -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,

    0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5,
  ]);
  const st = new Float32Array([
    // 选择左下图
    0, 0, 0, 0.5, 0.25, 0, 0, 0.5, 0.25, 0.5, 0.25, 0,
    // 选择中下图
    0.25, 0, 0.5, 0, 0.25, 0.5, 0.25, 0.5, 0.5, 0, 0.5, 0.5,
    // 选择中右图
    0.5, 0, 0.5, 0.5, 0.75, 0, 0.5, 0.5, 0.75, 0.5, 0.75, 0,
    // 选择左上图
    0, 0.5, 0.25, 0.5, 0, 1, 0, 1, 0.25, 0.5, 0.25, 1,
    // 选择中上图
    0.25, 0.5, 0.25, 1, 0.5, 0.5, 0.25, 1, 0.5, 1, 0.5, 0.5,
    // 选择右上图
    0.5, 0.5, 0.75, 0.5, 0.5, 1, 0.5, 1, 0.75, 0.5, 0.75, 1,
  ]);
  const customGeometry = new CustomGeometry({
    position,
    st,
  });
  const customPrimitive = new CustomPrimitve({
    id: 1,
    modelMatrix,
    geometry: customGeometry,
  });
  viewer.scene.primitives.add(customPrimitive);
}

export { chapter1, chapter2, chapter3, chapter4 };
