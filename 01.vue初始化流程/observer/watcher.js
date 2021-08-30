let id = 0;

export class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        this.id = id++
        this.vm = vm;
        this.cb = cb;
        this.options = options;
        this.exprOrFn = exprOrFn

        this.exprOrFn() // 调用传人的函数。调用了render方法，此时会对模版中的数据进行取值
    }

}
