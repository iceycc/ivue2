let oldArrayProtoMethod = Array.prototype;
// 不能直接改写数组的原有数组
export let arrayMethods = Object.create(Array.prototype)
let methods = [ // 这七个会改写原数组
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'splice',
    'sort'
]
// 根据索引改值还是监听不到。
methods.forEach(_method => {
    // aop
    arrayMethods[_method] = function (...args) {
        console.log('数组变化了')
        let result = oldArrayProtoMethod[_method].call(this, ...args);
        // 有可能用户新增的数据是对象格式时
        let inserted;
        let __obj__ = this.__ob__
        switch (_method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2);
        }
        if (inserted) {
            // observeArray
            __obj__.observeArray(inserted) // 谁调方法this就指向谁

        }
        __obj__.dep.notify() // 修改数组时触发通知更新watcher
        return result;
    }
})
