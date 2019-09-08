const adj = (g, v) => {
  return Object.entries(g.phi)
    .filter(([, { from, to }]) => from === v || to === v)
    .map(([, { from, to }]) => from === v ? to : from)
}
const edges = (g, v) => {
  return Object.entries(g.phi)
    .filter(([, { from, to }]) => from === v || to === v)
    .map(([, edge]) => edge)
}

const iterate = (g, v, data) => {
  const { marker, unmarked, marked } = data

  edges(g, v).forEach(e => {
    const { from ,to } = e
    const other = from === v ? to : from

    if (marker.includes(other)) {
      marked && marked(other, e)
    } else {
      marker.push(other)
      unmarked && unmarked(other, e)
    }
  })
}

const depth = (g, s, data) => {
  const { marker, unmarked, marked, pre, post } = data

  pre && pre(s)
  marker.push(s)

  iterate(g, s, {
    marker,
    unmarked: (v, e) => {
      unmarked(v, e)
      depth(g, v, data)
    },
    marked
  })

  post && post(s)

  return this
}

const firstPaths = (g, s) => {
  const edgeTo = {}

  depth(g, s, ({
    marker: [],
    unmarked: (v, e) => { 
      edgeTo[v] = e
    }
  }))

  return {
    hasPathTo: t => t in edgeTo
  }
}

const graph = g => ({
  ...g,
  adj: v => adj(g, v),
  edges: v => edges(g, v),
  iterate: (v, data) => iterate(g, v, data),
  depth: (v, data) => depth(g, v, data),
  firstPaths: s => firstPaths(g, s)
})

export default graph
