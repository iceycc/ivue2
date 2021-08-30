import {parseHtml} from "./parse";
import {generate} from "./generate";


;

export function compileToFunction(template) {
    // template -> ast语法树
    const el = parseHtml(template)
    // ast语法树 -> 包装成render函数体的字符串  _c('div',{},_c('span'))
    let code = generate(el)
    // console.log(code);
    // 函数体字符串 ——> 包装成 --> render函数
    let render = new Function(`
    with(this){
        return ${code}
    }
    `)
    return render
    // with和eval的区别，eval不干净，会获取到外面的值
}


