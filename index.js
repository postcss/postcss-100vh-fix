let postcss = require('postcss')

module.exports = postcss.plugin('postcss-100vh-fix', () => {
  return root => {
    root.walkDecls(/(min-|max-)?height/, decl => {
      if (decl.value !== '100vh') return
      let rule = decl.parent

      let media = postcss.atRule({
        name: 'supports',
        params: '(-webkit-touch-callout: none)'
        // source: decl.source
      })
      rule.after(media)

      let clonedRule = postcss.rule({
        selector: rule.selector
        // source: rule.source
      })
      media.append(clonedRule)

      clonedRule.append({
        prop: decl.prop,
        value: '-webkit-fill-available'
        // source: decl.source
      })
    })
  }
})
