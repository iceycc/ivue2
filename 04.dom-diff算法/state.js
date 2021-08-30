import observer from "./observer/index";

export function initState(vm) {
    // 将所有的数据定义在vm属性上，并且后序修改，需要触发视图更新
    const opts = vm.$options;
    if (opts.props) {
    }
    if (opts.methods) {
    }
    if (opts.data) { // 数据初始化
        initData(vm)
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
