import { expect } from 'chai'
import builder from '../graphBuilder'

describe('graph builder', () => {
  it('should add vertex', () => {
    // given
    const graph = {
      V: [],
      E: [],
      phi: {},
      adj: {}
    }
    const build = builder(graph)

    // when
    build
      .addVertex(1)
      .addVertex(2)

    // then
    expect(graph.V).members([1, 2])
  })

  const addEdge = [
    { type: 'undirected', adj: { 1: [1], 2: [1] } },
    { type: 'directed', adj: { 1: [1], 2: [] } }
  ]

  addEdge.forEach(({ type, adj }) => {
    it('should add edge', () => {
      // given
      const graph = {
        V: [],
        E: [],
        phi: {},
        adj: {}
      }
      const build = builder(graph)

      // when
      build
        .addVertex(1)
        .addVertex(2)
        .addEdge(1, 1, 2, type)


      // then
      expect(graph).eqls({
        V: [1, 2],
        E: [1],
        phi: {
          '1': { from: 1, to: 2, type }
        },
        adj
      })
    })
  })
})
