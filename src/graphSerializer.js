import fs from 'fs'
import graph from './graph'

const adj = graph => ({
  ...graph,
  adj: Object.entries(graph.phi).reduce((adj, [edge, { from, to, type }]) => {
    adj[from].push(edge)
    type === 'undirected' && adj[to].push(edge)
    return adj
  }, graph.V.reduce((adj, vertex) => {
    adj[vertex] = []
    return adj
  }, {}))
})

const deserialize = path => {
  const buffer = fs.readFileSync(path, (err, buffer) => {
    if (err) {
      console.log('File read failed', err)
      return
    }
    return buffer
  })

  try {
    return graph(adj(JSON.parse(buffer)))
  }
  catch(err) {
    console.log('Error parsing JSON buffer', err)
  }
}

export {
  deserialize
}
