const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
    watch: true,
    cache: false,
    context: path.join(__dirname, 'app/'),
    entry: ['./app.js'],
    devServer: {
        historyApiFallback:{
            index: '/'
        }
    },
    devtool: '#eval-source-map',
    resolve: {
        extensions: ['.js', '.html', 'css'],
        modules: ['node_modules'],
        alias: {
            appConfig: path.resolve(__dirname, 'app/config.js'),
        }
    },
    module: {
        rules: [
            {
                test: /(\.js)$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader',options: {'presets':['es2015']}}
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: {modules: true , sourceMap: true, localIdentName: '[local]'}}
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: {modules: true, sourceMap: true, localIdentName: '[local]'}},
                    {loader: 'sass-loader', options: {modules: true , sourceMap: true, localIdentName: '[local]'}}
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {loader: 'html-loader'}
                ]
              }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
};
