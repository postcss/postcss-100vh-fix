let postcss = require('postcss')

let plugin = require('./')

function run (input, output) {
  let result = postcss([plugin()]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('does nothing', () => {
  run('a{}', 'a{}')
})
