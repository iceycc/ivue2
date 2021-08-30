import {arrayMethods} from "./array";
import Dep from "./dep";

class Observer {
    constructor(value) { // 重新定义
        // value.__ob__ = this; // 这样会死循环，用下面的
        this.dep = new Dep(); // 给数组本身或者对象本身增加一个一个dep属性
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false, // 可点数的,可列举的
            configurable: false // 可配置的
        })
        // value数组或者对象
        if (Array.isArray(value)) {
            // 数组不用defineProperty
            // push shift reverse sort 等方法需要重写
            // value.__proto__ = arrayMethods
            Object.setPrototypeOf(value, arrayMethods);
            this.observeArray(value) // 数组原有的值会
        } else {
            this.walk(value)
        }
    }

    observeArray(value) {
        for (let item of value) {
            observer(item)
        }
    }

    walk(data) {
        // 将对象所有key 重新用defineProperty定义成响应式
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        })
    }
}

function dependArray(value) {
    // 让外层、里层都是一个watcher
    // 处理多维数组
    for (let item of value) {
        item.__ob__ && item.__ob__.dep.depend()
        if (Array.isArray(item)) { // 递归继续进行依赖收集
            dependArray(item)
        }
    }
}

export function defineReactive(data, key, value) {// vue2数据嵌套不可以过深，过深浪费性能
    let childObj = observer(value); // 对值递归劫持, 返回的数组或者时对象，会有一个dep属性
    let dep = new Dep() // 每次都会给属性创建一个dep
    Object.defineProperty(data, key, { // 需要给每个属性增加Dep
        get() {
            if (Dep.target) {
                dep.depend(); // 让这个属性自己的dep记住这个watcher，也让watcher记住这个dep
                if (childObj) {// 可能数组也可能是对象，一般是数组，只有在$set给对象新增属性时会触发
                    childObj.dep.depend() // 数组增加依赖
                    if (Array.isArray(value)) { // 处理多维数组
                        dependArray(value)
                    }
                }
            }
            return value;
        },
        set(newValue) {
            console.log('set', key)
            // 如果用户设置的是对象也要继续劫持
            observer(newValue)
            if (newValue === value) return;
            value = newValue;
            dep.notify()
        }
    })
}

export default function observer(data) {
    // 只能对对象类型进行观测，非对象类型无法进行观测
    if (typeof data !== 'object' || data === null) return
    if (data.__ob__) {
        return
    }
    // 通过类来实现对数据对观测，类可以方便扩展，会产生实例
    return new Observer(data)
}
