import { Given, When, Then, defineParameterType } from 'cucumber'
import { expect } from 'chai'
import { deserialize } from '../graphSerializer'

defineParameterType({
  name: 'array',
  regexp: /((?:\d+,)*\d+)|null/,
  transformer: string => string ? string.split(',').map(Number) : null
})

defineParameterType({
  name: 'boolean',
  regexp: /true|false/,
  transformer: string => string === 'true'
})

let graph
Given('{string} graph', graphName => {
  graph = deserialize(`${__dirname}/examples/${graphName}.json`)
})

let firstPaths
When('{string} first paths from {int}', (iterator, source) => {
  firstPaths = graph.firstPaths(source, iterator)
})

let cycles
When('check cycles', () => {
  cycles = graph.cycles()
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

Then('path to {int} should be {array}', (target, expected) => {
  const result = firstPaths.pathTo(target)
  expected ? expect(result).members(expected) : expect(result).null
})

Then('has cycle is {boolean}', expected => {
  expect(cycles.hasCycle).equals(expected)
}) 

Then('cycle is {array}', expected => {
  expect(cycles.cycle).ordered.members(expected)
})
