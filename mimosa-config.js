exports.config = {
  copy: {
    extensions  : ['html', 'js', 'eot', 'svg', 'ttf', 'woff', 'woff2']
  },
  modules: [
    'coffeescript',
    'copy',
    'jade',
    'less'
  ],
  template: {
    wrapType    : 'none'
  },
  watch: {
    compiledDir : 'public/custom',
    sourceDir   : 'custom'
  }
}