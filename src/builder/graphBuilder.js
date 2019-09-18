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

const builder = (graph = JSON.parse(JSON.stringify(emptyGraph))) => ({
  addVertex: vertex => {
    addVertex(graph, vertex)
    return builder(graph)
  },
  addVertices: (...vertices) => {
    vertices.forEach(v => addVertex(graph, v))
    return builder(graph)
  },
  addEdge: (edge, from, to, type) => {
    graph.E.push(edge)
    graph.phi[edge] = { from, to, type }
    graph.adj[from].push(edge)
    type === 'undirected' && graph.adj[to].push(edge)

    return builder(graph)
  },
  build: () => graph
})

export default builder
