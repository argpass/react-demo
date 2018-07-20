const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const baseConfig = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: ['node_modules'],
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                exclude: ['node_modules'],
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: "[local]_[hash:base64:5]"
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            }
        ]
    },
    watch: true
}

const apps = ['concepts', 'form', 'foo', 'composition']
module.exports = []

apps.forEach((name) => {
    module.exports.push(Object.assign({}, baseConfig, {
        name: name,
        entry: `./src/${name}/index.jsx`,
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, `dist/${name}`)
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/tlp.html',
                filename: 'index.html',
                title: `${name.toUpperCase()} Page`
            }),
        ]
    }))
})

