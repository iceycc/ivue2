import {nextTick} from "../utils";

let has = {}
let queue = []
let pending = false

function flushSchedulerQueue() {
    for (let watcher of queue) {
        watcher.run()
    }
    has = {}
    queue = []
    pending = false
}

// 多次调用queueWatcher，可能会开启多个nextTick ，如果watcher不是同一个,
export function queueWatcher(watcher) {
    // 调度更新几次
    // 更新是对watcher进行重新操作
    let id = watcher.id;
    if (has[id] == null) { // 没有id
        queue.push(watcher);
        has[id] = true;
        if (!pending) { // 加锁
            pending = true
            // 让queue清空
            nextTick(flushSchedulerQueue)
        }
        // setTimeout(() => {
        //     flushSchedulerQueue()
        // }, 0)
    }
}
