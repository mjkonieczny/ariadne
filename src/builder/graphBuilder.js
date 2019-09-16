const builder = graph => {
  return {
    addVertex: vertex => {
      graph.V.push(vertex)
      return builder(graph)
    }
  }
}

export default builder
