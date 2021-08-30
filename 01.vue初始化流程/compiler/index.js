import {parseHtml} from "./parse";
import {generate} from "./generate";


;

export function compileToFunction(template) {
    const el = parseHtml(template)
    // root 就是那棵树
    let code = generate(el)
    // console.log(code);
    let render = new Function(`
    with(this){
        return ${code}
    }
    `)
    return render
    // with和eval的区别，eval不干净，会获取到外面的值
}


