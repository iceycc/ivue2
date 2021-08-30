// 全局一个Dep属性
let id = 0

class Dep {
    constructor() {
        this.id = id++
        this.subs = [] // 属性要记住这个watcher
    }

    depend() {
        // 让watcher记住这个dep
        Dep.target.addDep(this) // 让watcher记住dep
    }
    addSub(watcher){ //
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(watcher=>watcher.update())
    }
}

Dep.target = null;

export function pushTarget(watcher) {
    Dep.target = watcher
}

export function popTarget() {
    Dep.target = null
}

export default Dep
