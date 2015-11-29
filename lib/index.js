module.exports = function (graph) {

    // The graph must be directed
    if (!graph.directed) {
        throw new Error('Can\'t topologically sort an undirected graph.');
    }

    // Begin Kahn's algorithm
    var stack = [];

    // Compile list of vertices with no incoming edges
    var vertices = graph.getVertices(null, true);

    var vertex;
    for (var i = 0; i < vertices.length; i++) {
        vertex = graph.getVertex(vertices[i]);
        if (!vertex.indegree) {
            stack.push(vertex.id);
        }
    }

    var traversal = graph.snapshot().traverse();
    var current;

    while (stack.length) {

        current = traversal.hop(stack.pop()).currentVertex();

        var v;
        for (var j = 0; j < current.to.length; j++) {
            v = current.to[j];
            traversal.graph.removeEdge(current.id, v);
            if (!traversal.graph.getVertex(v).indegree) {
                stack.push(v);
            }
        }

    }

    if (traversal.graph.getEdges(null, true).length) {
        throw new Error('Can\'t topologically sort, as graph is cyclic.');
    }

    return traversal.sequence;
};
