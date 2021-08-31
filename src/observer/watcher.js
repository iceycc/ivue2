import {popTarget, pushTarget} from "./dep";
import {queueWatcher} from "./scheduler";
import {isFunction} from "../utils";

let id = 0;

export class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        this.id = id++
        this.vm = vm;
        this.cb = cb;
        this.options = options;
        this.sync = options.sync; // 用户watcher传入的可以，可以设置同步watcher
        if (isFunction(exprOrFn)) {
            this.getter = exprOrFn
        } else {
            // 将getter封装成了取值函数
            this.getter = () => { // 'a.b.c.d'
                // 处理用户传人的可能
                let paths = exprOrFn.split('.')
                let val = vm;
                for (let path of paths) {
                    val = val[path]
                }
                return val
            }
        }
        this.user = options.user
        this.deps = [] //  如果是相同页面多个标签取get一个属性，会触发多次.
        this.depsId = new Set() // dep去重
        this.value = this.get() // 保存老值
        // this.exprOrFn() // 调用传人的函数。调用了render方法，此时会对模版中的数据进行取值
    }

    get() {
        pushTarget(this) // 1、将当前watcher放到Dep上， Dep.target = watcher
        let value = this.getter.call(this.vm) // 2、对属性进行取值 vm._update(vm._render()) // 生成真实dom了，过程中会对模版中对属性进行get操作，触发Observer get同时添加到dep
        popTarget() // 3、清空Dep.target = null，不在模版中访问对值不记录watcher
        return value;
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
        if(this.sync){
            this.run()
        }else{
            // this.get() // 数据一变重新渲染，同一个事件环中多次更新会触发多次
            queueWatcher(this); // 批处理，调度更新几次，

        }
    }

    run() {
        // this.get();

        let oldValue = this.value;
        let newValue = this.get();
        this.value = newValue
        if (this.user) { // 用户的watcher，执行用户的callback，并将新值就值传入
            this.cb.call(this.vm, oldValue, newValue)
        }
    }

    // 当属性取值时要记住这个watcher，稍后数据变化了，去执行自己记住的watcher即可。依赖收集
}



