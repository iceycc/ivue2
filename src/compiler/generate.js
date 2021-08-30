const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{}} 匹配差值表达式的
function genProps(attrs) {
    let str = ''
    for (let attr of attrs) {
        // 属性名为style，指令等需要单独处理
        let {name, value} = attr;

        if (name === 'style') {
            //  style="color:green;width:100px"
            //  --> style:{"color":"green","width":"100px"}
            value = value.split(';').reduce((p, n) => {
                let [key, v] = n.split(':');
                p[key] = v
                return p
            }, {})
        }
        str += `${name}:${JSON.stringify(value)},`
    }
    return `{${str.slice(0, -1)}}`

}

function genChildren(el) {
    let children = el.children;

    function gen(node) { // 要区分元素还是文本
        if (node.type === 1) {
            return generate(node)
        }
        if (node.type === 3) {
            // 文本逻辑不能用_c
            // 分三种
            // 1、有{{}}的
            // 2、普通文本
            // 3、混合文本
            let text = node.text;
            // debugger
            if (text.match(defaultTagRE)) {
                // 处理差值表达式
                // name {{name}} age {{age}} cc
                // -> _v("name"+_s(name)+"age"+_s(age)+"cc")
                let tokens = [];
                let match;
                let index;
                let lastIndex = defaultTagRE.lastIndex = 0;// lastIndex下次匹配的索引
                while (match = defaultTagRE.exec(text)) {
                    index = match.index;
                    if (index > lastIndex) {
                        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
                    }
                    tokens.push(`_s(${match[1].trim()})`);
                    lastIndex = index + match[0].length;
                }
                if (lastIndex < text.length) {
                    // 最后没匹配上的也需要放进去
                    tokens.push(JSON.stringify(text.slice(lastIndex)))
                }
                return `_v(${tokens.join('+')})`
            } else {

                return `_v(${JSON.stringify(text)})`;

            }
        }
    }

    if (children) {
        return children.map(child => gen(child)).join(',')
    }
}

/**
 * ast-> js(render)
 * @param el
 */
export function generate(el) {
    // ast树 -》 js代码  语法本身的转换
    // 转换成render代码
    let children = genChildren(el)
    let code = `_c(${JSON.stringify(el.tag)},${
        el.attrs.length ? genProps(el.attrs) : 'undefined'
    }
        ${
        children ? ',' + children : ''
    }
    )`
    return code
}

/**
 <div id="app" a="1" b="2">
 <span style="color:red">
 {{name}}
 <a href="#">hello</a>
 </span>
 </div>
 // ast -> render函数的js
 // js -> 虚拟dom
 // render函数生成的是虚拟dom
 function render() {
    return _c(
        'div',// tag
        {id: 'app', a: '1', b: '2'},// 标签属性
        _c( // 第一个children
            'span',
            {style: 'color:red'},
            _s(name),// 模版字符串
            _c('a',
                {},
                _v('hello')) // 文本节点
        )
    )
}
 **/



