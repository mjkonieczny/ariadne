import { other } from './edge'

const edges = (graph, vertex) => {
  return graph.adj[vertex].map(v => graph.phi[v])
}

const adjacent = (graph, vertex) => {
  return edges(graph, vertex).map(edge => other(edge, vertex))
}

const iterate = (graph, vertex, data) => {
  const { marker, unmarked, marked } = data

  edges(graph, vertex).forEach(edge => {
    const to = other(edge, vertex)

    if (marker.includes(to)) {
      marked && marked(to, edge)
    } else {
      marker.push(to)
      unmarked && unmarked(to, edge)
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
  adjacent: vertex => adjacent(graph, vertex),
  edges: vertex => edges(graph, vertex),
  iterate: (vertex, data) => iterate(graph, vertex, data),
  depth: (source, data) => depth(graph, source, data),
  firstPaths: source => firstPaths(graph, source)
})

export default graph
