import {
  Cartesian3,
  Cartographic,
  Color,
  ColorGeometryInstanceAttribute,
  Ellipsoid,
  GeometryInstance,
  Matrix4,
  Primitive,
  Transforms,
} from 'cesium';
import cubeGeometry from './geometry';
import cubeAppearance from './apperance';

const ellipsoid = Ellipsoid.WGS84;
// 看似复杂，其实只是对经纬度 (-100, 40) 这个点做垂直地表向上平移200km的计算，并将几何体放大50w倍（即变成500km那么大），返回矩阵而已
const modelMatrix = new Matrix4();
Matrix4.multiplyByUniformScale(
  Matrix4.multiplyByTranslation(
    Transforms.eastNorthUpToFixedFrame(ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(-100.0, 40.0))), // e-n-u计算，返回局部到世界坐标的转换矩阵
    new Cartesian3(0.0, 200000.0, 200000.0),
    modelMatrix
  ), // 平移计算，矩阵·平移向量
  500000.0,
  modelMatrix
); // 缩放计算，矩阵·50w

const cubeInstance2 = new GeometryInstance({
  geometry: cubeGeometry,
  modelMatrix: modelMatrix,
  attributes: {
    color: ColorGeometryInstanceAttribute.fromColor(Color.RED), // 快捷计算顶点颜色
  },
});

const cubePrimitive = new Primitive({
  geometryInstances: [cubeInstance2],
  appearance: cubeAppearance,
  asynchronous: false,
});

export default cubePrimitive;
