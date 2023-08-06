import { BoundingSphere, ComponentDatatype, GeometryAttribute, GeometryAttributes, PrimitiveType } from 'cesium';

export interface ICustomGeometryOptions {
  position: Float64Array;
  st: Float32Array;
  primitiveType?: PrimitiveType;
}

export class CustomGeometry {
  public attributes: GeometryAttributes = new GeometryAttributes();
  public primitiveType: PrimitiveType = PrimitiveType.TRIANGLES;
  public boundingSphere: BoundingSphere;
  public indices?: Uint16Array;

  constructor(options: ICustomGeometryOptions) {
    const { position, st, primitiveType } = options;
    this.attributes.position = new GeometryAttribute({
      componentDatatype: ComponentDatatype.DOUBLE,
      componentsPerAttribute: 3,
      values: position,
    });

    this.attributes.st = new GeometryAttribute({
      componentDatatype: ComponentDatatype.FLOAT,
      componentsPerAttribute: 2,
      values: st,
    });

    this.primitiveType = primitiveType ?? PrimitiveType.TRIANGLES;
    this.boundingSphere = BoundingSphere.fromVertices([...position]);
  }
}
