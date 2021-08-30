import {Watcher} from "./observer/watcher";
import {patch} from "./vdom/patch";

export function mountComponent(vm, el) {
    // 默认vue是通过watcher来渲染的，渲染watcher 每一个组件都有一个渲染watcher
    function updateComponent() {
        vm._update(vm._render(vm)); //  vm._render()获取虚拟节点（虚拟dom） _update把虚拟节点变成真实节点

    }

    new Watcher(vm, updateComponent, () => {
    }, true) // 其实就是执行updateComponent
}

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        console.log('update')
        // 将虚拟节点转换成真实dom
        const vm = this;
        // 首次渲染 需要用虚拟节点，来更新真实的dom元素
        vm.$el = patch(vm.$el, vnode)
    }
}
