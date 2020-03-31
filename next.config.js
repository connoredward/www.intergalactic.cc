const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const withImages = require('next-images')
const withVideos = require('next-videos')
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([
  [withLess],
  [withSass, {
    cssModules: true
  }],
  [withCss, {
    cssModules: true
  }],
  [withImages],
  [withVideos],
  [withFonts]
], {
  onDemandEntries: {
    websocketPort: 49683,
  }
})