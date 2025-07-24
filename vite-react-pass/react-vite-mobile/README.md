# 配置webapp环境
## 创建Vite+React项目
npm create vite@latest react-h5-rem -- --template react
cd react-h5-rem

## 安装依赖
npm install

## 安装适配相关依赖
npm install postcss-pxtorem autoprefixer --save-dev

## 方案说明
适配原理
以 750px 设计稿为基准，1rem = 75px（设计稿宽度的 1/10）
通过 postcss-pxtorem 自动将 CSS 中的 px 转换为 rem 单位
动态计算根元素 fontSize，实现不同设备上的等比例缩放

```js
//src/utils/rem 进行计算
// 动态设置根元素fontSize
function setRemUnit() {
  // 设计稿宽度为375px
  const designWidth = 375;
  // 实际设备宽度
  const deviceWidth = document.documentElement.clientWidth || window.innerWidth;

  // 限制最大宽度，避免在平板等大屏设备上字体过大
  const maxWidth = 750;
  const width = Math.min(deviceWidth, maxWidth);

  // 计算根元素fontSize，设计稿1px = 0.01rem
  // 例如：设计稿375px宽度对应根元素fontSize为37.5px，1rem = 37.5px
  document.documentElement.style.fontSize = (width / designWidth) * 37.5 + "px";
}

// 初始化
setRemUnit();

// 监听窗口大小变化
window.addEventListener("resize", setRemUnit);

// 监听屏幕旋转事件
window.addEventListener("orientationchange", setRemUnit);

```

```js
// 在main.tsx引入
import "./utils/rem.js";
```

```js
//post.config.js
import autoprefixer from "autoprefixer";
import pxtorem from "postcss-pxtorem";
export default {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue: 75,
      propList: ["*"],
      unitPrecision: 5,
      selectorBlackList: ["ignore-rem"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1,
      exclude: /node_modules/i,
    }),
  ],
};
```

固定内容区域是750px，且居中显示。 >750px的设备则居中显示。 <750px的缩放显示，最小的显示尺度在375px。
```css
#root {
  min-width:375px;
  max-width: 750px;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
  background-color: #ccc;
  overflow: auto;
  height: 100%;
}
```