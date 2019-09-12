# Thezeus

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

# Sources
https://algs4.cs.princeton.edu/home/