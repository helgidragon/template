const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DovEnv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  // Sección de módulos
  module: {
    // Reglas para tratar los diferentes elementos del paquete
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        mimetype: 'image/svg+xml',
        scheme: 'data',
        type: 'asset/resource',
        generator: {
          filename: 'icons/[hash].svg'
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },
  //   Sección de plugins
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')]
    }),
    new ESLintPlugin(),
    new MiniCssExtractPlugin(
      {
        filename: 'css/[name].css'
      }
    ),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'files'),
          to: '../files/[name][ext]',
          noErrorOnMissing: true
        }
      ]
    }),
    new HTMLWebpackPlugin({
      template: path.resolve('src', 'public') + '/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new DovEnv()
  ],
  resolve: {
    // Definición de alias para activos css, scss, js y archivos en general
    alias: {
      '@images': path.resolve(__dirname, 'src', 'images'),
      '@css': path.resolve(__dirname, 'src', 'css'),
      '@scss': path.resolve(__dirname, 'src', 'scss'),
      '@files': path.resolve(__dirname, 'src', 'files'),
      '@modules': path.resolve(__dirname, 'src', 'modules')
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true
    },
    watchFiles: ['src/**/*'],
    liveReload: true,
    open: true,
    port: 9000,
    historyApiFallback: true
  }
}
