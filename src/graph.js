const graph = (graph) => ({
  ...graph,
  adj: (v) => {
    return Object.entries(graph.phi)
      .filter(([, { from, to }]) => from === v || to === v)
      .map(([, { from, to }]) => from === v ? to : from)
  }
})

export default graph
