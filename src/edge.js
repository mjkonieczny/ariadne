const other = (edge, vertex) => {
  return (edge.type === 'undirected' && vertex === edge.to) ? edge.from : edge.to
}

export {
  other
}