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
When('first paths from {int}', s => {
  firstPaths = graph.firstPaths(s)
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
    graph.adj(vertex)
  ).members(expected)
})

Then('should has path to {int} is {boolean}', (t, expected) => {
  expect(
    firstPaths.hasPathTo(t)
  ).equals(expected)
})