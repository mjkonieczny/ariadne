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

When('I add edge {int} from {int} to {int}', (edge, from, to) => {
  graph.addEdge({
    edge,
    from,
    to
  })
})

Then('should be {int} vertices', (expected) => {
  expect(Object.keys(graph.adjacents).length).equal(expected)
})

Then('vertex {int} should have {int} edges', (vertex, expected) => {
  expect(graph.adjacents[vertex].length).equal(expected)
})