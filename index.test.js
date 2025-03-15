let { equal } = require('node:assert')
let { test } = require('node:test')
let postcss = require('postcss')

let plugin = require('./')

function run (input, output) {
  let result = postcss([plugin]).process(input, { from: undefined })
  equal(result.css, output)
  equal(result.warnings(), 0)
}

test('adds -webkit-fill-available', () => {
  run(
    '@media (max-width: 600px) { body { height: 100vh } }',
    '@media (max-width: 600px) { body { height: 100vh } ' +
      '@supports (-webkit-touch-callout: none) { ' +
      'body { height: -webkit-fill-available } } }'
  )
})

test('supports min-height', () => {
  run(
    '.min { min-height: 100vh }',
    '.min { min-height: 100vh }\n' +
      '@supports (-webkit-touch-callout: none) {\n' +
      ' .min { min-height: -webkit-fill-available } }'
  )
})

test('supports max-height', () => {
  run(
    '.max { max-height: 100vh }',
    '.max { max-height: 100vh }\n' +
      '@supports (-webkit-touch-callout: none) {\n' +
      ' .max { max-height: -webkit-fill-available } }'
  )
})

test('inherits !important flag', () => {
  run(
    '.max { max-height: 100vh !important }',
    '.max { max-height: 100vh !important }\n' +
      '@supports (-webkit-touch-callout: none) {\n' +
      ' .max { max-height: -webkit-fill-available !important } }'
  )
})

test('ignores non-100vh height', () => {
  run('body { max-height: 100% }', 'body { max-height: 100% }')
})
