

class Graph {
  constructor() {
    this.adjacents = {}
  }

  addVertex = (vertex) => {
    this.adjacents[vertex] = []
  }

  addEdge = (edge) => {
    this.adjacents[edge.from] = [...this.adjacents[edge.from], edge]
    this.adjacents[edge.to] = [...this.adjacents[edge.to], edge]
  }
}

export default Graph
