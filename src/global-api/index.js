import {mergeOptions} from "../utils";

export function initGlobalAPI(Vue) {
    Vue.options = {} // 存储全局配置
    // filter directive component
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin)
        console.log(this.options)
        return this;
    }
    Vue.options._base = Vue;// 永远执行Vue的构造函数
    Vue.options.components = {}; // 内部的局部组件
    Vue.component = function (id, definition) {
        definition.name = definition.name || id // 组件的名字先采用对象内写的

        // 通过一个对象产生一个构造函数, 保证永远使用的是Vue的extend,
        // 不管谁调component, 最后extend中返回的子类都是继承自原始的Vue。this.options._base永远指向Vue
        definition = this.options._base.extend(definition)
        // definition = Vue.extend(definition)
        this.options.components[id] = definition;
    }
    let cid = 0
    Vue.extend = function (options) {
        const Super = this;
        // 子组件初始化时会 new VueComponent(options)
        const Sub = function VueComponent(options) {
            this._init(options)
        }
        Sub.cid = cid++
        // 子类继承父类
        // 继承原型方法，所有组件 不管是子类还是孙子类都继承自原始的Vue
        Sub.prototype = Object.create(Super.prototype)
        Sub.prototype.constructor = Sub;
        Sub.component = Super.component;
        // 子类的options
        Sub.options = mergeOptions(Super.options, options)
        return Sub
    }
    // Sub.component()
}

