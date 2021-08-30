import {isSameVnode} from "../utils";

export function patch(oldVnode, vnode) {
    if (!oldVnode) {
        // 子组件渲染的时候没有oldVnode作为老组件
        // 直接根据虚拟节点创建元素
        return createElm(vnode)
    }
    // 首次渲染oldvnode是真实的dom元素
    const isRealElement = oldVnode.nodeType;
    if (isRealElement) {
        // 2、首次
        // 初次渲染
        const oldElm = oldVnode
        const parentElm = oldElm.parentNode;
        // 根据虚拟节点创建真实的节点
        let el = createElm(vnode);
        parentElm.insertBefore(el, oldElm.nextSibling);
        parentElm.removeChild(oldElm)
        return el
    } else {
        // 3、两个虚拟节点的比对
        // 更新 diff算法
        // 1、如果新旧两个节点标签不一样，直接替换
        if (oldVnode.tag !== vnode.tag) {
            return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
        }
        // 2、标签相同但是是两个文本节点
        if (!oldVnode.tag) {
            if (oldVnode.text !== vnode.text) {
                return oldVnode.el.textContent = vnode.text
            }
        }
        // 3、元素相同，复用老节点，更新属性
        let el = vnode.el = oldVnode.el; //
        updateProperties(vnode, oldVnode.data) // 用老的属性和新的节点属性比对

        // 4、标签 属性都一样了，更新儿子！！
        let oldChildren = oldVnode.children || [];
        let newChildren = vnode.children || [];
        if (oldChildren.length > 0 && newChildren.length > 0) {
            // 1) 老的新的都有儿子（diff算法）
            updateChildren(el, oldChildren, newChildren)
        } else if (oldChildren > 0) {
            // 2) 老的有新的没有儿子：直接删除老儿子
            el.innerHTML = ''
        } else if (newChildren.length > 0) {
            // 3) 老的没儿子新的有儿子：在老节点新增儿子即可
            newChildren.forEach(child => {
                el.appendChild(createElm(child))
            })
        }
    }
}


function updateChildren(parent, oldChildren, newChildren) {
    // 核心diff算法
    // 双指针
    let oldStartIndex = 0; // 老头索引
    let oldEndIndex = oldChildren.length - 1; // 老尾索引
    let oldStartVnode = oldChildren[0]; // 老开始节点
    let oldEndVnode = oldChildren[oldEndIndex]

    let newStartIndex = 0; // 新头索引
    let newEndIndex = newChildren.length - 1; // 新尾索引
    let newStartVnode = newChildren[0]; // 新开始节点
    let newEndVnode = newChildren[newEndIndex]

    function makeIndexByKey(oldChildren) {
        return oldChildren.reduce((map, child, index) => {
            if (child.key !== undefined) {
                map[child.key] = index
            }
            return map
        }, {})
    }

    let map = makeIndexByKey(oldChildren);
    // 从头往后比
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // dom的移动性，
        // 尾部插入、头部插入、头部移动到尾部、尾部移动到头部、正序、反序
        if (!oldStartVnode) {
            // 空白节点直接跳过
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) {
            // 空白节点直接跳过
            oldEndVnode = oldChildren[--oldEndIndex]
        } else if (isSameVnode(oldStartVnode, newStartVnode)) {
            // 1 头和头相比 尾部插入
            patch(oldStartVnode, newStartVnode) // 递归，深度遍历
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            // 2 尾和尾比 头部插入
            patch(oldEndVnode, newEndVnode) // 递归，深度遍历
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // 3  老头和新尾比  将老的头部节点移动到老的尾节点后面. 头和尾交叉比,
            patch(oldStartVnode, newEndVnode)
            parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // 4 老尾和新头比  将老的尾部节点移动到老的头节点前面, 头和尾交叉比，
            patch(oldEndVnode, newStartVnode)
            parent.insertBefore(oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex];
        } else {
            // 5 乱序
            // 需要先查找当前 老节点索引和key的关系
            // 移动的时候通过新的key，去找对应的老节点索引 --》 获取老节点，可以移动老节点
            let moveIndex = map[newStartVnode.key]
            if (moveIndex === undefined) { // 判断新的儿子在老儿子里有没有对应的key
                parent.insertBefore(createElm(newStartVnode), oldStartVnode.el)
            } else {
                let moveVnode = oldChildren[moveIndex]
                oldChildren[moveIndex] = undefined;
                patch(moveVnode, newStartVnode) // 如果找到了 再对两者的进行深层比对
                parent.insertBefore(moveVnode.el, oldStartVnode.el)
            }
            newStartVnode = newChildren[++newStartIndex]
        }

        // 为什么v-for要增加key？为啥不能用index

    }
    if (newStartIndex <= newEndIndex) { // 新到比老到多，插入新节点
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // 像前插入或者向后插入
            // 看一下后面又没下一个节点，有的话向前插入
            let nextEle = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el
            // appendChild 和 insertBefore 也可以进行合并
            // 如果insertBefore 传入null 等价于appendChild
            parent.insertBefore(createElm(newChildren[i]), nextEle)
        }
    }
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            let child = oldChildren[i]
            if (child !== undefined) {
                parent.removeChild(child.el)
            }
        }
    }

}

// vnode -》真实dom
export function createElm(vnode) {
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
function updateProperties(vnode, oldProps = {}) {
    let newProps = vnode.data || {}; // 属性
    let el = vnode.el; // dom元素
    // 1、老的有,新的没：删除
    for (let key in oldProps) {
        if (!newProps[key]) {
            el.removeAttribute(key) // 新版浏览器会有个批处理，多次修改会合并。
        }
    }
    // style需要特殊判断
    let newStyle = newProps.style || {};
    let oldStyle = oldProps.style || {};
    for (let key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = ''
        }
    }

    // 2、新的有老的没：新增
    // 3、老的新的都有直接覆盖
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
