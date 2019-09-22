import {
  shouldContainVertices,
  shouldNotContainEdge,
  shouldNotContainSelfLoops,
  shouldNotContainParallelEdges
} from './graphValidation'

const validator = validations => ({
  validate: (graph, edge) => {
    validations.some(v => v(graph, edge))
  }
})

const normalGraphValidations = [
  shouldContainVertices,
  shouldNotContainEdge
]

const simpleGraphValidations = [
  ...normalGraphValidations,
  shouldNotContainSelfLoops,
  shouldNotContainParallelEdges
]

export const validators = {
  normal: validator(normalGraphValidations),
  simple: validator(simpleGraphValidations)
}

export default validator
