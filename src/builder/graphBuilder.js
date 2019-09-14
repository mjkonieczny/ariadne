const builder = graph => ({
  addVertex: vertex => {
    graph.V.push(vertex)
  }
})

export default builder
