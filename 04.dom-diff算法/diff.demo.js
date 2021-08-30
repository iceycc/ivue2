import Vue from './index.js'
import {compileToFunction} from "./compiler/index";
import {createElm, patch} from "./vdom/patch";
// diff算法
// 我们自己构建两个虚拟dom，之后手动比对
(function (done) {
    if (!done) return
    // 1、不进行diff操作的 之前的操作，先删除原来的，在创建新的
    let vm1 = new Vue({
        data() {
            return {
                name: 'wby1',
                age: 16
            }
        }
    })
    let render1 = compileToFunction(`<div><div>{{name}}</div><div>{{age}}</div></div>`)
    let oldVnode = render1.call(vm1)
    let el1 = createElm(oldVnode) //
    document.body.appendChild(el1)
    let vm2 = new Vue({
        data() {
            return {
                name: 'wby22',
                age: 16
            }
        }
    })
    let render2 = compileToFunction(`<div><div>{{name}}</div><div>{{age}}</div></div>`)
    let newVnode = render2.call(vm2)
    let el2 = createElm(newVnode) //
    document.body.removeChild(el1)
    document.body.appendChild(el2)
})();
(function (done) {
    if (!done) return
    let vm1 = new Vue({
        data() {
            return {
                name: 'wby1',
                age: 16
            }
        }
    })
    let oldVnode = compileToFunction(`<div a="1" style="background:red;color:white">{{name}}</div>`).call(vm1)
    let el1 = createElm(oldVnode)
    document.body.appendChild(el1)

    let vm2 = new Vue({
        data() {
            return {
                name: 'wby22',
                age: 16
            }
        }
    })
    // 1、 标签不一样，div -> p
    let render2 = compileToFunction(`<p>{{name}}</p>`)
    let newVnode2 = render2.call(vm2)
    // patch(oldVnode, newVnode2)
    // 2、标签一样，更新属性
    let render3 = compileToFunction(`<div b="2" style="color:green">{{name}}</div>`)
    let newVnode3 = render3.call(vm2)
    setTimeout(() => {
        patch(oldVnode, newVnode3)
    }, 1000)
})();
(function (done) {
    if (!done) return
    let vm1 = new Vue({
        data() {
            return {}
        }
    })
    let oldVnode = compileToFunction(`
        <ul>
            <li key="A" style="background:red">A</li>
            <li key="B" style="background:yellow">B</li>
            <li key="C" style="background:blue">C</li>
            <li key="D" style="background:green">D</li>
            <li key="F" style="background:pink">F</li>
        </ul>`).call(vm1)
    let el1 = createElm(oldVnode)
    document.body.appendChild(el1)
    let vm2 = new Vue({
        data() {
            return {}
        }
    })
    // 2、标签一样，都有儿子，diff
    let render3 = compileToFunction(`
        <ul>
             <li key="N" style="background:pink">N</li>
             <li key="A" style="background:red">A</li>
             <li key="C" style="background:blue">C</li>
             <li key="B" style="background:yellow">B</li>
            <li key="E" style="background:purple">E</li>
        </ul>`)
    let newVnode3 = render3.call(vm2)
    setTimeout(() => {
        console.log('------------')
        patch(oldVnode, newVnode3)
    }, 1000)
})(11);

export default Vue
