export function patch(oldVnode, vnode) {
    if (!oldVnode) {
        // 子组件渲染的时候没有oldVnode作为老组件
        // 直接根据虚拟节点创建元素
        return createElm(vnode)
    }
    // 首次渲染oldvnode是真实的dom元素
    const isRealElement = oldVnode.nodeType;
    if (isRealElement) {
        // 初次渲染
        const oldElm = oldVnode
        const parentElm = oldElm.parentNode;
        // 根据虚拟节点创建真实的节点
        let el = createElm(vnode);
        parentElm.insertBefore(el, oldElm.nextSibling);
        parentElm.removeChild(oldElm)
        return el
    } else {
        // 更新 diff算法
    }
    return
}

// vnode -》真实dom
function createElm(vnode) {
    let {tag, children, key, data, text, vm} = vnode;
    if (typeof tag === 'string') {// 组件或者原生标签
        //  如果是组件
        if (createComponent(vnode)) {
            return vnode.componentInstance.$el
        }
        vnode.el = document.createElement(tag) //
        updateProperties(vnode)
        children.forEach(child => {
            // 有可能是文本
            vnode.el.appendChild(createElm(child))
        })
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el;
}

// 创建组件
function createComponent(vnode) {
    let i = vnode.data;
    if ((i = i.hook) && (i = i.init)) { // 连续取值
        i(vnode) // init回调，会想vnode增加componentInstance属性
    }
    if (vnode.componentInstance) {
        return true
    }
}

// 更新属性
function updateProperties(vnode) {
    let newProps = vnode.data || {}; // 属性
    let el = vnode.el; // dom元素
    for (let key in newProps) {
        if (key === 'style') {
            for (let styleKey in newProps.style) {
                el.style[styleKey] = newProps.style[styleKey]
            }
        } else if (key === 'class') {
            el.className = newProps.class
        } else {
            el.setAttribute(key, newProps[key])
        }
    }
}
