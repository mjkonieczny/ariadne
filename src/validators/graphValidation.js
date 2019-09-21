export const shouldNotContainVertex = (graph, vertex) => {
  if (graph.ContainsVertex(vertex)) {
    throwItemError('Graph already contains vertex', vertex)
  }
}

export const shouldContainVertex = (graph, vertex) => {
  if (!graph.ContainsVertex(vertex)) {
    throwItemError('Graph does not contain vertex', vertex)
  }
}

export const shouldContainVertices = (graph, { from, to }) => {
  shouldContainVertex(graph, from)
  shouldContainVertex(graph, to)
}

export const shouldNotContainEdge = (graph, { edge }) => {
  if (graph.containsEdge(edge)) {
    throwItemError('Graph already contains edge', edge)
  }
}

export const shouldNotContainSelfLoops = (_, { edge, from, to }) => {
  if (from === to) {
    throwItemError('Graph should not contain self loops', edge)
  }
}

export const shouldNotContainParallelEdges = (graph, { edge, from, to }) => {
  if (graph.adj[from].map(e => graph.phi[e].to).includes(to)) {
    throwItemError('Graph should not parallel edges', edge) 
  }
}

const throwItemError = (message, item) => {
  throw new Error(`${message} (${item})`)
}
