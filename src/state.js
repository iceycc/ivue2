import observer from "./observer/index";
import {isFunction, isObject} from "./utils";
import {Watcher} from "./observer/watcher";

export function initState(vm) {
    // 将所有的数据定义在vm属性上，并且后序修改，需要触发视图更新
    const opts = vm.$options;
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethods(vm, opts.methods)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.watch) {
        initWatch(vm, opts.watch)
    }
    if (opts.computed) {
        initComputed(vm, opts.computed)
    }
}

function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}

function initData(vm) {
    // 数据劫持
    // Object.prototype.defineProperty
    let data = vm.$options.data;
    // 判断data的类型是函数还是对象
    // vm._data可以拿到劫持后对数据
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // 将_data上对数据全部代理到vm上
    for (let key in data) {
        proxy(vm, '_data', key) // vm.name => vm._data.name
    }
    // 观测这个数据
    observer(data)
}

function initComputed(vm, computed) {
    // 内部也是通过watcher实现的
    // 存放所有计算属性对应的watcher
    const watchers = vm._computedWatchers = {};
    for (let key in computed) {
        const userDef = computed[key] // 获取用户定义的函数
        const getter = typeof userDef === 'function' ? userDef : userDef.get
        // 获取用户getter方法
        // 计算属性的Watcher不会立刻执行
        // lazy为true，内部不会立刻调用getter
        watchers[key] = new Watcher(vm, getter, () => {
        }, {lazy: true})

        // 计算属性可以直接通过vm来进行取值
        defineComputed(vm, key, userDef);
    }
}

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => {
    },
    set: () => {
    }
}

// 将属性定义到vm上
function defineComputed(target, key, userDef) {
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key)
    } else {
        sharedPropertyDefinition.get = createComputedGetter(key).get;
        sharedPropertyDefinition.set = userDef.set || (() => {
        })
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter(key) {
    // 增加缓存
    return function(){ // 添加来缓存 通过watcher来添加到
        // console.log(this) // vm实例
        let watcher = this._computedWatchers[key]
        if (watcher?.dirty) { // 默认第一次取值,如果dirty为true，就调用用户到方法
            watcher.evaluate(); // 执行取值
        }
        return watcher.value;
    }
}

function initMethods(vm, methods) {
    for (let key in methods) {
        proxy(vm, methods[key], key)
    }
}

function initProps(vm) {
}

function initWatch(vm, watch) {
    // watch是个对象
    // watch原理是Watcher
    for (let key in watch) {
        const handlers = watch[key];
        // handlers可能是数组 对象 方法
        if (Array.isArray(handlers)) {//
            for (let handler of handlers) {
                createWatcher(vm, key, handler)
            }
        } else {
            // 单独的key value
            createWatcher(vm, key, handlers)
        }
    }
}

function createWatcher(vm, key, handler, options) {
    if (isObject(handler)) {
        options = handler
        handler = handler.handler;
    } else if (typeof handler === 'string') {
        handler = vm[handler]
    }
    // 参数的格式化 扁平化
    // console.log(key, handler, options)
    // 基于$watch , 原型的方法
    return vm.$watch(key, handler, options)
}

export function stateMixin(Vue) {
    Vue.prototype.$watch = function (exprOrFn, handler, options = {}) {
        const vm = this
        // 用户的watcher
        // console.log(exprOrFn)
        options.user = true; // 用户自己写的wathcer
        new Watcher(vm, exprOrFn, handler, options)
    }
}
