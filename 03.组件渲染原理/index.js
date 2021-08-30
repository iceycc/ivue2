// vue2 options API 无法tree-shaking
// vue2中就是一个构造函数 class不好用mixin增加属性
import initMixin from "./init";
import {lifecycleMixin} from "./lifecycle";
import {renderMixin} from "./render";
import {initGlobalAPI} from "./global-api/index";

function Vue(options) {
    this._init(options);
}

// // 可以拆分逻辑到不同的文件中 更利于代码维护 模块化的概念
// Vue.prototype._init = function () {
// }
initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
initGlobalAPI(Vue)
export default Vue;

