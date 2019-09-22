# Thezeus

## Builder

```javascript
const graph = builder()
  .addVertex(1)
  .addVertices(2, 3, 4)
  .addEdge(1, 1, 2, 'undirected')
  .addEdge(2, 3, 4, 'directed')
  .build()
```
Methods
* addVertex - adds one vertex
* addVertices - adds collection of vertices
* addEdge - adds edge _[edge, from, to, type]_

### Validators
Every builder can use validator to determine correctness of added edge
```javascript
const graph = builder()
  .withValidator(validators.simple)
  .addVertices(1, 2)
  .addEdge(1, 1, 2, 'directed')
  .addEdge(2, 1, 2, 'directed')
  .build()
```

Predefined validators:
  - _normal_
    - should contain vertices
    - should not contain edge
  - _simple_
    - ..._normal_
    - should not contain self loops
    - should not contain parallel edges

## Iterators

### Breadth

```javascript
graph.breadth(source, {
  marker: [],
  unmarked: (vertex, edge) => { }
  marked: (vertex, edge) => { }
}
```

Parameters
* source - vertex that iterator came from
* marker - list of already visited vertices
* unmarked - function called when iterator meets not visited vertex with edge came from
* marked - function called  when iterator meets visited vertex with edge came from

### Depth

```javascript
graph.depth(source, {
  marker: [],
  unmarked: (vertex, edge) => { }
  marked: (vertex, edge) => { }
  pre: (vertex) => { }
  post: (vertex) => { }
}
```

Parameters (the same as for breadth, and)
* pre - function called just before iterator visits vertex
* post - function called after visiting vertex (including its children)

## Algorithms

### First paths

```javascript
const firstPaths = graph.firstPaths(source, iterator)

firstPaths.hasPathTo(target)
firstPaths.pathTo(target)
```

Parameters 
* source - vertex where path starts
* target - vertex where path ends
* iterator - how path will be searched ('breadth' | 'depth')

### Degrees of separation

```javascript
graph.degreeOfSeparation(source, target)
```

### Transitive closures

```javascript
graph.transitiveClosures().isReachable(source, target)
```

### Depth first order

```javascript
const dfo = graph.depthFirstOrder()

dfo.pre
dfo.post
dfo.reversePost
```

### Topological sort

```javascript
const topological = graph.topological()

dfo.isDag
dfo.order
```

### Cycles

```javascript
const cycles = graph.cycles()

cycles.hasCycle()
cycles.cycle
```

### Coherent components

```javascript
const cc = graph.coherentComponents(order)

cc.coherentComponents
```

Parameters:
* order ('ordinary' | 'kosaraju')

# Sources
https://algs4.cs.princeton.edu/home/