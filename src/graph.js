import { other } from './edge'

export const adj = graph => ({
  ...graph,
  adj: Object.entries(graph.phi).reduce((adj, [edge, { from, to, type }]) => {
    adj[from].push(Number(edge))
    type === 'undirected' && adj[to].push(Number(edge))
    return adj
  }, graph.V.reduce((adj, vertex) => {
    adj[vertex] = []
    return adj
  }, {}))
})

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

const reverse = g => {
  const reversed = {
    V: g.V,
    E: g.E,
    phi: Object.entries(g.phi).reduce((phi, [edge, { from, to, type }]) => {
      phi[edge] = { from: to, to: from, type }
      return phi
    }, {})
  }

  return decorateGraph(reversed)
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

const coherentComponents = (graph, order) => {
  let vertices = null

  switch (order) {
  case 'ordinary': vertices = graph.V
    break
  case 'kosaraju': vertices = depthFirstOrder(reverse(graph)).reversePost
    break
  }

  const coherentComponents = [], marker = []

  iterateArray(vertices, {
    marker,
    unmarked: (vertex => {
      const component = []

      depth(graph, vertex, {
        marker,
        pre: v => component.push(v)
      })

      coherentComponents.push(component)
    })
  })

  return {
    coherentComponents
  }
}

const containsVertex = (graph, vertex) => graph.V.includes(vertex)

const containsEdge = (graph, edge) => graph.E.includes(edge)

const decorateGraph = graph => {
  const g = adj(graph)
  return {
    ...g,
    adjacent: vertex => adjacent(g, vertex),
    reverse: () => reverse(g),
    edges: vertex => edges(g, vertex),
    iterate: (vertex, data) => iterate(g, vertex, data),
    depth: (source, data) => depth(g, source, data),
    firstPaths: (source, iterator) => firstPaths(g, source, iterator),
    degreeOfSeparation: (source, target) => degreeOfSeparation(g, source, target),
    transitiveClosures: () => transitiveClosures(g),
    depthFirstOrder: () => depthFirstOrder(g),
    topological: () => topological(g),
    cycles: () => cycles(g),
    coherentComponents: order => coherentComponents(g, order),
    containsVertex: vertex => containsVertex(g, vertex),
    containsEdge: edge => containsEdge(g, edge)
  }
}

export default decorateGraph
