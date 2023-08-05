const path = require('path');
// 引入打包生成html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入打包自动清空前一次打包项目文件插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// webpack所有配置信息写在下方
module.exports = {

    // 指定入口文件
    entry:"./src/index.ts",

    // 指定打包文件所在目录
    output:{
        // 指定打包文件的目录
        path:path.resolve(__dirname,'dist'),
        // 设置打包后文件名
        filename:"bundle.js",

        // 告诉webpack不使用箭头函数
        // environment:{
        //     arrowFuction:false
        // }
    },
    // 指定webpack打包所用到的模块
    module:{
        // 指定要加载的规则
        rules:[
            {
                // test指定规则生效文件
                test:/\.ts$/,
                // 要使用的loader
                use:[
                    // 配置babel
                    {
                        // 指定加载器
                        loader:'babel-loader',
                        // 设置babel
                        options:{
                            // 设置预定运行环境
                            // preset:[
                            //     [
                            //         // 指定环境插件
                            //         "@babel/preset-env",
                            //         // 配置信息
                            //         {
                            //             // 要兼容的目标浏览器
                            //             targets:{
                            //                 "chrome":"88"
                            //             },
                            //             // 指定 core-js 的版本
                            //             "core-js":"3",
                            //             // 使用 core-js 的方式,"usage" 表示按需加载
                            //             "useBuiltIns":"usage"
                            //         }
                            //     ]
                            // ]

                        }
                    },
                    'ts-loader'
                ],
                // 指定要排除的文件
                exclude:/node-modules/

            },
            {
                // 设置sass文件处理
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // 配置webpack插件
    plugins:[
        // 自动生成相关的html文件并且自动引入相关的资源
        new HtmlWebpackPlugin({
            title:"这里控制打包后html文件title",
            template:'./src/index.html'
        }),
        // 清空dist旧文件后添加新文件
        new CleanWebpackPlugin()
    ],

    // 用来设置引用模块
    resolve:{
        extensions:['.ts','.js']
    }
}