import { Given, When, Then, defineParameterType } from 'cucumber'
import { expect } from 'chai'
import { deserialize } from '../graphSerializer'

defineParameterType({
  name: 'array',
  regexp: /(?:\d+,)*\d+/,
  transformer: string => string.split(',').map(Number)
})

defineParameterType({
  name: 'boolean',
  regexp: /true|false/,
  transformer: string => string === 'true'
})

let graph
Given('undirected {string} graph', graphName => {
  graph = deserialize(`${__dirname}/examples/${graphName}.json`)
})

let firstPaths
When('{string} first paths from {int}', (iterator, source) => {
  firstPaths = graph.firstPaths(source, iterator)
})

Then('should have {int} vertices', expected => {
  expect(
    Object.keys(graph.V).length
  ).equals(expected)
})

Then('should have {int} edges', expected => {
  expect(
    Object.keys(graph.E).length
  ).equals(expected)
})

Then('adjacent of vertex {int} should be {array}', (vertex, expected) => {
  expect(
    graph.adjacent(vertex)
  ).members(expected)
})

Then('should has path to {int} is {boolean}', (target, expected) => {
  expect(
    firstPaths.hasPathTo(target)
  ).equals(expected)
})
