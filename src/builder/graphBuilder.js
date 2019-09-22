import { validators } from '../validators/graphValidator'
import decorateGraph from '../graph'

const addVertex = (graph, vertex) => {
  graph.V.push(vertex)
  graph.adj[vertex] = []
}

const emptyGraph = {
  V: [],
  E: [],
  phi: {},
  adj: {}
}

const clone = x => JSON.parse(JSON.stringify(x))

const builder = (
  graph = decorateGraph(clone(emptyGraph)),
  validator = validators.normal
) => ({
  withValidator: validator => {
    return builder(graph, validator)
  },
  addVertex: vertex => {
    addVertex(graph, vertex)
    return builder(graph, validator)
  },
  addVertices: (...vertices) => {
    vertices.forEach(v => addVertex(graph, v))
    return builder(graph, validator)
  },
  addEdge: (edge, from, to, type) => {
    validator.validate(graph, { edge, from, to })

    graph.E.push(edge)
    graph.phi[edge] = { from, to, type }
    graph.adj[from].push(edge)
    type === 'undirected' && graph.adj[to].push(edge)

    return builder(graph, validator)
  },
  build: () => graph
})

export default builder
