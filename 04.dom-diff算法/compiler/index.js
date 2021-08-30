import {parseHtml} from "./parse";
import {generate} from "./generate";

export function compileToFunction(template) {
    // 1、template源码 -> ast语法树
    const el = parseHtml(template)
    // 2、 ast -> render code -> render function
    // ast语法树 -> 包装成render函数体的字符串  _c('div',{},_c('span'))
    let code = generate(el)
    // 函数体字符串 ——> 包装成 --> render函数
    let render = new Function(`
    with(this){
        return ${code}
    }
    `)
    // 3、render function done -> virtual dom
    return render
    // with和eval的区别，eval不干净，会获取到外面的值
}


