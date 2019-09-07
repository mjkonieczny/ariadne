class Graph {
  constructor() {
    this.adjacents = {}
  }

  addVertex = (vertex) => {
    this.adjacents[vertex] = []
  }

  addEdge = (edge) => {
    this.adjacents[edge.from].push(edge)
    this.adjacents[edge.to].push(edge)
  }
}

export default Graph
