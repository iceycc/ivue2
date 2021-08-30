import serve from 'rollup-plugin-serve';
import babel from '@rollup/plugin-babel';

export default { // 用于打包的配置
    // input:'./src/index.js',
    input:'./src/diff.demo.js',
    output:{
        file:'dist/vue.js',
        name:'Vue', // 全局的名字就是vue
        format:'umd', // window.Vue 统一模块遍历 commonjs es6
        sourcemap:true, // es6->es5
    },
    plugins:[
        babel({
            exclude:"node_modules/**",// 这个目录不需要用babel转换
            // preset:
        }),
        serve({
            open:true,
            openPage:"/public/index.html",
            port:3000,
            contentBase:''
        })
    ]
}
