
## 安装
- rollup和babel的桥梁 rollup rollup-plugin-babel
- babel核心模块 
- es6-es5            
- 启动webpack服务
```
npm install rollup @rollup/plugin-babel @babel/core  @babel/preset-env rollup-plugin-serve
```
 
## 手写vue2.0
- 初渲染
## vue是如何渲染的？
总
- vm._update(vm._render(vm))
- _render = new Function("with(this){parseHtml + generate}")
- _update = patch(virtual dom)

细分：
- template code + parseHtml --> ast
- ast + generate + (new Function + with) --> renderFunction
- renderFunction done --> virtual dom
- virtual dom +  patch --> real dom

patch细节
- 

## 响应式

- 1、将当前watcher放到Dep上， Dep.target = watcher
- 2、对属性进行取值 vm._update(vm._render())
- 3、清空Dep.target = null，不在模版中访问对值不记录watcher
- 4、修改name值会找到对应对dep，通知dep中对watcher执行

批处理操作 加锁

- 数组的响应式、多维数组的处理


## watcher
渲染watcher、computedWatcher、用户的watcher

## 生命周期的原理
- 合并生命周期钩子，数组，发布订阅
- 主要钩子的合并策略 

## component的渲染原理
- 先找自己再找父类，链式继承

1. Vue component -> Vue.extend -> 生成子类的构造函数
2. 如果组件添加了 init hook() , componentOptions -> Ctor
3. 创建真实节点时，会调用init构造， new Ctor().$mount() 内部会再给组件添加一个watcher；会将当前渲染的节点放到当前实例上，并且返回

## dom diff
- 平级比对
- 1、标签不一样直接替换
- 2、标签一样且都是文本节点，更新老节点的textContent
- 3、标签一样，
    - 更新属性先
    
diff算法
双指针：两个指针分别指向新旧两个
snabbdom.js


## 面试题
1、响应式原理
2、组件的原理
3、diff算法 虚拟节点、模版编译


## 流程
- new Vue -> _init (mergeOptions->beforeCreate->initState->created->$mount)
    - initData(props+methods+data) = proxy(将data的属性代理到vm实例上) + observer(观测数据)
        - observer = new Observer(data) = observeArray + walk(遍历进行defineReactive)
        - defineReactive = 递归 Object.defineProperty 
        - Object.defineProperty=>
           - get 
           - set
    - $mount = options.render(template + compileToFunction) -> mountComponent(vm)组件挂载
        - compileToFunction
        - mountComponent = new Watcher()
        
        
## watch

## computed
- 缓存
- 不会立刻执行
- 依赖收集
- computed除了收集计算属性watcher还要搜集渲染watcher




