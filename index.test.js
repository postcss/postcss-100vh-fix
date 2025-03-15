let postcss = require('postcss')

let plugin = require('./')

function run (input, output) {
  let result = postcss([plugin]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('adds -webkit-fill-available', () => {
  run(
    '@media (max-width: 600px) { body { height: 100vh } }',
    '@media (max-width: 600px) { body { height: 100vh } ' +
      '@supports (-webkit-touch-callout: none) { ' +
      'body { height: -webkit-fill-available } } }'
  )
})

it('supports min-height', () => {
  run(
    '.min { min-height: 100vh }',
    '.min { min-height: 100vh }\n' +
      '@supports (-webkit-touch-callout: none) {\n' +
      ' .min { min-height: -webkit-fill-available } }'
  )
})

it('supports max-height', () => {
  run(
    '.max { max-height: 100vh }',
    '.max { max-height: 100vh }\n' +
      '@supports (-webkit-touch-callout: none) {\n' +
      ' .max { max-height: -webkit-fill-available } }'
  )
})

it('inherits !important flag', () => {
  run(
    '.max { max-height: 100vh !important }',
    '.max { max-height: 100vh !important }\n' +
      '@supports (-webkit-touch-callout: none) {\n' +
      ' .max { max-height: -webkit-fill-available !important } }'
  )
})

it('ignores non-100vh height', () => {
  run('body { max-height: 100% }', 'body { max-height: 100% }')
})
