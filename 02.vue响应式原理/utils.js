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
