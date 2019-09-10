import fs from 'fs'
import graph from './graph'

const adj = graph => ({
  ...graph,
  adj: Object.entries(graph.phi).reduce((adj, [edge, { from, to, type }]) => {
    if (!adj[from]) adj[from] = []
    adj[from].push(edge)
    if (type === 'undirected') {
      if (!adj[to]) adj[to] = [] 
      adj[to].push(edge)
    }
    return adj
  }, {})
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
