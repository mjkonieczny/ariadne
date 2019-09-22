export const shouldNotContainVertex = (graph, vertex) => {
  if (graph.containsVertex(vertex)) {
    throwItemError('Graph already contains vertex', vertex)
  }
}

export const shouldContainVertex = (graph, vertex) => {
  if (!graph.containsVertex(vertex)) {
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

export const shouldNotHasCycle = (graph, { edge, from, to }) => {
  if (graph.firstPaths(to, 'depth').hasPathTo(from)) {
    throwItemError('Graph should not has cycle', edge)
  }
}

const throwItemError = (message, item) => {
  throw new Error(`${message} (${item})`)
}
