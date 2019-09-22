import {
  shouldContainVertices,
  shouldNotContainEdge,
  shouldNotContainSelfLoops,
  shouldNotContainParallelEdges,
  shouldNotHasCycle
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

const treeValidations = [
  ...simpleGraphValidations,
  shouldNotHasCycle
]

export const validators = {
  normal: validator(normalGraphValidations),
  simple: validator(simpleGraphValidations),
  tree: validator(treeValidations)
}

export default validator
