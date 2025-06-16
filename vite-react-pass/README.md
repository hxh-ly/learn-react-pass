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

## 36实现Onboard组件（tour组件）

- div的width+height+四边boardWidth
- 实现mask移动的动画，改变boardWidth+transition
- 外层封装一层，加上上一步下一步的切换
  注意：

## 52实现todo list

1.拖拽插入（高亮）

2.拖出删除（垃圾桶高亮）

3.chekbox勾选

实现步骤

### 安装

```
npx create-vite
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

新建TodoList/index.tsx

```tsx
import {FC} from 'react'
interface ToDoListProps {
}
export const ToDoList:FC<TodoListProps> = (props)=>{
return <div></div>
}
```

安装tailWind，并配置

设置ToDoList/index.tsx的基本样式,并在`App.tsx`引入

```tsx
import {FC} from 'react'
interface ToDoListProps {
}
export const ToDoList:FC<TodoListProps> = (props)=>{
return <div className='w-1000 h-600 m-auto mt-10 p-10 border-2-black'></div>
}
```

因为像w-100这样的样式内置的className没有，需要在tailwind.config.js里配置(此处配置无效，后使用类似 `w-[1000px]`解决

继续写布局
```tsx
export const ToDoList:FC<TodoListProps> = (props)=>{
return <div className='w-1000 h-600 m-auto mt-10 p-10 border-2-black flex justify-between items-start'>
  <div className='flex-2 h-full mr-[10px] bg-blue-400 overflow-auto'></div>
  <div className='flex-1 h-full bg-blue-400'></div>
</div>
}
```
父元素flex，子元素2比1，margin-right:10px h-full是高100%

继续添加组件List、GarbageBin、NewItem三个组件
```tsx
import { FC } from "react";
import { NewItem } from "./NewItem";
import { GarbageBin } from "./GarbageBin";
import { List } from "./List";
import classNames from "classnames";
interface TodoListProps {}

export const TodoList: FC<TodoListProps> = (props) => {
  return (
    <div
      className={classNames(
        "w-[1000px] h-[600px] m-auto mt-10 p-10",
        "border-2-black",
        "flex justify-between items-start"
      )}
    >
      <div className="flex-2 h-full mr-[10px] bg-blue-400 overflow-auto">
        <List></List>
      </div>
      <div className={classNames("flex-1 h-full', 'flex flex-col justify-start")}>
        <NewItem></NewItem>
        <GarbageBin className="mt-100"></GarbageBin>
      </div>
    </div>
  );
};
```
多行className使用`classNames`分

继续添加GarbageBin.tsx
```tsx
import classNames from "classnames"
interface GarbageBinProps {
    className:string | string[]
}
export  function GarbageBin(props:GarbageBinProps) {
    const cs = classNames('h-100 b-2-black',props.className)
return <div className={cs}></div>
}
```
继续添加newItem.tsx
```tsx
import classNames from "classnames"
import { FC } from "react"

interface NewItemProps{
    className?: string | string[]
}

export const NewItem: FC<NewItemProps> = (props) => {
  
    const cs = classNames(
        "h-[200px] border-2 border-black",
        "bg-green-300",
        props.className
    );

    return <div className={cs}></div>
}
```

List.tsx
```tsx
import classNames from "classnames"
import { FC } from "react"

interface ListProps{
    className?: string | string[]
}

export const List: FC<ListProps> = (props) => {
  
    const cs = classNames(
        "h-full border-2 border-black",
        props.className
    );

    return <div className={cs}></div>
}
```
继续实现List
```tsx
export const List: FC<ListProps> = (props) => {
  
    const cs = classNames(
        "h-full",
        props.className
    );

    return <div className={cs}>
        <Item></Item>
        <Item></Item>
        <Item></Item>
    </div>
}

function Item(){
    return <div className={classNames('h-[100px] border-2 border-black bg-blue-300 mb-[10px] p-[10px]',"flex justify-start items-center","text-xl tracking-wide")}>
        <input type="checkbox" className="w-[40px] h-[40px] mr-[10px]"/>
        <p>待办事项</p>
    </div>
}
```

继续GarbageBin
```tsx
import classNames from "classnames"
interface GarbageBinProps {
    className:string | string[]
}
export  function GarbageBin(props:GarbageBinProps) {
    const cs = classNames('h-[100px] border-2 border-black','bg-orange-300','leading-200 text-center text-2xl','cursor-move select-none',props.className)
return <div className={cs}>垃圾箱</div>
}
```

添加 react-dnd 来做拖拽
```cmd
npm install react-dnd react-dnd-html5-backend
```
main.tsx引入DndProvider
```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { DndProvider } from "react-dnd";
// @ts-ignore
import { ClickToComponent } from "click-to-react-component";
import { HTML5Backend } from "react-dnd-html5-backend";
createRoot(document.getElementById("root")!).render(
  <>
    <ClickToComponent />
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </>
```

NewItem.tsx使用useDrag
```tsx
import classNames from "classnames"
import { FC, useEffect, useRef } from "react"
import { useDrag } from "react-dnd"

interface NewItemProps{
    className?: string | string[]
}

export const NewItem: FC<NewItemProps> = (props) => {
   const [{isDragging},drag] =  useDrag(({
        type:'new-item',
        collect(monitor) {
            return {
                isDragging:monitor.isDragging()
            }
        },
    }))
    const ref = useRef(null);
    const cs = classNames(
        "h-[100px] border-2 border-black",
        "leading-100 text-center text-2xl",
        "bg-green-300",
        "cursor-move select-none",
        isDragging?"border-dashed bg-white":"",
        props.className
    );
    useEffect(()=>{
        drag(ref)
    },[])
    return <div ref={ref} className={cs}>新的待办事项</div>
}
```
List的Item也添加drag
```tsx
function Item() {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "list-item",
    collect(monitor) {
      return { isDragging: monitor.isDragging() };
    },
  });
  useEffect(() => {
    drag(ref);
  }, []);
  return (
    <div
      className={classNames(
        "h-[100px] border-2 border-black bg-blue-300 mb-[10px] p-[10px]",
        "flex justify-start items-center",
        "text-xl tracking-wide",
        isDragging ? "bg-white border-dashed" : ""
      )}
      ref={ref}
    >
      <input type="checkbox" className="w-[40px] h-[40px] mr-[10px]" />
      <p>待办事项</p>
    </div>
  );
}
```


垃圾箱添加 useDrop
```tsx
export function GarbageBin(props: GarbageBinProps) {
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "list-item",
    drop(item) {},
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  }));
  useEffect(() => {
    drop(ref);
  }, []);
  const cs = classNames(
    "h-[200px] border-2 border-black",
    "bg-orange-300",
    "leading-[200px] text-center text-2xl",
    "cursor-move select-none",
    isOver?'bg-yellow-400 border-dashed':'',
    props.className
  );
  return (
    <div ref={ref} className={cs}>
      垃圾箱
    </div>
  );
}
```
更新的item拖拽到gap
[text](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5510f73bb0454c99aaa847abce813b40~tplv-k3u1fbpfcp-jj-mark%3A0%3A0%3A0%3A0%3Aq75.image#%3Fw%3D1268%26h%3D1170%26s%3D64789%26e%3Dpng%26b%3D9dc4f8)

Gap组件
```tsx
function Gap() {
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "new-item",
    drop(item) {
    
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  }));
  useEffect(() => {
    drop(ref);
  }, []);
  const cs = classNames("h-[10px]", isOver ? "bg-red-300" : "");
  return <div ref={ref} className={cs}></div>;
}
```

接下来处理逻辑 zustand
安装 zustand
```cmd
npm install zustand --save
```
创建 TodoList/Store.ts
```tsx
import {create} from 'zustand'
interface ListItem {
    id:string,
    content:string,
    status:'done'|'todo'
}
type State = {
    list:ListItem[]
}
type Action =  {
    addItem(item:ListItem):void
    delItem(id:string):void
    updateItem(item:ListItem):void
} 

export const ListStore = create<State&Action>((set)=>({
    list:[],
    addItem:(item:ListItem)=>{
       set((state)=>{return {
        list:[...state.list,item]
       }})
    },
    delItem:(id:string)=>{
        set((state)=>{return {
        list: state.list.filter(v=>v.id!==id)
       }})
    },
    updateItem:(item:ListItem)=>{
          set((state)=>{return {
        list: state.list.map(v=>(v.id===item.id?item:v))
       }})
    }
}))
```
List里使用
```tsx
import classNames from "classnames";
import { FC, Fragment, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Item } from "./Item";
import { Gap } from "./Gap";
import { useTodoListStore } from "./Store";
interface ListProps {
  className?: string | string[];
}

export const List: FC<ListProps> = (props) => {
  const list = useTodoListStore((state) => state.list);
  const cs = classNames("h-full ", props.className);

  return (
    <div className={cs}>
      {list.length
        ? list.map((v) => (
            <Fragment key={v.id}>
              <Gap></Gap>
              <Item data={v}></Item>
            </Fragment>
          ))
        : "暂无待办事项"}
          <Gap></Gap>
    </div>
  );
};
```
item 添加data属性

gap 添加store到addItem方法
```tsx
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTodoListStore } from "./Store";
export function Gap() {
  const addItem = useTodoListStore((state) => state.addItem);
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "new-item",
    drop(item) {
      addItem({
        id: Math.random().toString().slice(2,8),
        status: "todo",
        content: "待办事项",
      });
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  }));
  useEffect(() => {
    drop(ref);
  }, []);
  const cs = classNames("h-[10px]", isOver ? "bg-red-300" : "");
  return <div ref={ref} className={cs}></div>;
}
```
删除功能 Item
Item
```tsx
export function Item(props: ItemProps) {
  const [{ isDragging }, drag] = useDrag({
    item(){
      return {
        id:data.id
      }
    }
  });
}
```
GarbageBin的delItem
```tsx
export function GarbageBin(props: GarbageBinProps) {
  const delItem = useTodoListStore((state)=>state.delItem)
  const [{ isOver }, drop] = useDrop(() => ({
    drop(item:ListItem) {
      delItem(item.id)
    },
  }));
}
```

编辑功能Item.tsx
content + status
```tsx
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { ListItem, useTodoListStore } from "./Store";
interface ItemProps {
  data: ListItem;
}
export function Item(props: ItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(data.content);
  const updateItem = useTodoListStore((state)=>state.updateItem)
  return (
    <div
      onDoubleClick={() => setIsEdit(true)}
    >
      <input type="checkbox"  checked={data.status==='done'} onChange={(e)=>{
        updateItem({
          id:data.id,
          content:data.content,
          status:e.target.checked?'done':'todo'
        })
      }}/>
      <p>
        {isEdit ? (
          <input
          className="w-140 h-20"
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
            value={editContent}
            onBlur={(e)=>{
              setIsEdit(false)
              updateItem({
                id:data.id,
                content:editContent,
                status:data.status
              })
            }}
          ></input>
        ) : (
          data.content
        )}
      </p>
    </div>
  );
}
```

拖拽插入的顺序优化
gap + id (id可能为空)
addItem(item,id)

zustand加上persist插件
```tsx
const stateCreateor: StateCreator<State & Action> = (set) => ({

});
export const useTodoListStore = create<State & Action>()(persist(stateCreateor,{
    name:'todoList'
}));

```

+拖拽排序

+动画 react-spring
```tsx
npm install --save @react-spring/web
```
todoList
```tsx
export const List: FC<ListProps> = (props) => {
  const transitions = useTransition(list, {
    from: { transform: "translate3d(-100%,0,0)", opacity: 0 },
    enter: { transform: "translate3d(0%,0,0)", opacity: 1 },
    leave: { transform: "translate3d(100%,0,0)", opacity: 0 },
    keys: list.map((v) => v.id), // key放在这了
  });
  return (
    <div className={cs}>
      {list.length ? (
        transitions((style,v)=>(
       <animated.div style={style}>
          <Gap id={v.id}></Gap>
          <Item data={v}></Item>
        </animated.div>
        ))
      ) : (
        "暂无待办事项"
      )}
      <Gap id={""}></Gap>
    </div>
  )
};
```

## 53.ReactPlayground项目实战
需求：左边写代码，右边可以实时预览，右边可以看到编译后的代码
实现思路：
首先是编译，@babel/standalone,babel的浏览器版本，可以见tsx编译成js
安装
```cmd
npm i --save @babel/standalone
npm i --save-dev @types/babel_standalone
```
体验
```tsx
export function TestBabel() {
  const textAreaRef = useRef(null);

  const code = `import { useEffect, useState } from "react";

  function App() {
    const [num, setNum] = useState(() => {
      const num1 = 1 + 2;
      const num2 = 2 + 3;
      return num1 + num2
    });
  
    return (
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    );
  }
  
  export default App;
    `;
  const compile = () => {
    if (!textAreaRef.current) {
      return;
    }
    const res = transform(textAreaRef.current.value, {
      presets: ["react", "typescript"],
      filename: "guang.tsx",
    });
    console.log(res.code)
  };
  return (
    <>
      <textarea ref={textAreaRef} style={{ width: '500px', height: '300px'}} defaultValue={code}></textarea>
      <button onClick={compile}>编译</button>
    </>
  );
}
```
但编译的代码不能跑，主要是import语句这里，我们可以把一段JS代码，用URL.createObjectUrl(new Blob(code,{type:'application/javascript'}))

所以如何编译呢，我们维护App.tsx通过URL.createObjectUrl变为一个blob url,替换import的路径，使用babel插件。

babel编译的阶段 `parse`/`transform`/`generate`
只要在对Importdeclaration的AST做处理，把source.value替换为对应文件的blob url就行了
![alt text](./readmeImg/image.png)
比如这样写
```tsx
function App(){
  const code1 = `function add(a, b) {
        return a + b;
    }
    export { add };`;
  const url = URL.createObjectURL(new Blob(code1,{type:'application/javascript'}))
  const code = `import {add} from './add.ts';console.log(add)`;
  const transformImportSourcePlugin:PluginObject = {
    visitor:{
      ImportDeclaration(path) {
        path.node.source.value = url;
      }
    }
  }
  function onClick(){
    const res = transform(code,{
      persets:['react','typescript'],
      fileName:'guang.ts',
      plugins:[transformImportSourcePlugin]
    })
    console.log(res.code)
  }
  return (<div>
    <button onClick={onClick}>编译</button>
  </div>)
}
export default App
```
这里用babel插件的方式对import的source做替换，用到的`npm i --save-dev @types/babel__core`,把ImportDeclaration的source的值改为blob url

下一个问题：如果引入的是react和react-dom的包，这些也不是在左侧写的代码，这时候可以用 import maps的机制
```html
<script type='importmap'>
  {
    "imports":{
      "react":"https://esm.sh/react@18.2.0"
    }
  }
</script>
<script type='module'>
  import React from 'react';
  console.log(React)
</script>
```

编辑器部分怎么做？
安装 `npm install @monaco-editor/react`
体验
```tsx
export function testEditor(){
     const code =`import { useEffect, useState } from "react";

function App() {
    const [num, setNum] = useState(() => {
        const num1 = 1 + 2;
        const num2 = 2 + 3;
        return num1 + num2
    });

    return (
        <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    );
}

export default App;
`;;
    return <Editor height='500px' defaultLanguage="javascript" defaultValue={code}></Editor>
}
```

预览部分，iframe，加通讯机制，左边编辑器的结果，编译后传递到iframe渲染
```tsx
import React from 'react';
import iframeRaw from './iframe.html?raw'
const iframeUrl = URL.createObjectURL(new Blob[iframeRaw,{type:'text/html'}])
const Preview = ()=>{
  return <>
  <iframe src={iframeUrl} style={{height:'100%',width:'100%',padding:0,border:'none'}}></iframe>
  </>
}
export default Preview;
```
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Preview</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }
  </style>
</head>
<body>
<script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@18.2.0",
      "react-dom/client": "https://esm.sh/react-dom@18.2.0"
    }
  }
</script>
<script>

</script>
<script type="module">
  import React, {useState, useEffect} from 'react';
  import ReactDOM from 'react-dom/client';

  const App = () => {
    return React.createElement('div', null, 'aaa');
  };

  window.addEventListener('load', () => {
    const root = document.getElementById('root')
    ReactDOM.createRoot(root).render(React.createElement(App, null))
  })
</script>

<div id="root">
  <div style="position:absolute;top: 0;left:0;width:100%;height:100%;display: flex;justify-content: center;align-items: center;">
    Loading...
  </div>
</div>

</body>
</html>
```
### 总结
分析playground的实现思路
import
import maps
编辑器
iframe

## 54.ReactPlayground布局、代码编辑器
布局可拖拽
`npm install --save allotment`

代码编辑器
- 传入`EditorFile{name,value,language}`
- Editor的onMount处理 jsx提示处理 +cmd处理+ts提示+ata自动下载
- EditorProps{file,onChange,options}
- Editor的样式 options[预览图、滚动条]
- 根据内容下载对应包的.d.ts文件 `npm install --save @typescript/ata -f`

## 55.ReactPlayground多文件切换
要实现多文件切换，右侧preview也要拿到数据，如何实现多文件共享数据，要用到context
PlaygroundContext.ts
```ts
interface File {
  name:string,
  value:string,
  language:string
}
export interface Files {
  [key:string]:File
}
interface PlaygroundContextProps {
  files:Files，
  selectedFiles:string,
  setSelectedFileName:(f:string)=>void,
  setFile:(f:File)=>void,
  addFile:(f:string)=>void，
  removeFile:(f:string)=>void,
  updateFileName:(oldF:string,newF:string)=>void
}

export const context = createContext<PlaygroundContextProps>({
selectedFiles:'App.tsx'
} as PlaygroundContextProps)
```
提供一个PlaygroundProvider
- 设计props value = {Files,selectedFile,setFiles,setSelectedFile,addFile,removeFile,updateFile }
- mock文件files作为provider的初始值
- 设计tab切换，样式,+优化横向滚动条
- 实现fileName2language
- 更改文件内容时需要在editChange更新Files + lodash `npm install --save lodash-es  npm install --save-dev @types/lodash-es`