import { other } from './edge'

const edges = (graph, vertex) => {
  return graph.adj[vertex].map(v => graph.phi[v])
}

const adjacent = (graph, vertex) => {
  return edges(graph, vertex).map(edge => other(edge, vertex))
}

const iterateArray = (array, data) => {
  const { marker, unmarked, marked } = data

  array.forEach(item => {
    if (marker.includes(item)) {
      unmarked && unmarked(item)
    } else {
      marker.push(item)
      marked && marked(item)
    }
  })
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

  iterate(graph, source, {
    marker,
    unmarked: (vertex, edge) => {
      unmarked(vertex, edge)
      depth(graph, vertex, data)
    },
    marked
  })

  post && post(source)

  return graph
}

const breadth = (graph, source, data) => {
  const queue = []
  const { marker, unmarked, marked } = data

  queue.push(source)
  marker.push(source)

  while (queue.length) {
    const next = queue.shift()

    iterate(graph, next, {
      marker,
      unmarked: (vertex, edge) => {
        queue.push(vertex)
        unmarked(vertex, edge)
      },
      marked
    })
  }

  return graph
}

const pathTo = (edgeTo, source, target) => {
  const path = []

  for (let vertex = target; vertex !== source; vertex = edgeTo[vertex]) {
    path.push(vertex)
  }

  path.push(source)

  return path.reverse()
}

const firstPaths = (graph, source, iterator) => {
  const edgeTo = {}
  const data = ({
    marker: [],
    unmarked: (vertex, edge) => {
      edgeTo[vertex] = other(edge, vertex)
    }
  })

  switch (iterator) {
  case 'breadth': breadth(graph, source, data)
    break
  case 'depth': depth(graph, source, data)
    break
  }

  const hasPathTo = target => target in edgeTo

  return {
    hasPathTo,
    pathTo: target => hasPathTo(target) ? pathTo(edgeTo, source, target) : null
  }
}

const cycles = graph => {
  const marker = [], edgeTo = {}
  let onStack = [], cycle = null

  graph.V.forEach(source => {
    depth(graph, source, {
      marker,
      unmarked: (vertex, edge) => edgeTo[vertex] = edge,
      marked: (vertex, edge) => {
        if (!cycle && onStack.includes(vertex) && !Object.values(edgeTo).includes(edge)) {
          const asd = Object.entries(edgeTo).reduce((x, [v, e]) => {
            x[v] = other(e, v)
            return x
          }, {})
          console.log(asd)
          cycle = pathTo(asd, vertex, other(edge, vertex))
          cycle.push(vertex)
        }
      },
      pre: vertex => onStack.push(vertex),
      post: vertex => onStack = onStack.filter(v => v !== vertex)
    })
  }) 

  return {
    hasCycle: Boolean(cycle),
    cycle
  }
}

const graph = graph => ({
  ...graph,
  adjacent: vertex => adjacent(graph, vertex),
  edges: vertex => edges(graph, vertex),
  iterate: (vertex, data) => iterate(graph, vertex, data),
  depth: (source, data) => depth(graph, source, data),
  firstPaths: (source, iterator) => firstPaths(graph, source, iterator),
  cycles: () => cycles(graph)
})

export default graph
