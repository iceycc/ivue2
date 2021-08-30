import {isObject, isReservedTag} from "../utils";

export function createElement(vm, tag, data = {}, ...children) {
    // 需要区分原生标签和自定义标签（组件）
    // console.log(tag,isReservedTag(tag))
    if (isReservedTag(tag)) {
        return Vnode(vm, tag, data, data.key, children, undefined)
    } else {
        // 不是一个普通标签，就是组件了
        const Ctor = vm.$options.components[tag] // 内部创建的组件是对象，外部创建的是函数
        // return {text:1234}
        return createComponentVnode(vm, tag, data, data.key, children, Ctor)
        // tag可能是对象？
    }
}

export function createComponentVnode(vm, tag, data, key, children, Ctor) {
    if (isObject(Ctor)) {
        // 将对象转成函数,组件的核心就是.extend
        // 组件的构造函数
        Ctor = vm.$options._base.extend(Ctor)
    }
    // 给组件增加生命周期
    data.hook = {
        init(vnode) {
            // 初始化的钩子
            // 调用子组件的构造函数,获取子组件实例
            let child = vnode.componentInstance = new vnode.componentOptions.Ctor({})
            child.$mount() // 子组件手动挂载 child.$el == vnode.componentInstance.$el == 真实元素
        }
    }
    // 组件的虚拟节点拥有hook和当前组件的componentOptions中存放了组件的构造函数
    console.log(Vnode(vm, `vue-component-${Ctor.cid}-${tag}`, data, key, undefined, undefined, {Ctor}))
    return Vnode(vm, `vue-component-${Ctor.cid}-${tag}`, data, key, undefined, undefined, {Ctor});

}

export function createTextVnode(vm, text) {
    return Vnode(vm, undefined, undefined, undefined, undefined, text)
}

function Vnode(vm, tag, data, key, children, text, componentOptions) {
    return {
        vm,
        tag,
        data,
        key,
        text,
        children,
        componentOptions
    }
}
