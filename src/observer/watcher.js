import {popTarget, pushTarget} from "./dep";
import {queueWatcher} from "./scheduler";

let id = 0;

export class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        this.id = id++
        this.vm = vm;
        this.cb = cb;
        this.options = options;
        this.getter = exprOrFn
        this.deps = [] //  如果是相同页面多个标签取get一个属性，会触发多次.
        this.depsId = new Set() // dep去重
        this.get()
        // this.exprOrFn() // 调用传人的函数。调用了render方法，此时会对模版中的数据进行取值
    }

    get() {
        pushTarget(this) // 1、将当前watcher放到Dep上， Dep.target = watcher
        this.getter() // 2、对属性进行取值 vm._update(vm._render()) // 生成真实dom了，过程中会对模版中对属性进行get操作，触发Observer get同时添加到dep
        popTarget() // 3、清空Dep.target = null，不在模版中访问对值不记录watcher
    }
    //
    addDep(dep) { //
        const id = dep.id
        // 一个dep可能对应多个watcher，
        if (!this.depsId.has(id)) { // dep去重,watcher也驱虫了
            this.depsId.add(id)
            this.deps.push(dep)// 让watcher记住dep
            dep.addSub(this) // 让dep记住watcher,唯一的dep记住唯一的watcher
        }
    }

    update() {
        // this.get() // 数据一变重新渲染，同一个事件环中多次更新会触发多次
        queueWatcher(this); // 批处理，调度更新几次，
    }

    run() {
        this.get()
    }
    // 当属性取值时要记住这个watcher，稍后数据变化了，去执行自己记住的watcher即可。依赖收集
}



