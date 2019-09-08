const adj = (graph, vertex) => {
  return Object.entries(graph.phi)
    .filter(([, { from, to }]) => from === vertex || to === vertex)
    .map(([, { from, to }]) => from === vertex ? to : from)
}
const edges = (graph, vertex) => {
  return Object.entries(graph.phi)
    .filter(([, { from, to }]) => from === vertex || to === vertex)
    .map(([, edge]) => edge)
}

const iterate = (graph, vertex, data) => {
  const { marker, unmarked, marked } = data

  edges(graph, vertex).forEach(edge => {
    const { from ,to } = edge
    const other = from === vertex ? to : from

    if (marker.includes(other)) {
      marked && marked(other, edge)
    } else {
      marker.push(other)
      unmarked && unmarked(other, edge)
    }
  })
}

const depth = (graph, source, data) => {
  const { marker, unmarked, marked, pre, post } = data

  pre && pre(source)
  marker.push(source)

  iterate(graph, source, {
    marker,
    unmarked: (vertex, edge) => {
      unmarked(vertex, edge)
      depth(graph, vertex, data)
    },
    marked
  })

  post && post(source)

  return this
}

const firstPaths = (graph, source) => {
  const edgeTo = {}

  depth(graph, source, ({
    marker: [],
    unmarked: (vertex, edge) => { 
      edgeTo[vertex] = edge
    }
  }))

  return {
    hasPathTo: target => target in edgeTo
  }
}

const graph = graph => ({
  ...graph,
  adj: vertex => adj(graph, vertex),
  edges: vertex => edges(graph, vertex),
  iterate: (vertex, data) => iterate(graph, vertex, data),
  depth: (source, data) => depth(graph, source, data),
  firstPaths: source => firstPaths(graph, source)
})

export default graph
