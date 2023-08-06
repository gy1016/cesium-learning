import { Matrix4, SceneMode, CullFace, Color } from 'cesium';
// @ts-ignore
import { RenderState, VertexArray, DrawCommand, Pass, BufferUsage, ShaderProgram, Context } from 'cesium';
import { CustomGeometry } from './CustomGeometry';

export interface ICustomPrimitiveOptions {
  id: number;
  show?: boolean;
  modelMatrix: Matrix4;
  geometry: CustomGeometry;
}

export class CustomPrimitve {
  static vs = `
    in vec3 position;
    void main() {
      gl_Position = czm_projection * czm_view * czm_model * vec4(position, 1.0);
    }`;

  static fs = `
    uniform vec3 u_color;
    void main() {
      out_FragColor = vec4(u_color, 1.0);
    }`;

  static attributeLocations = {
    position: 0,
  };

  static getVertexArray(context: Context, geometry: CustomGeometry) {
    let vertexArray = context.cache.customizePrimitive_vertexArray;

    if (vertexArray) {
      return vertexArray;
    }

    vertexArray = VertexArray.fromGeometry({
      context: context,
      geometry: geometry,
      // TODO: 从管道获得
      attributeLocations: CustomPrimitve.attributeLocations,
      bufferUsage: BufferUsage.STATIC_DRAW,
    });

    context.cache.customizePrimitive_vertexArray = vertexArray;
    return vertexArray;
  }

  public id: number;
  public show: boolean;
  public geometry: CustomGeometry;
  public modelMatrix: Matrix4;
  private _sp: ShaderProgram;
  private _va: VertexArray;
  private _uniforms: { [key: string]: () => any };
  private _drawCommand: DrawCommand;

  constructor(options: ICustomPrimitiveOptions) {
    const { id, show, geometry, modelMatrix } = options;
    this.id = id;
    this.show = show ?? true;
    this.geometry = geometry;
    this.modelMatrix = Matrix4.clone(modelMatrix ?? Matrix4.IDENTITY);

    this._sp = undefined;
    this._va = undefined;
    this._uniforms = {
      u_color: function () {
        return Color.GRAY;
      },
    };
    this._drawCommand = new DrawCommand({
      owner: this,
    });
  }

  update(frameState: RenderState) {
    if (!this.show || frameState.mode !== SceneMode.SCENE3D) return;

    const context = frameState.context;
    const geometry = this.geometry;
    if (!this._va) this._va = CustomPrimitve.getVertexArray(context, geometry);

    this._sp = ShaderProgram.replaceCache({
      context: context,
      shaderProgram: this._sp,
      vertexShaderSource: CustomPrimitve.vs,
      fragmentShaderSource: CustomPrimitve.fs,
      attributeLocations: CustomPrimitve.attributeLocations,
    });

    const drawCommand = this._drawCommand;
    drawCommand.vertexArray = this._va;
    drawCommand.shaderProgram = this._sp;
    drawCommand.uniformMap = this._uniforms;
    drawCommand.renderState = RenderState.fromCache({
      cull: {
        enabled: true,
        face: CullFace.BACK,
      },
      depthTest: {
        enabled: true,
      },
    });

    const commandList = frameState.commandList;
    const passes = frameState.passes;

    if (passes.render) {
      drawCommand.modelMatrix = this.modelMatrix;
      drawCommand.pass = Pass.OPAQUE;
      commandList.push(drawCommand);
    }
  }

  destory() {
    this._sp = this._sp && this._sp.destroy();
    for (const key in this) {
      // @ts-ignore
      this[key] = undefined;
    }
    return undefined;
  }
}
