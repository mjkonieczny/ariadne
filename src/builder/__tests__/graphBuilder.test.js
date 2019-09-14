import { expect } from 'chai'
import builder from '../graphBuilder'

describe('graph builder', () => {
  it('should add vertex', () => {
    // given
    const graph = {
      V: [],
      E: [], 
      phi: {}
    }
    const build = builder(graph)

    // when
    build.addVertex(1)

    // then
    expect(graph.V).members([1])
  })
})
