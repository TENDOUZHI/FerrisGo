# 深入了解FerrisGo

## FerrisGo两大核心理念
---

#### 生命周期和响应式系统
这两个系统保证了FerrisGo的最底层开发思路，是整个程序的基石


## 生命周期
每个能够被放置在工作区的组件都有一个生命周期
![image](../.vitepress/public/lifecycle.png)

包含**beforeCreate,created，update，mounted,unMounted**五个阶段

### beforeCreate
在这个阶段，FerrisGo会通过虚拟dom获取对应元素的对应属性，准备**create**元素

### created
在created阶段，元素通过刚刚准备好的数据进行创建元素，虽然元素已经创建好了但是元素在这时还没有真正被渲染到页面上

### mounted
当程序进行到这个阶段的时候，元素会被FerrisGo渲染到页面上，用户可以看到对应元素并修改其数据

### update
只有创建好的元素的数据被修改时才会进入update阶段，在这个阶段首先FerrisGo会根据修改后的数据进行更新虚拟dom
然后把对应的元素unMount进行卸载操作，卸载后会根据修改后的虚拟dom进行patch操作，完成update这一流程

### unMounted
unMounted阶段只有元素被销毁的时候执行，即用户主动删除元素或者update操作会执行


## 响应式系统

FerrisGo暴露给用户四大响应式接口：**Input，File，CheckBox，ListMenu**

当用户通过以上四个接口之一修改数据的时候就会触发FerrisGo的更新系统，达到通过数据操作
修改页面样式的效果

## Diff算法

FerrisGo在更新的过程中要销毁组件并且重新弄渲染，初期我们的更新策略是将页面上所有组件清除并重新渲染
后期发现这种清除然后渲染HTMLElement的更新策略其实有很多不必要的操作，FerrisGo完全可以只更新我们修改的组件，所以我们引入了Diff算法
来靶向更新页面，大大提高了FerrisGo的性能