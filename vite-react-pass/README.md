# React 通关掘金小册学习

echo "# learn-react-pass" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:hxh-ly/learn-react-pass.git
git push -u origin main

## 06 受控组件

1. value 由用户控制就是非受控模式，由代码控制就是受控模式。不能用代码改变的，我们只是设置了一个 default 值，其他由用户控制-非受控模式
2. 代码可以改变表单的 value-受控模式

## 07 实现 calendar 组件

1.静态布局

header
flex 的格子

2.逻辑

- 日期属性，支持往前切换月份，支持往后切换月份
- 改变日期
- 增加 2 个参数 defaultValue 和 onChange
- 提供 ref 来暴露 calendar 的 api
- 添加两种模式的支持，使用 ahook

## 08 实现 calendar 组件（上）

- 用 dayjs
- 布局部分，切换日期的 header 和每个月的日期的 MonthCalendar
- sass 管理样式

## 09 实现 calendar 组件 （下）

- className + style
- dateRender + dateInnerContent
- locale
- value + onChange 【ahooks 会调用 onChange】

## 13 实现 Icon 组件（上）

- style className size spin Icon 封装
- createIcon
- createIconFromIconFont

## 14 实现 Space 组件

- direction、style、align、size、wrap、split、
- ConfigProvider 提供统一的 size

```tsx
interface SpaceProps extends React.HtmlAttributes<HtmlDivElement> {}
```

## 18 实现 WaterMark 组件

- 【style、className、width、height、zIndex、rotate、gap、offset】【getContainer】【fontStyle、image、content】
- WaterMark: getContainer useEffect->generateWark
- useWaterMark
- createWaterMark
- createCanvasData
- MutationObserver 在 UseWaterMark 中，容器存在的时候，先清，在创建开始监听元素以及属性，在监听。创建的 callback 的 onChange 时删除水印重绘

## 19 手写 react-lazy 组件

- 【style，height，width，offset，onVisible，playload】
- IntersectionObserver

## react-spring

- useSpringValue/useSpring/useSpring 函数重载/多个元素的动画 useSprings/动画依次 useTrail/useSpringRef 拿到动画的 ref/多个动画安排 useChain
- 实现笑脸动画

- part1 网格
```jsx
STROKE_WIDTH 0.5
x2 -> MAX_WIDTH 150
y2 -> MAX_HEIGHT 100

viewbox = 0 0 150 100

      <div className="container">
        <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
          <g>
            {gridSprings.map(({ x2 }, index) => {
              return (
                <animated.line
                  x1={0}
                  y1={index * 10}
                  x2={x2}
                  y2={index * 10}
                  key={index}
                  strokeWidth={STROKE_WIDTH}
                  stroke="currentColor"
                />
              );
            })}

            {gridSprings.map(({ y2 }, index) => {
              return (
                <animated.line
                  x1={index * 10}
                  y1={0}
                  x2={index * 10}
                  y2={y2}
                  key={index}
                  strokeWidth={STROKE_WIDTH}
                  stroke="currentColor"
                />
              );
            })}
          </g>
        </svg>
      </div>
```

- part2 笑脸
```jsx
COORDS = [
    [50,30],
    [90,30],
    [50,50],
    [60,60],
    [70,60],
    [80,60],
    [90,50]
]
const boxApi = useSpringRef()
const [boxSprings] = useSprings(7,(i)=>{
    return {
        ref:boxApi,
        from:{scale:0},
        to:{scale:0},
        delay:i*200,
        config:{
            mass:,
            tension:,
        },
    }
})

useChain([gridRef,boxApi],[0,1],1500)

<svg>

    {
        boxSprings.map(({scale},i)=>{
            return <animated.rect  key={i} width={10} height={10} style={{
                transfrom: `translate(${COORDS[i][0]}px,${COORDS[i][1]}px)`
                transfromOrigin:'5px 5px',
                scale
            }}/>
        })
    }
</svg>
```

## 24 动画结合手势
```jsx
npm i @react-spring/web @use-gesture/react -D

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

function Viewpager(){
  const width = window.innerWidth;
  const [props,api] = useSprings(pages.length,(v,i)=>{
    return {
      x:i*width,
      scale:1
    }
  })

  return <>
  {props.map(({x,scale},i)=>{
    return <div className='wrapper'>
      <animated.div key={i} style={{x}} className='page'>
        <animated.div  style={{scale, backgroundImage:`url(${pages[i]})` }} />
      </animated.div>
    </div>
  })}
  </>
}

export default Viewpager
```

## 26 tailwindcss 原子化的css框架
安装

```
npm install tailwindcss @tailwindcss/vite -D

App.css
@import "tailwindcss";
```
### 介绍
tailwindcsss是一个流行的原子化css框架。传统的css写法是定义class，然后在class内部写样式。而原子化css是通过预定义一些class样式，通过组合class完成样式的编写。
预设的的class可以通过配置文件修改值，
使用
- text-[14px]
- @layer aaa
- @apply

module.css使用
- className会➕hash，可以通过vite.config.js generateScopedName 配置
- :global(.class) 是全局；使用直接用类名
- :local(.class) 是局部；与全局相反
- globalModulePaths 匹配全局的module.css
- localsConvention 导出的对象的key就会变成驼峰的
- scopeBehaviour:'global' 
总结: module.css用来防止样式冲突，bem是从规范上限制不可靠。module.css是从编译上避免命名冲突。组件开发都有模块化的需求

## 30 Message组件的开发
- useStore msgList add remove clear update
- useTimer
- MessageProvider
- MessageItem
- 添加动画 react-transition-group   csstransitiongroup包裹 + csstransition包裹子项 class实现enter+exit
- message.info
- MessageProvider + forWardRef + useImperative
- ContextProvder.tsx 里创建context暴露，返回Context.Provider
- useMessage使用context中的ref元素
- ConfigContext.Provider (MessageProvider放出去，接在context里)
- 在Aaa组件里使用useMessage
- useImperative的是某个时机，才修改的。 我们是先执行了useMessage ，在设置的MessageRef.current

## 31popover气泡卡片的开发
- 计算浮动位置float-ui npm install @floating-ui/react -D
- 了解hooks useFloating useHover useInteractions
- + useDiss useFloating配置offset、placement、 <FloatArrow></FloatArrow>
- 边界处理，如果出现在上方，滚动到不可视，应该变到下方 flip中间件
- 封装 props {content,open,openChange,placement,trigger,className,style }
- createPortal挂在body下
## 32项目里如何快速定位组件源码
- npm i click-to-react-component
- 原理，_reactFiber -> debugFiber(可以层层找到父filber) ，_debuggerSource(定位源码行列号位置)
- ui实现，定义框选样式，target是个state，设置dataset属性，mousemove改变target，从而获取 [data-xx]的样式。
- ui实现，popover是通过 @floating-ui实现的
## 35colorPicker颜色选择器组件
- 布局 colorPickerPanel + colorInput ✅
- colorPickerPanel = Palette ✅ + Slider
- type color ✅
- Palette组件的实现 ✅
- Handler组件的实现 ✅
- Transform组件的实现 ✅
- 实现拖拽的useColorDrag.ts  ✅
- 根据x,y去算颜色 utils.ts ✅
- 初始化颜色不对，最开始也要计算一次滑块位置 ✅
- 支持受控和非受控组件 ✅
- 色展示input （h l） ✅