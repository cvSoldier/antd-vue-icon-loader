const parser = require("@babel/parser")

module.exports = function(source) {
  const beginIndex = source.indexOf('<template>')
  const endIndex = source.indexOf('</template>')
  const html = source.slice(beginIndex, endIndex + 11)
  
  const ast = parser.parse(html, {
    plugins: ['jsx']
  })

  return source
}
