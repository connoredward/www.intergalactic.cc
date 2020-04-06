const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const withImages = require('next-images')
const withVideos = require('next-videos')
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([
  [withSass, {
    cssModules: true
  }],
  [withCss, {
    cssModules: false,
    cssLoaderOptions: {
      url: false
    }
  }],
  [withImages],
  [withVideos],
  [withFonts]
],
{
  // For pure CSS (without CSS modules)
  test: /\.css$/i,
  exclude: /\.module\.css$/i,
  use: ['style-loader','css-loader'],
})