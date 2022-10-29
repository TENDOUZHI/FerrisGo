# 深入了解FerrisGo

## FerrisGo两大核心理念
---

#### 生命周期和响应式系统
这两个系统保证了FerrisGo的最底层开发思路，是整个程序的基石


## 生命周期
每个能够被放置在工作区的元素都有一个生命周期

包含**created，update，destroy**三个阶段

在你初始将元素放置的时候进入**created**周期，在这个created阶段，FerrisGo会初始化一个HTMLElement实例并在鼠标对应的位置创建该元素，并且初始化该元素的虚拟dom

当你选中元素后并修改其属性，就会触发**update**操作，在这个阶段FerrisGo会更新虚拟dom并且会将属性dispatch到redux
并且同步更新属性栏的信息。

在update阶段末期，会触发**destory**操作，在这个操作FerrisGo会清除目标元素并根据虚拟dom重新
创建元素到页面上

## 响应式系统

FerrisGo暴露给用户四大响应式接口：**Input，File，CheckBox，ListMenu**

当用户通过以上四个接口之一修改数据的时候就会触发FerrisGo的更新系统，达到通过数据操作
修改页面样式的效果

## Diff算法

FerrisGo在更新的过程中要销毁组件并且重新弄渲染，初期我们的更新策略是将页面上所有组件清除并重新渲染
后期发现这种清除然后渲染HTMLElement的更新策略其实有很多不必要的操作，FerrisGo完全可以只更新我们修改的组件，所以我们引入了Diff算法
来靶向更新页面，大大提高了FerrisGo的性能