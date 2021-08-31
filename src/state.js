import observer from "./observer/index";
import {isFunction, isObject} from "./utils";

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
        initComputed(vm)
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

function initComputed(vm) {
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

    console.log(key, handler, options)
}
