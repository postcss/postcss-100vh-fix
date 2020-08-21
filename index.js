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
    prop: decl.prop,
    value: '-webkit-fill-available',
    source: decl.source
  })
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-100vh-fix',
    Declaration: {
      'min-height': process,
      'max-height': process,
      'height': process
    }
  }
}
module.exports.postcss = true
