import { Given, Then } from 'cucumber'
import { expect } from 'chai'
import { deserialize } from '../graphSerializer'

let graph

Given('undirected graph', () => {
  graph = deserialize(`${__dirname}/examples/tinyG.json`)
})

// When('I add vertex {int}', (vertex) => {
//   graph.addVertex(vertex)
// })

// When('I add edge {int} from {int} to {int}', (edge, from, to) => {
//   graph.addEdge({
//     edge,
//     from,
//     to
//   })
// })

Then('should have {int} vertices', (expected) => {
  expect(
    Object.keys(graph.V).length
  ).equals(expected)
})

Then('should have {int} edges', (expected) => {
  expect(
    Object.keys(graph.E).length
  ).equals(expected)
})

Then('vertex {int} should have {int} edges', (vertex, expected) => {
  expect(
    Object.entries(graph.phi)
      .filter(([, { from, to }]) => from === vertex || to === vertex)
      .length
  ).equals(expected)
})