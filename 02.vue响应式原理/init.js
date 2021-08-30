import {initState} from "./state";
import {compileToFunction} from "./compiler/index";
import {mountComponent} from "./lifecycle";
import {nextTick} from "./utils";

export default function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = options;
        // 初始化状态
        initState(vm);//
        // initXXX


        if (vm.$options.el) { // 判断是否有el直接挂载
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$nextTick = nextTick
    Vue.prototype.$mount = function (el) {
        el = document.querySelector(el)
        const vm = this;
        const options = vm.$options;
        vm.$el = el;
        // 如果有render直接使用
        // 没有render， 看有没有template属性
        // 没有template，找外部模版
        if (!options.render) {
            let template = options.template
            if (!template && el) {
                template = el.outerHTML // 火狐不兼容
                // template = document.createElement('div').appendChild(el).innerHTML
            }
            // 拿到html模版,如何将模版编译成render函数
            // html template -> render函数
            const render = compileToFunction(template)
            options.render = render;
        }
        mountComponent(vm, el)

    }
}



