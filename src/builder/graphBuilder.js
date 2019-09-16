const builder = graph => ({
  addVertex: vertex => {
    graph.V.push(vertex)
    graph.adj[vertex] = []

    return builder(graph)
  },
  addEdge: (edge, from, to, type) => {
    graph.E.push(edge)
    graph.phi[edge] = { from, to, type }
    graph.adj[from].push(edge)
    type === 'undirected' && graph.adj[to].push(edge)

    return builder(graph)
  }
})

export default builder
