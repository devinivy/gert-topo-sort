# gert-topo-sort

Topologically sort [Gert](https://github.com/devinivy/gert) graphs

[![Build Status](https://travis-ci.org/devinivy/gert-topo-sort.svg?branch=master)](https://travis-ci.org/devinivy/gert-topo-sort) [![Coverage Status](https://coveralls.io/repos/devinivy/gert-topo-sort/badge.svg?branch=master&service=github)](https://coveralls.io/github/devinivy/gert-topo-sort?branch=master)

## Usage
```js
var Graph = require('gert').Graph;
var TopoSort = require('gert-topo-sort');

var graph = new Graph({
    directed: true,
    vertices: {
        'Nap': [],
        'Make Toast': ['Eat breakfast'],
        'Pour juice': ['Eat breakfast'],
        'Eat breakfast': ['Nap']
    }
});

// ['Pour juice', 'Make Toast', 'Eat breakfast', 'Nap']
var morning = TopoSort(graph);
```

## API
### `TopoSort(graph)`
Returns an array of topologically sorted vertex ids from the directed, acyclic `graph`.  If `graph` is undirected or cyclic, `TopoSort()` will throw an error.
