
class Graph {
  constructor() {
    this.v = {}
    this.e = {}
  }

  addVertex = (vertex) => {
    this.v = [vertex]
  }
}

export default Graph
