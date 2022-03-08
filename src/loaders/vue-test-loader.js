const compiler = require('vue-template-compiler')
const iconDist = require('@ant-design/icons/lib/dist')
const fs = require('fs')
const loaderUtils = require('loader-utils')

let filePath = ''

function isAIcon(tagName) {
  return ['AIcon', 'a-icon'].includes(tagName)
}

function setAIcon(type, theme = 'outline') {
  const themeLowercase = (theme === 'filled' ? 'fill' : theme).toLowerCase();
  const iconExportKey = Object.keys(iconDist).find((key) => {
    return iconDist[key].name.toLowerCase() === type && iconDist[key].theme === themeLowercase;
  });
  const iconObj = iconDist[iconExportKey];
  const content = `export { default as ${iconExportKey}} from '@ant-design/icons/lib/${iconObj.theme}/${iconExportKey}'\r\n`
  writeToFile(content, iconExportKey)
}

function writeToFile(content, iconExportName) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '')
  }
  var iconFileContent = fs.readFileSync(filePath).toString();
  if (iconFileContent.indexOf(iconExportName) < 0) {
    fs.appendFileSync(filePath, content)
  }
}

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {}
  filePath = options.filePath

  const { ast } = compiler.compile(source, {
    whitespace: 'condense'
  })
  const arr = [...ast.children]
  while(arr.length) {
    const node = arr.shift()
    if(Array.isArray(node.children)) {
      arr.push(...node.children)
      for(let i = 0; i < node.children.length; ++i) {
        const curNode = node.children[i]
        if(isAIcon(curNode.tag)) {
          setAIcon(curNode.attrsMap.type, curNode.attrsMap.theme)
        }
      }
    }
  }

  return source
}
