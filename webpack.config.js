/* jshint node:true */
'use strict';

module.exports = {
    module: {
        loaders: [
            {test: /\.(jsx|js)$/, loader: 'jsx-loader?harmony' },
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
            {test: /\.css$/,  loader: "style-loader!css-loader" },
            { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', 'index.jsx']
    },
    node: {
      fs: "empty"
    }
};