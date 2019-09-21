import { expect } from 'chai'
import builder from '../graphBuilder'
import { deserialize } from '../../graphSerializer'
import { adj } from '../../graph'

describe('graph builder', () => {
  it('should add vertex', () => {
    // when
    const graph = builder()
      .addVertex(1)
      .addVertex(2)
      .build()

    // then
    expect(graph.V).members([1, 2])
  })

  const addEdgeScenarios = [
    { type: 'undirected', adj: { 1: [1], 2: [1] } },
    { type: 'directed', adj: { 1: [1], 2: [] } }
  ]

  addEdgeScenarios.forEach(({ type, adj }) => {
    it('should add edge', () => {

      // when
      const grapha = builder()
        .addVertices(1, 2)
        .addEdge(1, 1, 2, type)
        .build()

      // then
      expect(grapha).eqls({
        V: [1, 2],
        E: [1],
        phi: {
          '1': { from: 1, to: 2, type }
        },
        adj
      })
    })
  })

  it('should build complex graph', () => {
    // given
    const expected = adj(deserialize(`${__dirname}/../../../examples/tinyG.json`))

    // when
    const graph = builder()
      .addVertices(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
      .addEdge(1, 0, 5, 'undirected')
      .addEdge(2, 4, 3, 'undirected')
      .addEdge(3, 0, 1, 'undirected')
      .addEdge(4, 9, 12, 'undirected')
      .addEdge(5, 6, 4, 'undirected')
      .addEdge(6, 5, 4, 'undirected')
      .addEdge(7, 0, 2, 'undirected')
      .addEdge(8, 11, 12, 'undirected')
      .addEdge(9, 9, 10, 'undirected')
      .addEdge(10, 0, 6, 'undirected')
      .addEdge(11, 7, 8, 'undirected')
      .addEdge(12, 9, 11, 'undirected')
      .addEdge(13, 5, 3, 'undirected')
      .build()

    //then
    expect(graph).eqls(expected)
  })
})
