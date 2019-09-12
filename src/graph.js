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
      marked && marked(item)
    } else {
      marker.push(item)
      unmarked && unmarked(item)
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
      unmarked && unmarked(vertex, edge)
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
        unmarked && unmarked(vertex, edge)
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

const degreeOfSeparation = (graph, source, target) => {
  const result = firstPaths(graph, source, 'breadth')

  return result.hasPathTo(target)
    ? result.pathTo(target).length - 1
    : -1
} 

const transitiveClosures = graph => {
  const closures = graph.V.reduce((agg, vertex) => {
    agg[vertex] = firstPaths(graph, vertex, 'depth')
    return agg
  }, {})

  return {
    isReachable: (source, target) => closures[source].hasPathTo(target)
  }
}

const depthFirstOrder = graph => {
  const marker = [], pre = [], post = []

  iterateArray(graph.V, {
    marker,
    unmarked: source => {
      marker.push(source)

      depth(graph, source, {
        marker,
        pre: vertex => pre.push(vertex),
        post: vertex => post.push(vertex)
      })
    }
  })

  return {
    pre,
    post,
    reversePost: post.slice().reverse()
  }
}

const topological = graph => {
  let order = null

  if (!cycles(graph).hasCycle) {
    order = depthFirstOrder(graph).reversePost
  }

  return {
    isDag: order !== null,
    order
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
          cycle = pathTo(Object.entries(edgeTo).reduce((x, [v, e]) => {
            x[v] = other(e, v)
            return x
          }, {}), vertex, other(edge, vertex))
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
  degreeOfSeparation: (source, target) => degreeOfSeparation(graph, source, target),
  transitiveClosures: () => transitiveClosures(graph),
  depthFirstOrder: () => depthFirstOrder(graph),
  topological: () => topological(graph),
  cycles: () => cycles(graph)
})

export default graph
