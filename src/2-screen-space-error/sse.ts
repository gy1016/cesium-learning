import { Cesium3DTileset, Viewer } from 'cesium';

export const addFourBuilding = async (viewer: Viewer, url: string) =>
  viewer.scene.primitives.add(
    await Cesium3DTileset.fromUrl(url, {
      maximumScreenSpaceError: 1,
    })
  );
