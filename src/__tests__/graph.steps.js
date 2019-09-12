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

let depthFirstOrder
When('depth first order', () => {
  depthFirstOrder = graph.depthFirstOrder()
})

let topological
When('topological', () => {
  topological = graph.topological()
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
  expected 
    ? expect(firstPaths.pathTo(target)).members(expected) 
    : expect(firstPaths.pathTo(target)).null
})

Then('{string} order is {array}', (order, expected) => {
  expect(
    depthFirstOrder[order]
  ).ordered.members(expected)
})

Then('is dag is {boolean}', expected => {
  expect(topological.isDag).equals(expected)
})

Then('topological order is {array}', expected => {
  expected
    ? expect(topological.order).ordered.members(expected)
    : expect(topological.order).null
})

Then('has cycle is {boolean}', expected => {
  expect(cycles.hasCycle).equals(expected)
}) 

Then('cycle is {array}', expected => {
  expected
    ? expect(cycles.cycle).ordered.members(expected)
    : expect(cycles.cycle).null
})

Then('degree of separation between {int} and {int} is {int}', (source, target, expected) => {
  expect(graph.degreeOfSeparation(source, target)).equals(expected)
})
