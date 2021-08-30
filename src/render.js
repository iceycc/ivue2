import {createElement, createTextVnode} from "./vdom/index";

export function renderMixin(Vue) {
    Vue.prototype._c = function (...args) {
        // 创建元素的虚拟节点
        return createElement(this, ...args)
    }
    Vue.prototype._v = function (text) {
        // 创建文本的虚拟节点
        return createTextVnode(this, text)

    }
    Vue.prototype._s = function (val) {
        // 转换成字符串
        return (val === null ? "" :
            (typeof val === 'object') ? JSON.stringify(val) :
                val)
    }
    // 产生虚拟dom
    Vue.prototype._render = function () {
        const vm = this;
        let render = vm.$options.render;
        // 调用render方法产生虚拟节点
        let vnode = render.call(vm); // _c(xx,xx,xx) 调用是会自动将变量进行取值，将其结果进行渲染
        return vnode;
    }
}
