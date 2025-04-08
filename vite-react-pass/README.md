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