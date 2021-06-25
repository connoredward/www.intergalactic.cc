const withImages = require('next-images')
const withVideos = require('next-videos')
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([
  [withImages],
  [withVideos],
  [withFonts]
]);
