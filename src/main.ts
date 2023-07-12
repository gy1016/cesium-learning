import './style.css';
import { Viewer, Ion, Cartesian3, Transforms } from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css';
import cubePrimitive from './1-primitive/cube';
import MyPrimitive from './2-draw-command/CubePrimitive';

(window as any).CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/';

Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTJmMmVkMy0wNDRiLTQ1ZjktYjRjMi1jNDRhM2VkYjYxZjEiLCJpZCI6NTYzMDcsImlhdCI6MTYyMTM4OTAxOX0.qurAqe_Vv9dNRnYiMiJ5LdeIrzq1q9VkNSldOJdcjRc';

export const viewer = new Viewer('container', {
  contextOptions: {
    requestWebgl1: true,
  },
});

viewer.scene.primitives.add(cubePrimitive);
// viewer.scene.primitives.add(trianglePrimitive);

var origin = Cartesian3.fromDegrees(106, 26, 250000 / 2);
var modelMatrix = Transforms.eastNorthUpToFixedFrame(origin);
viewer.scene.primitives.add(new MyPrimitive(modelMatrix));
