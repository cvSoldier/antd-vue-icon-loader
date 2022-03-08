const compiler = require('vue-template-compiler')

module.exports = function(source) {
  
  const { ast } = compiler.compile(source, {
    whitespace: 'condense'
  })

  return source
}
