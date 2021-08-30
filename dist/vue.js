(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var oldArrayProtoMethod = Array.prototype; // 不能直接改写数组的原有数组

  var arrayMethods = Object.create(Array.prototype);
  var methods = [// 这七个会改写原数组
  'push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'sort']; // 根据索引改值还是监听不到。

  methods.forEach(function (_method) {
    // aop
    arrayMethods[_method] = function () {
      var _oldArrayProtoMethod$;

      console.log('数组变化了');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = (_oldArrayProtoMethod$ = oldArrayProtoMethod[_method]).call.apply(_oldArrayProtoMethod$, [this].concat(args)); // 有可能用户新增的数据是对象格式时


      var inserted;
      var __obj__ = this.__ob__;

      switch (_method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
      }

      if (inserted) {
        // observeArray
        __obj__.observeArray(inserted); // 谁调方法this就指向谁

      }

      __obj__.dep.notify(); // 修改数组时触发通知更新watcher


      return result;
    };
  });

  // 全局一个Dep属性
  var id$1 = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id$1++;
      this.subs = []; // 属性要记住这个watcher
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // 让watcher记住这个dep
        Dep.target.addDep(this); // 让watcher记住dep
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        //
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();

  Dep.target = null;
  function pushTarget(watcher) {
    Dep.target = watcher;
  }
  function popTarget() {
    Dep.target = null;
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 重新定义
      // value.__ob__ = this; // 这样会死循环，用下面的
      this.dep = new Dep(); // 给数组本身或者对象本身增加一个一个dep属性

      Object.defineProperty(value, '__ob__', {
        value: this,
        enumerable: false,
        // 可点数的,可列举的
        configurable: false // 可配置的

      }); // value数组或者对象

      if (Array.isArray(value)) {
        // 数组不用defineProperty
        // push shift reverse sort 等方法需要重写
        // value.__proto__ = arrayMethods
        Object.setPrototypeOf(value, arrayMethods);
        this.observeArray(value); // 数组原有的值会
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        var _iterator = _createForOfIteratorHelper(value),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            observer(item);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        // 将对象所有key 重新用defineProperty定义成响应式
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function dependArray(value) {
    // 让外层、里层都是一个watcher
    // 处理多维数组
    var _iterator2 = _createForOfIteratorHelper(value),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var item = _step2.value;
        item.__ob__ && item.__ob__.dep.depend();

        if (Array.isArray(item)) {
          // 递归继续进行依赖收集
          dependArray(item);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  function defineReactive(data, key, value) {
    // vue2数据嵌套不可以过深，过深浪费性能
    var childObj = observer(value); // 对值递归劫持, 返回的数组或者时对象，会有一个dep属性

    var dep = new Dep(); // 每次都会给属性创建一个dep

    Object.defineProperty(data, key, {
      // 需要给每个属性增加Dep
      get: function get() {
        if (Dep.target) {
          dep.depend(); // 让这个属性自己的dep记住这个watcher，也让watcher记住这个dep

          if (childObj) {
            // 可能数组也可能是对象，一般是数组，只有在$set给对象新增属性时会触发
            childObj.dep.depend(); // 数组增加依赖

            if (Array.isArray(value)) {
              // 处理多维数组
              dependArray(value);
            }
          }
        }

        return value;
      },
      set: function set(newValue) {
        console.log('set', key); // 如果用户设置的是对象也要继续劫持

        observer(newValue);
        if (newValue === value) return;
        value = newValue;
        dep.notify();
      }
    });
  }
  function observer(data) {
    // 只能对对象类型进行观测，非对象类型无法进行观测
    if (_typeof(data) !== 'object' || data === null) return; // 通过类来实现对数据对观测，类可以方便扩展，会产生实例

    if (data.__ob__) {
      return;
    }

    return new Observer(data);
  }

  function initState(vm) {
    // 将所有的数据定义在vm属性上，并且后序修改，需要触发视图更新
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      // 数据初始化
      initData(vm);
    }
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  function initData(vm) {
    // 数据劫持
    // Object.prototype.defineProperty
    var data = vm.$options.data; // 判断data的类型是函数还是对象
    // vm._data可以拿到劫持后对数据

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 将_data上对数据全部代理到vm上

    for (var key in data) {
      proxy(vm, '_data', key); // vm.name => vm._data.name
    } // 观测这个数据


    observer(data);
  }

  // 标签名 aa-aa
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // aa-aa
  // 标签名，命名空间标签 aa:aa

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //aa:aa
  // 开始标签 <div

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 可以匹配到标签名  [1]
  // 结束标签 <\div>

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); //[0] 标签的结束名字
  // 属性  style="xxx"   style='xxx'  style=xxx

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 开始标签闭合  >

  var startTagClose = /^\s*(\/?)>/; // console.log(`a='1'`.match(attribute));
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

  function parseHtml(html) {
    var root = null;
    var currentParent = null;
    var stack = []; // 创建ast

    function createASTElement(tag, attrs) {
      // vue3支持多个根元素(外面加了一个空元素）， vue2中只有一个根节点.
      return {
        tag: tag,
        type: 1,
        children: [],
        attrs: attrs,
        parent: null
      };
    } // 根据开始标签，结束标签，文本内容 生成一个ast语法树


    function start(tagName, attrs) {
      var element = createASTElement(tagName, attrs);

      if (!root) {
        // 第一个元素
        root = element;
      }

      currentParent = element;
      stack.push(element);
    }

    function end(tagName) {
      var element = stack.pop();
      currentParent = stack[stack.length - 1];

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    function chars(text) {
      text = text.replace(/\s/g, '');

      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    } // 截取前n位字符串


    function advance(n) {
      html = html.substring(n);
    } // 匹配开始标签和属性


    function parseStartTag() {
      var start = html.match(startTagOpen); // 匹配开头标签 <div

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 获取元素
        // console.log(html)
        // 查找属性, 不是开头结束标签的就一直匹配

        var _end, attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] || true
          });
        }

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      }
    }

    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          // 是个开始标签
          start(startTagMatch.tagName, startTagMatch.attrs); // console.log('开始标签',startTagMatch.tagName)

          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          // 是个结束标签
          end(endTagMatch[1]); // console.log('结束标签',endTagMatch[1])

          advance(endTagMatch[0].length);
          continue;
        } // break;

      }

      var text = void 0;

      if (textEnd > 0) {
        // 开始解析文本
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text); // console.log('文本节点',text)
      }
    }

    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{}} 匹配差值表达式的

  function genProps(attrs) {
    var str = '';

    var _iterator = _createForOfIteratorHelper(attrs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var attr = _step.value;
        // 属性名为style，指令等需要单独处理
        var name = attr.name,
            value = attr.value;

        if (name === 'style') {
          //  style="color:green;width:100px"
          //  --> style:{"color":"green","width":"100px"}
          value = value.split(';').reduce(function (p, n) {
            var _n$split = n.split(':'),
                _n$split2 = _slicedToArray(_n$split, 2),
                key = _n$split2[0],
                v = _n$split2[1];

            p[key] = v;
            return p;
          }, {});
        }

        str += "".concat(name, ":").concat(JSON.stringify(value), ",");
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(el) {
    var children = el.children;

    function gen(node) {
      // 要区分元素还是文本
      if (node.type === 1) {
        return generate(node);
      }

      if (node.type === 3) {
        // 文本逻辑不能用_c
        // 分三种
        // 1、有{{}}的
        // 2、普通文本
        // 3、混合文本
        var text = node.text; // debugger

        if (text.match(defaultTagRE)) {
          // 处理差值表达式
          // name {{name}} age {{age}} cc
          // -> _v("name"+_s(name)+"age"+_s(age)+"cc")
          var tokens = [];
          var match;
          var index;
          var lastIndex = defaultTagRE.lastIndex = 0; // lastIndex下次匹配的索引

          while (match = defaultTagRE.exec(text)) {
            index = match.index;

            if (index > lastIndex) {
              tokens.push(JSON.stringify(text.slice(lastIndex, index)));
            }

            tokens.push("_s(".concat(match[1].trim(), ")"));
            lastIndex = index + match[0].length;
          }

          if (lastIndex < text.length) {
            // 最后没匹配上的也需要放进去
            tokens.push(JSON.stringify(text.slice(lastIndex)));
          }

          return "_v(".concat(tokens.join('+'), ")");
        } else {
          return "_v(".concat(JSON.stringify(text), ")");
        }
      }
    }

    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }
  /**
   * ast-> js(render)
   * @param el
   */


  function generate(el) {
    // ast树 -》 js代码  语法本身的转换
    // 转换成render代码
    var children = genChildren(el);
    var code = "_c(".concat(JSON.stringify(el.tag), ",").concat(el.attrs.length ? genProps(el.attrs) : 'undefined', "\n        ").concat(children ? ',' + children : '', "\n    )");
    return code;
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

  function compileToFunction(template) {
    // 1、template源码 -> ast语法树
    var el = parseHtml(template); // 2、 ast -> render code -> render function
    // ast语法树 -> 包装成render函数体的字符串  _c('div',{},_c('span'))

    var code = generate(el); // 函数体字符串 ——> 包装成 --> render函数

    var render = new Function("\n    with(this){\n        return ".concat(code, "\n    }\n    ")); // 3、render function done -> virtual dom

    return render; // with和eval的区别，eval不干净，会获取到外面的值
  }

  var callbacks = [];
  var waiting = false;

  function flushCallbacks() {
    var _iterator = _createForOfIteratorHelper(callbacks),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var cb = _step.value;
        cb();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    waiting = false;
    callbacks = [];
  } // 批处理，第一次开启定时器，后序只更新列表，之后执行清空逻辑
  // 第一次cb 渲染watcher更新操作会调用nextTick 渲染watcher执行的过程肯定是同步的
  // 第二次cb 用户传人nextTick的回调，


  function nextTick(cb) {
    callbacks.push(cb); // 默认的cb是渲染逻辑，用户的逻辑放到渲染逻辑之后就行。

    if (!waiting) {
      waiting = true; // vue2做降级，vue3直接用promise.then了
      // 1、promise是否支持
      // 2、mutationObserver
      // 3、setImmediate
      // 4、setTimeout

      Promise.resolve().then(flushCallbacks);
    }
  }
  var isObject = function isObject(val) {
    return _typeof(val) === 'object' && val !== null;
  }; // 策略

  var LIFECYCLE_HOOKS = ['beforeCreate', 'created'];
  var strategies = {}; // 策略集合
  // 钩子合并策略

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strategies[hook] = function mergeHooks(parentValue, childValue) {
      if (!childValue) {
        // 儿子没有，用父亲
        return parentValue;
      } else {
        if (parentValue) {
          // 都有
          return parentValue.concat(childValue);
        } else {
          // 只有儿子
          return [childValue];
        }
      }
    };
  }); // 其他策略
  // strategies.data = function () {
  // }
  // 组件的合并策略

  strategies.components = function (parentValue, childValue) {
    // 查找链
    var res = Object.create(parentValue);

    if (childValue) {
      for (var key in childValue) {
        res[key] = childValue[key];
      }
    }

    return res;
  };

  function mergeOptions(parent, child) {
    var options = {}; // 不同的生命周期的合并策略（策略模式）
    // 普通属性的合并策略
    // 1 如何父亲有儿子没，应该儿子替换父亲
    // 2 如果父亲有值，用父亲的

    for (var key in parent) {
      mergeField(key);
    }

    for (var _key in child) {
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      if (strategies[key]) {
        return options[key] = strategies[key](parent[key], child[key]);
      }

      if (isObject(parent[key]) && isObject(child[key])) {
        options[key] = _objectSpread2(_objectSpread2({}, parent[key]), child[key]);
      } else {
        if (child[key]) {
          options[key] = child[key];
        } else {
          options[key] = parent[key];
        }
      }
    }

    return options;
  }

  function makeUp(str) {
    var map = {};
    str.split(',').forEach(function (tagName) {
      map[tagName] = true;
    });
    return function (tag) {
      return map[tag] || false;
    };
  }

  var isReservedTag = makeUp('a,p,div,ul,li,span,input,button');
  function isSameVnode(oldVnode, newVnode) {
    return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
  }

  var has = {};
  var queue = [];
  var pending = false;

  function flushSchedulerQueue() {
    var _iterator = _createForOfIteratorHelper(queue),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var watcher = _step.value;
        watcher.run();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    has = {};
    queue = [];
    pending = false;
  } // 多次调用queueWatcher，可能会开启多个nextTick ，如果watcher不是同一个,


  function queueWatcher(watcher) {
    // 调度更新几次
    // 更新是对watcher进行重新操作
    var id = watcher.id;

    if (has[id] == null) {
      // 没有id
      queue.push(watcher);
      has[id] = true;

      if (!pending) {
        // 加锁
        pending = true; // 让queue清空

        nextTick(flushSchedulerQueue);
      } // setTimeout(() => {
      //     flushSchedulerQueue()
      // }, 0)

    }
  }

  var id = 0;
  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, cb, options) {
      _classCallCheck(this, Watcher);

      this.id = id++;
      this.vm = vm;
      this.cb = cb;
      this.options = options;
      this.getter = exprOrFn;
      this.deps = []; //  如果是相同页面多个标签取get一个属性，会触发多次.

      this.depsId = new Set(); // dep去重

      this.get(); // this.exprOrFn() // 调用传人的函数。调用了render方法，此时会对模版中的数据进行取值
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        pushTarget(this); // 1、将当前watcher放到Dep上， Dep.target = watcher

        this.getter(); // 2、对属性进行取值 vm._update(vm._render())

        popTarget(); // 3、清空Dep.target = null，不在模版中访问对值不记录watcher
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        //
        var id = dep.id; // 一个dep可能对应多个watcher，

        if (!this.depsId.has(id)) {
          // dep去重,watcher也驱虫了
          this.depsId.add(id);
          this.deps.push(dep); // 让watcher记住dep

          dep.addSub(this); // 让dep记住watcher,唯一的dep记住唯一的watcher
        }
      }
    }, {
      key: "update",
      value: function update() {
        // this.get() // 数据一变重新渲染，同一个事件环中多次更新会触发多次
        queueWatcher(this); // 批处理，调度更新几次，
      }
    }, {
      key: "run",
      value: function run() {
        console.log('-------');
        this.get();
      } // 当属性取值时要记住这个watcher，稍后数据变化了，去执行自己记住的watcher即可。依赖收集

    }]);

    return Watcher;
  }();

  function patch(oldVnode, vnode) {
    if (!oldVnode) {
      // 子组件渲染的时候没有oldVnode作为老组件
      // 直接根据虚拟节点创建元素
      return createElm(vnode);
    } // 首次渲染oldvnode是真实的dom元素


    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      // 2、首次
      // 初次渲染
      var oldElm = oldVnode;
      var parentElm = oldElm.parentNode; // 根据虚拟节点创建真实的节点

      var el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldElm);
      return el;
    } else {
      // 3、两个虚拟节点的比对
      // 更新 diff算法
      // 1、如果新旧两个节点标签不一样，直接替换
      if (oldVnode.tag !== vnode.tag) {
        return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
      } // 2、标签相同但是是两个文本节点


      if (!oldVnode.tag) {
        if (oldVnode.text !== vnode.text) {
          return oldVnode.el.textContent = vnode.text;
        }
      } // 3、元素相同，复用老节点，更新属性


      var _el = vnode.el = oldVnode.el; //


      updateProperties(vnode, oldVnode.data); // 用老的属性和新的节点属性比对
      // 4、标签 属性都一样了，更新儿子！！

      var oldChildren = oldVnode.children || [];
      var newChildren = vnode.children || [];

      if (oldChildren.length > 0 && newChildren.length > 0) {
        // 1) 老的新的都有儿子（diff算法）
        updateChildren(_el, oldChildren, newChildren);
      } else if (oldChildren > 0) {
        // 2) 老的有新的没有儿子：直接删除老儿子
        _el.innerHTML = '';
      } else if (newChildren.length > 0) {
        // 3) 老的没儿子新的有儿子：在老节点新增儿子即可
        newChildren.forEach(function (child) {
          _el.appendChild(createElm(child));
        });
      }
    }
  }

  function updateChildren(parent, oldChildren, newChildren) {
    // 核心diff算法
    // 双指针
    var oldStartIndex = 0; // 老头索引

    var oldEndIndex = oldChildren.length - 1; // 老尾索引

    var oldStartVnode = oldChildren[0]; // 老开始节点

    var oldEndVnode = oldChildren[oldEndIndex];
    var newStartIndex = 0; // 新头索引

    var newEndIndex = newChildren.length - 1; // 新尾索引

    var newStartVnode = newChildren[0]; // 新开始节点

    var newEndVnode = newChildren[newEndIndex];

    function makeIndexByKey(oldChildren) {
      return oldChildren.reduce(function (map, child, index) {
        if (child.key !== undefined) {
          map[child.key] = index;
        }

        return map;
      }, {});
    }

    var map = makeIndexByKey(oldChildren); // 从头往后比

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
      // dom的移动性，
      // 尾部插入、头部插入、头部移动到尾部、尾部移动到头部、正序、反序
      if (!oldStartVnode) {
        // 空白节点直接跳过
        oldStartVnode = oldChildren[++oldStartIndex];
      } else if (!oldEndVnode) {
        // 空白节点直接跳过
        oldEndVnode = oldChildren[--oldEndIndex];
      } else if (isSameVnode(oldStartVnode, newStartVnode)) {
        // 1 头和头相比 尾部插入
        patch(oldStartVnode, newStartVnode); // 递归，深度遍历

        oldStartVnode = oldChildren[++oldStartIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else if (isSameVnode(oldEndVnode, newEndVnode)) {
        // 2 尾和尾比 头部插入
        patch(oldEndVnode, newEndVnode); // 递归，深度遍历

        oldEndVnode = oldChildren[--oldEndIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSameVnode(oldStartVnode, newEndVnode)) {
        // 3  老头和新尾比  将老的头部节点移动到老的尾节点后面. 头和尾交叉比,
        patch(oldStartVnode, newEndVnode);
        parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
        oldStartVnode = oldChildren[++oldStartIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSameVnode(oldEndVnode, newStartVnode)) {
        // 4 老尾和新头比  将老的尾部节点移动到老的头节点前面, 头和尾交叉比，
        patch(oldEndVnode, newStartVnode);
        parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
        oldEndVnode = oldChildren[--oldEndIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else {
        // 5 乱序
        // 需要先查找当前 老节点索引和key的关系
        // 移动的时候通过新的key，去找对应的老节点索引 --》 获取老节点，可以移动老节点
        var moveIndex = map[newStartVnode.key];

        if (moveIndex === undefined) {
          // 判断新的儿子在老儿子里有没有对应的key
          parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
        } else {
          var moveVnode = oldChildren[moveIndex];
          oldChildren[moveIndex] = undefined;
          patch(moveVnode, newStartVnode); // 如果找到了 再对两者的进行深层比对

          parent.insertBefore(moveVnode.el, oldStartVnode.el);
        }

        newStartVnode = newChildren[++newStartIndex];
      } // 为什么v-for要增加key？为啥不能用index

    }

    if (newStartIndex <= newEndIndex) {
      // 新到比老到多，插入新节点
      for (var i = newStartIndex; i <= newEndIndex; i++) {
        // 像前插入或者向后插入
        // 看一下后面又没下一个节点，有的话向前插入
        var nextEle = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el; // appendChild 和 insertBefore 也可以进行合并
        // 如果insertBefore 传入null 等价于appendChild

        parent.insertBefore(createElm(newChildren[i]), nextEle);
      }
    }

    if (oldStartIndex <= oldEndIndex) {
      for (var _i = oldStartIndex; _i <= oldEndIndex; _i++) {
        var child = oldChildren[_i];

        if (child !== undefined) {
          parent.removeChild(child.el);
        }
      }
    }
  } // vnode -》真实dom


  function createElm(vnode) {
    var tag = vnode.tag,
        children = vnode.children;
        vnode.key;
        vnode.data;
        var text = vnode.text;
        vnode.vm;

    if (typeof tag === 'string') {
      // 组件或者原生标签
      //  如果是组件
      if (createComponent(vnode)) {
        return vnode.componentInstance.$el;
      }

      vnode.el = document.createElement(tag); //

      updateProperties(vnode);
      children.forEach(function (child) {
        // 有可能是文本
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  } // 创建组件

  function createComponent(vnode) {
    var i = vnode.data;

    if ((i = i.hook) && (i = i.init)) {
      // 连续取值
      i(vnode); // init回调，会想vnode增加componentInstance属性
    }

    if (vnode.componentInstance) {
      return true;
    }
  } // 更新属性


  function updateProperties(vnode) {
    var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var newProps = vnode.data || {}; // 属性

    var el = vnode.el; // dom元素
    // 1、老的有,新的没：删除

    for (var key in oldProps) {
      if (!newProps[key]) {
        el.removeAttribute(key); // 新版浏览器会有个批处理，多次修改会合并。
      }
    } // style需要特殊判断


    var newStyle = newProps.style || {};
    var oldStyle = oldProps.style || {};

    for (var _key in oldStyle) {
      if (!newStyle[_key]) {
        el.style[_key] = '';
      }
    } // 2、新的有老的没：新增
    // 3、老的新的都有直接覆盖


    for (var _key2 in newProps) {
      if (_key2 === 'style') {
        for (var styleKey in newProps.style) {
          el.style[styleKey] = newProps.style[styleKey];
        }
      } else if (_key2 === 'class') {
        el.className = newProps["class"];
      } else {
        el.setAttribute(_key2, newProps[_key2]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      // 将虚拟节点转换成真实dom
      var vm = this; // 首次渲染 需要用虚拟节点，来更新真实的dom元素
      // vm.$el = patch(vm.$options.el, vnode)
      // 第一次渲染完毕后，拿到新的节点，下次更新再次渲染时替换上次渲染的结果
      // 第一次初始化 第二次diff算法

      var preVnode = vm._vnode; // 取上次vnode

      vm._vnode = vnode;

      if (!preVnode) {
        vm.$el = patch(vm.$el, vnode); // 组件渲染时调用patch方法会产生$el属性
      } else {
        vm.$el = patch(preVnode, vnode); // 第二次 diff算法
      }
    };
  }
  function callHook(vm, hook) {
    // 发布模式
    var handlers = vm.$options[hook];

    if (handlers) {
      handlers.forEach(function (handler) {
        return handler.call(vm);
      });
    }
  }
  function mountComponent(vm) {
    // 默认vue是通过watcher来渲染的，渲染watcher 每一个组件都有一个渲染watcher
    function updateComponent() {
      vm._update(vm._render(vm)); //  vm._render()获取虚拟节点（虚拟dom） _update把虚拟节点变成真实节点

    } // 其实就是执行updateComponent, 不过需要创建一个渲染watcher, 将watcher放到Dep.target上, 然后进行取值；最后清空Dep.target


    new Watcher(vm, updateComponent, function () {}, true);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // 这个options是用户传人的配置
      var vm = this; // 初始化状态
      // 合并选项 vm.constructor代表的是当前实例的构造函数

      vm.$options = mergeOptions(vm.constructor.options, options); // vm.$options = options;

      callHook(vm, 'beforeCreate'); // 增加钩子，发布

      initState(vm); //

      callHook(vm, 'created'); // 增加钩子，帆布

      if (vm.$options.el) {
        // 判断是否有el直接挂载
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$nextTick = nextTick;

    Vue.prototype.$mount = function (el) {
      el = el && document.querySelector(el);
      var vm = this;
      var options = vm.$options;
      vm.$el = el; // 如果有render直接使用
      // 没有render， 看有没有template属性
      // 没有template，找外部模版

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML; // 火狐不兼容
          // template = document.createElement('div').appendChild(el).innerHTML
        } // 拿到html模版,如何将模版编译成render函数
        // html template -> render函数


        var render = compileToFunction(template);
        options.render = render;
      }

      mountComponent(vm); // 组件挂载
    };
  }

  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    // 需要区分原生标签和自定义标签（组件）
    // console.log(tag,isReservedTag(tag))
    if (isReservedTag(tag)) {
      return Vnode(vm, tag, data, data.key, children, undefined);
    } else {
      // 不是一个普通标签，就是组件了
      var Ctor = vm.$options.components[tag]; // 内部创建的组件是对象，外部创建的是函数
      // return {text:1234}

      return createComponentVnode(vm, tag, data, data.key, children, Ctor); // tag可能是对象？
    }
  }
  function createComponentVnode(vm, tag, data, key, children, Ctor) {
    if (isObject(Ctor)) {
      // 将对象转成函数,组件的核心就是.extend
      // 组件的构造函数
      Ctor = vm.$options._base.extend(Ctor);
    } // 给组件增加生命周期


    data.hook = {
      init: function init(vnode) {
        // 初始化的钩子
        // 调用子组件的构造函数,获取子组件实例
        var child = vnode.componentInstance = new vnode.componentOptions.Ctor({});
        child.$mount(); // 子组件手动挂载 child.$el == vnode.componentInstance.$el == 真实元素
      }
    }; // 组件的虚拟节点拥有hook和当前组件的componentOptions中存放了组件的构造函数

    return Vnode(vm, "vue-component-".concat(Ctor.cid, "-").concat(tag), data, key, undefined, undefined, {
      Ctor: Ctor
    });
  }
  function createTextVnode(vm, text) {
    return Vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  function Vnode(vm, tag, data, key, children, text, componentOptions) {
    return {
      vm: vm,
      tag: tag,
      data: data,
      key: key,
      text: text,
      children: children,
      componentOptions: componentOptions
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 创建元素的虚拟节点
      return createElement.apply(void 0, [this].concat(args));
    };

    Vue.prototype._v = function (text) {
      // 创建文本的虚拟节点
      return createTextVnode(this, text);
    };

    Vue.prototype._s = function (val) {
      // 转换成字符串
      return val === null ? "" : _typeof(val) === 'object' ? JSON.stringify(val) : val;
    }; // 产生虚拟dom


    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render; // 调用render方法产生虚拟节点

      var vnode = render.call(vm); // _c(xx,xx,xx) 调用是会自动将变量进行取值，将其结果进行渲染

      return vnode;
    };
  }

  function initGlobalAPI(Vue) {
    Vue.options = {}; // 存储全局配置
    // filter directive component

    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      console.log(this.options);
      return this;
    };

    Vue.options._base = Vue; // 永远执行Vue的构造函数

    Vue.options.components = {}; // 内部的局部组件

    Vue.component = function (id, definition) {
      definition.name = definition.name || id; // 组件的名字先采用对象内写的
      // 通过一个对象产生一个构造函数, 保证永远使用的是Vue的extend,
      // 不管谁调component, 最后extend中返回的子类都是继承自原始的Vue。this.options._base永远指向Vue

      definition = this.options._base.extend(definition); // definition = Vue.extend(definition)

      this.options.components[id] = definition;
    };

    var cid = 0;

    Vue.extend = function (options) {
      var Super = this; // 子组件初始化时会 new VueComponent(options)

      var Sub = function VueComponent(options) {
        this._init(options);
      };

      Sub.cid = cid++; // 子类继承父类
      // 继承原型方法，所有组件 不管是子类还是孙子类都继承自原始的Vue

      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.component = Super.component; // 子类的options

      Sub.options = mergeOptions(Super.options, options);
      return Sub;
    }; // Sub.component()

  }

  // vue2 options API 无法tree-shaking

  function Vue(options) {
    this._init(options);
  } // // 可以拆分逻辑到不同的文件中 更利于代码维护 模块化的概念
  // Vue.prototype._init = function () {
  // }


  initMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
  initGlobalAPI(Vue);
  new Vue({
    name: 'zf'
  });

  // 我们自己构建两个虚拟dom，之后手动比对

  (function (done) {
    if (!done) return; // 1、不进行diff操作的 之前的操作，先删除原来的，在创建新的

    var vm1 = new Vue({
      data: function data() {
        return {
          name: 'wby1',
          age: 16
        };
      }
    });
    var render1 = compileToFunction("<div><div>{{name}}</div><div>{{age}}</div></div>");
    var oldVnode = render1.call(vm1);
    var el1 = createElm(oldVnode); //

    document.body.appendChild(el1);
    var vm2 = new Vue({
      data: function data() {
        return {
          name: 'wby22',
          age: 16
        };
      }
    });
    var render2 = compileToFunction("<div><div>{{name}}</div><div>{{age}}</div></div>");
    var newVnode = render2.call(vm2);
    var el2 = createElm(newVnode); //

    document.body.removeChild(el1);
    document.body.appendChild(el2);
  })();

  (function (done) {
    if (!done) return;
    var vm1 = new Vue({
      data: function data() {
        return {
          name: 'wby1',
          age: 16
        };
      }
    });
    var oldVnode = compileToFunction("<div a=\"1\" style=\"background:red;color:white\">{{name}}</div>").call(vm1);
    var el1 = createElm(oldVnode);
    document.body.appendChild(el1);
    var vm2 = new Vue({
      data: function data() {
        return {
          name: 'wby22',
          age: 16
        };
      }
    }); // 1、 标签不一样，div -> p

    var render2 = compileToFunction("<p>{{name}}</p>");
    render2.call(vm2); // patch(oldVnode, newVnode2)
    // 2、标签一样，更新属性

    var render3 = compileToFunction("<div b=\"2\" style=\"color:green\">{{name}}</div>");
    var newVnode3 = render3.call(vm2);
    setTimeout(function () {
      patch(oldVnode, newVnode3);
    }, 1000);
  })();

  (function (done) {
    if (!done) return;
    var vm1 = new Vue({
      data: function data() {
        return {};
      }
    });
    var oldVnode = compileToFunction("\n        <ul>\n            <li key=\"A\" style=\"background:red\">A</li>\n            <li key=\"B\" style=\"background:yellow\">B</li>\n            <li key=\"C\" style=\"background:blue\">C</li>\n            <li key=\"D\" style=\"background:green\">D</li>\n            <li key=\"F\" style=\"background:pink\">F</li>\n        </ul>").call(vm1);
    var el1 = createElm(oldVnode);
    document.body.appendChild(el1);
    var vm2 = new Vue({
      data: function data() {
        return {};
      }
    }); // 2、标签一样，都有儿子，diff

    var render3 = compileToFunction("\n        <ul>\n             <li key=\"N\" style=\"background:pink\">N</li>\n             <li key=\"A\" style=\"background:red\">A</li>\n             <li key=\"C\" style=\"background:blue\">C</li>\n             <li key=\"B\" style=\"background:yellow\">B</li>\n            <li key=\"E\" style=\"background:purple\">E</li>\n        </ul>");
    var newVnode3 = render3.call(vm2);
    setTimeout(function () {
      console.log('------------');
      patch(oldVnode, newVnode3);
    }, 1000);
  })(11);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
