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
