# React通关掘金小册学习
echo "# learn-react-pass" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:hxh-ly/learn-react-pass.git
git push -u origin main
## 06受控组件
1. value 由用户控制就是非受控模式，由代码控制就是受控模式。不能用代码改变的，我们只是设置了一个default值，其他由用户控制-非受控模式
2. 代码可以改变表单的value-受控模式



## 07实现calendar组件
1.静态布局

header
flex的格子


2.逻辑
- 日期属性，支持往前切换月份，支持往后切换月份
- 改变日期
- 增加2个参数defaultValue和onChange
- 提供ref来暴露calendar的api
- 添加两种模式的支持，使用ahook

## 08实现calendar组件（上）
- 用dayjs
- 布局部分，切换日期的header和每个月的日期的MonthCalendar
- sass管理样式

## 09实现calendar组件 （下）
- className + style
- dateRender + dateInnerContent
- locale
- value + onChange 【ahooks会调用onChange】

## 13实现Icon组件（上）
- style className size spin  Icon封装
- createIcon
- createIconFromIconFont 

## 14实现Space组件
- direction、style、align、size、wrap、split、
- ConfigProvider提供统一的size
```tsx
interface SpaceProps extends React.HtmlAttributes<HtmlDivElement> {}
```

## 18实现WaterMark组件
- 【style、className、width、height、zIndex、rotate、gap、offset】【getContainer】【fontStyle、image、content】
- WaterMark: getContainer   useEffect->generateWark
- useWaterMark
- createWaterMark
- createCanvasData
- MutationObserver在UseWaterMark中，容器存在的时候，先清，在创建开始监听元素以及属性，在监听。创建的callback的onChange时删除水印重绘

## 19手写react-lazy组件
- 【style，height，width，offset，onVisible，playload】
- IntersectionObserver