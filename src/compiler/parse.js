// 标签名 aa-aa
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // aa-aa
// 标签名，命名空间标签 aa:aa
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //aa:aa
// 开始标签 <div
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 可以匹配到标签名  [1]
// 结束标签 <\div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); //[0] 标签的结束名字
// 属性  style="xxx"   style='xxx'  style=xxx
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// 开始标签闭合  >
const startTagClose = /^\s*(\/?)>/;

// console.log(`a='1'`.match(attribute));

// <div style="color:red">
//  <span></span>
// </div>
// html ---> ast
// let ast = {
//     tag:'div',
//     type:1, // nodeType
//     attrs:[{style:"color:red"}],
//     children:[{
//         tag: 'span',
//         type:1,
//         attrs:[],
//         children:[]
//     }]
// }
// 解析过程，从头往后匹配，匹配到一个就截取掉，直到截取完毕。状态机

export function parseHtml(html) {
    let root = null;
    let currentParent = null;
    let stack = []
    // 创建ast
    function createASTElement(tag, attrs) {
        // vue3支持多个根元素(外面加了一个空元素）， vue2中只有一个根节点.
        return {
            tag,
            type: 1,
            children: [],
            attrs,
            parent: null,
        }
    }

    // 根据开始标签，结束标签，文本内容 生成一个ast语法树
    function start(tagName, attrs) {
        let element = createASTElement(tagName, attrs)
        if (!root) {
            // 第一个元素
            root = element
        }
        currentParent = element;
        stack.push(element);
    }

    function end(tagName) {
        let element = stack.pop();
        currentParent = stack[stack.length - 1];
        if (currentParent) {
            element.parent = currentParent;
            currentParent.children.push(element);
        }

    }

    function chars(text) {
        text = text.replace(/\s/g, '')
        if (text) {
            currentParent.children.push({
                type: 3,
                text
            })
        }
    }

    // 截取前n位字符串
    function advance(n) {
        html = html.substring(n)
    }

    // 匹配开始标签和属性
    function parseStartTag() {
        const start = html.match(startTagOpen) // 匹配开头标签 <div
        if (start) {
            let match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length) // 获取元素
            // console.log(html)
            // 查找属性, 不是开头结束标签的就一直匹配
            let end, attr;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length)
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5] || true
                })
            }
            if (end) {
                advance(end[0].length)
                return match;
            }
        }
    }

    while (html) {
        let textEnd = html.indexOf('<');
        if (textEnd === 0) {
            let startTagMatch = parseStartTag()
            if (startTagMatch) { // 是个开始标签
                start(startTagMatch.tagName, startTagMatch.attrs)
                // console.log('开始标签',startTagMatch.tagName)
                continue;
            }
            let endTagMatch = html.match(endTag);
            if (endTagMatch) {// 是个结束标签
                end(endTagMatch[1])
                // console.log('结束标签',endTagMatch[1])
                advance(endTagMatch[0].length)
                continue;
            }
            // break;
        }
        let text;
        if (textEnd > 0) { // 开始解析文本
            text = html.substring(0, textEnd)
        }
        if (text) {
            advance(text.length)
            chars(text)
            // console.log('文本节点',text)
        }
    }

    return root
}
