function process (decl, { AtRule, Rule }) {
  if (decl.value !== '100vh') return
  let rule = decl.parent

  let media = new AtRule({
    name: 'supports',
    params: '(-webkit-touch-callout: none)',
    source: decl.source
  })
  rule.after(media)

  let clonedRule = new Rule({
    selector: rule.selector,
    source: rule.source
  })
  media.append(clonedRule)

  clonedRule.append({
    important: decl.important,
    prop: decl.prop,
    source: decl.source,
    value: '-webkit-fill-available'
  })
}

module.exports = () => {
  return {
    Declaration: {
      'height': process,
      'max-height': process,
      'min-height': process
    },
    postcssPlugin: 'postcss-100vh-fix'
  }
}
module.exports.postcss = true
