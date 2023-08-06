# Cesium 学习记录

## 1. 自定义几何——Primitive

![primitive](./assets/images/primitive.png)

## 2. 高阶用法——DrawCommand

```js
class MyPrimitive {
    constructor() {
        this.drawCommand = null;
    }
    createCommand(context) {}

    update(frameState) {
        if (!this.drawCommand) {
            this.createCommand(frameState.context);
        }
        frameState.commandList.push(this.drawCommand);
    }
}

var myPrimitive = new MyPrimitive();
viewer.scene.primitives.add(myPrimitive);
```

## 3. 屏幕空间误差——SSE

[SSE详解](https://www.sgyat.cn/)

## 4. 添加自定义几何体

提供模型的顶点数据即可完成模型的渲染，详情见[DrawCommand详解](https://www.sgyat.cn/2023/07/22/DrawCommand/)。
