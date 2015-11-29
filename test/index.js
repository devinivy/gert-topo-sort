// Load modules

var Lab = require('lab');
var Code = require('code');

var Graph = require('gert').Graph;
var TopoSort = require('..');

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('TopoSort(graph)', function () {

    var isTopoSorted = function (graph, sequence) {

        // Ensure every edge is respected by the sequence
        var pairs = graph.getEdges(null, true);

        var pair;
        for (var i = 0; i < pairs.length; i++) {

            pair = pairs[i];

            if (sequence.indexOf(pair[0]) === -1 ||
                sequence.indexOf(pair[1]) === -1 ||
                sequence.indexOf(pair[0]) > sequence.indexOf(pair[1])) {

                return false;
            }
        }

        return true;
    };

    it('throws on receiving an undirected graph.', function (done) {

        var graph = new Graph({
            directed: false,
            vertices: ['a']
        });

        expect(function () {

            TopoSort(graph);
        }).to.throw('Can\'t topologically sort an undirected graph.');

        done();
    });

    it('throws on a receiving a cyclic graph.', function (done) {

        var graph = new Graph({
            directed: true,
            vertices: ['a', 'b', 'c', 'd'],
            edges: [
                ['a', 'b'], ['b', 'c'],
                ['c', 'a'], ['c', 'd']
            ]
        });

        expect(function () {

            TopoSort(graph);
        }).to.throw('Can\'t topologically sort, as graph is cyclic.');

        done();
    });

    it('topologically sorts a directed, acyclic graph.', function (done) {

        var graph = new Graph({
            directed: true,
            vertices: {
                'm': ['q', 'r', 'x'],
                'n': ['q', 'u', 'o'],
                'o': ['r', 's'],
                'p': ['o', 's', 'z'],
                'q': ['t'],
                'r': ['u', 'y'],
                's': ['r'],
                't': [],
                'u': ['t'],
                'v': ['w', 'x'],
                'w': ['z'],
                'x': [],
                'y': ['v'],
                'z': []
            }
        });

        var sorted = TopoSort(graph);

        expect(sorted.length).to.equal(graph.order());
        expect(isTopoSorted(graph, sorted)).to.equal(true);

        done();
    });

});
