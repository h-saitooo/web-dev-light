module.exports = () => ({
  plugins: {
    'autoprefixer': {},
    'cssnano': {
      preset: 'default',
      autoprefixer: false,
      zindex: false,
    }
  }
})
