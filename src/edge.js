const other = (edge, vertex) => {
  return vertex == edge.to ? edge.from : edge.to
}

export {
  other
}
