import './style.css';
import * as Cesium from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css';
// import cubePrimitive from './1-primitive/cube';
// import { addFourBuilding } from './2-screen-space-error/sse';
// import MyPrimitive from './3-draw-command/CubePrimitive';

(window as any).CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/';

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTJmMmVkMy0wNDRiLTQ1ZjktYjRjMi1jNDRhM2VkYjYxZjEiLCJpZCI6NTYzMDcsImlhdCI6MTYyMTM4OTAxOX0.qurAqe_Vv9dNRnYiMiJ5LdeIrzq1q9VkNSldOJdcjRc';

export const viewer = new Cesium.Viewer('container', {
  // contextOptions: {
  //   requestWebgl1: true,
  // },
});

// 1. cube-primitive
// viewer.scene.primitives.add(cubePrimitive);

// 2. draw-command
// var origin = Cartesian3.fromDegrees(106, 26, 250000 / 2);
// var modelMatrix = Transforms.eastNorthUpToFixedFrame(origin);
// viewer.scene.primitives.add(new MyPrimitive(modelMatrix));

// 3. sse
// const fourBuilding = addFourBuilding(viewer, '../assets/models/fourbuilding/tileset.json');
// viewer.zoomTo(fourBuilding);
