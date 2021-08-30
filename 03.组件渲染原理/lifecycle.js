import {Watcher} from "./observer/watcher";
import {patch} from "./vdom/patch";

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        console.log('update')
        // 将虚拟节点转换成真实dom
        const vm = this;
        // 首次渲染 需要用虚拟节点，来更新真实的dom元素
        // vm.$el = patch(vm.$options.el, vnode)
        // 第一次渲染完毕后，拿到新的节点，下次更新再次渲染时替换上次渲染的结果
        vm.$el = patch(vm.$el, vnode) // 组件渲染时调用patch方法会产生$el属性
    }
}

export function callHook(vm, hook) { // 发布模式
    const handlers = vm.$options[hook]
    if (handlers) {
        handlers.forEach(handler => handler.call(vm))
    }
}

export function mountComponent(vm) {
    // 默认vue是通过watcher来渲染的，渲染watcher 每一个组件都有一个渲染watcher
    function updateComponent() {
        vm._update(vm._render(vm)); //  vm._render()获取虚拟节点（虚拟dom） _update把虚拟节点变成真实节点
    }

    // 其实就是执行updateComponent, 不过需要创建一个渲染watcher, 将watcher放到Dep.target上, 然后进行取值；最后清空Dep.target
    new Watcher(vm, updateComponent, () => {
    }, true)
}

