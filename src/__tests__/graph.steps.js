// features/support/steps.js
import { Given, When, Then } from 'cucumber'
import { expect } from 'chai'
import Graph from '../graph'

let graph

Given('undirected graph', () => {
  graph = new Graph()
})

When('I add vertex {int}', (vertex) => {
  graph.addVertex(vertex)
})

Then('should be {int} vertices', (number) => {
  expect(graph.v.length).equal(number)
})