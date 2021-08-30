export function createElement(vm, tag, data = {}, ...children) {
    return Vnode(vm, tag, data, data.key, children, undefined)
}

export function createTextVnode(vm, text) {
    return Vnode(vm, undefined, undefined, undefined, undefined, text)
}

function Vnode(vm, tag, data, key, children, text) {
    return {
        vm,
        tag,
        data,
        key,
        text,
        children
    }
}
