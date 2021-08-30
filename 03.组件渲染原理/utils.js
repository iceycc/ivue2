let callbacks = []
let waiting = false

function flushCallbacks() {
    for (let cb of callbacks) {
        cb()
    }
    waiting = false
    callbacks = []
}

// 批处理，第一次开启定时器，后序只更新列表，之后执行清空逻辑
// 第一次cb 渲染watcher更新操作会调用nextTick 渲染watcher执行的过程肯定是同步的
// 第二次cb 用户传人nextTick的回调，
export function nextTick(cb) {
    callbacks.push(cb) // 默认的cb是渲染逻辑，用户的逻辑放到渲染逻辑之后就行。
    if (!waiting) {
        waiting = true;
        // vue2做降级，vue3直接用promise.then了
        // 1、promise是否支持
        // 2、mutationObserver
        // 3、setImmediate
        // 4、setTimeout
        Promise.resolve().then(flushCallbacks)
    }
}

export const isObject = (val) => typeof val === 'object' && val !== null;
// 策略
const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
]
const strategies = {} // 策略集合
// 钩子合并策略
LIFECYCLE_HOOKS.forEach(hook => {
    strategies[hook] = function mergeHooks(parentValue, childValue) {
        if (!childValue) {
            // 儿子没有，用父亲
            return parentValue;
        } else {
            if (parentValue) {
                // 都有
                return parentValue.concat(childValue)
            } else {
                // 只有儿子
                return [childValue]
            }
        }
    }
})
// 其他策略
// strategies.data = function () {
// }
// 组件的合并策略
strategies.components = function (parentValue, childValue) {
    // 查找链
    const res = Object.create(parentValue)
    if (childValue) {
        for (let key in childValue) {
            res[key] = childValue[key]
        }
    }
    return res;
}

export function mergeOptions(parent, child) {
    let options = {}
    // 不同的生命周期的合并策略（策略模式）

    // 普通属性的合并策略
    // 1 如何父亲有儿子没，应该儿子替换父亲
    // 2 如果父亲有值，用父亲的
    for (let key in parent) {
        mergeField(key)
    }

    for (let key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }

    function mergeField(key) {
        if (strategies[key]) {
            return options[key] = strategies[key](parent[key], child[key])
        }
        if (isObject(parent[key]) && isObject(child[key])) {
            options[key] = {...parent[key], ...child[key]}
        } else {
            if (child[key]) {
                options[key] = child[key]
            } else {
                options[key] = parent[key]
            }
        }
    }

    return options
}

function makeUp(str) {
    const map = {}
    str.split(',').forEach(tagName => {
        map[tagName] = true
    })
    return (tag) => map[tag] || false;
}

export const isReservedTag = makeUp('a,p,div,ul,li,span,input,button')
