import './style.css';
import { Viewer, Ion } from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css';
import cubePrimitive from './primitive/cube';

(window as any).CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/';

Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTJmMmVkMy0wNDRiLTQ1ZjktYjRjMi1jNDRhM2VkYjYxZjEiLCJpZCI6NTYzMDcsImlhdCI6MTYyMTM4OTAxOX0.qurAqe_Vv9dNRnYiMiJ5LdeIrzq1q9VkNSldOJdcjRc';

export const viewer = new Viewer('container');

viewer.scene.primitives.add(cubePrimitive);
