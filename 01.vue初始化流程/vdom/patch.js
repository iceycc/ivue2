export function patch(oldVnode, vnode) {
    // 首次渲染oldvnode是真实的dom元素
    console.log(oldVnode)
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
    if (typeof tag === 'string') {
        //  可能是组件
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
