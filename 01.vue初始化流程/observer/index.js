import {arrayMethods} from "./array";

class Observer {
    constructor(value) { // 重新定义
        // value.__ob__ = this; // 这样会死循环，用下面的
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

export function defineReactive(data, key, value) {// vue2数据嵌套不可以过深，过深浪费性能
    observer(value); // 递归拦截
    Object.defineProperty(data, key, {
        get() {
            console.log('get--', key)
            return value;
        },
        set(newValue) {
            // 如果用户设置的是对象也要继续劫持
            console.log('set--')
            observer(newValue)
            if (newValue === value) return;
            value = newValue;
        }
    })
}

export default function observer(data) {
    // 只能对对象类型进行观测，非对象类型无法进行观测
    if (typeof data !== 'object' || data === null) return
    // 通过类来实现对数据对观测，类可以方便扩展，会产生实例
    if (data.__ob__) {
        return
    }
    return new Observer(data)
}
