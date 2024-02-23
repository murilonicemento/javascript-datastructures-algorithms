// import Graph from '../../data-structures/graph';

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
};

const initializeColor = vertices => {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

const depthFirstSearchVisit = (u, color, adjList, callback) => {
  color[u] = Colors.GREY; // {5}

  if (callback) { // {6}
    callback(u);
  }

  const neighbors = adjList.get(u); // {7}

  for (let i = 0; i < neighbors.length; i++) { // {8}
    const w = neighbors[i]; // {9}

    if (color[w] === Colors.WHITE) { // {10}
      depthFirstSearchVisit(w, color, adjList, callback); // {11}
    }
  }

  color[u] = Colors.BLACK; // {12}
};

const depthFirstSearch = (graph, callback) => { // {1}
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) { // {2}
    if (color[vertices[i]] === Colors.WHITE) { // {3}
      depthFirstSearchVisit(vertices[i], color, adjList, callback); // {4}
    }
  }
};

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = Colors.GREY;
  d[u] = ++time.count; // {4}
  const neighbors = adjList.get(u);

  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];

    if (color[w] === Colors.WHITE) {
      p[w] = u; // {5}
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  }

  color[u] = Colors.BLACK;
  f[u] = ++time.count; // {6}

};

const DFS = graph => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const d = {};
  const f = {};
  const p = {};
  const time = { count: 0 }; // {1}

  for (let i = 0; i < vertices.length; i++) { // {2}
    f[vertices[i]] = 0;
    d[vertices[i]] = 0;
    p[vertices[i]] = null;
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }

  return { // {3}
    discovery: d,
    finished: f,
    predecessors: p
  };
};

export { DFS, depthFirstSearch };
