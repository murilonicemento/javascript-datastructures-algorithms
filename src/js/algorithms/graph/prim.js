const INF = Number.MAX_SAFE_INTEGER;

const minKey = (graph, key, visited) => {
  // Initialize min value
  let min = INF;
  let minIndex = 0;
  for (let v = 0; v < graph.length; v++) {
    if (visited[v] === false && key[v] < min) {
      min = key[v];
      minIndex = v;
    }
  }
  return minIndex;
};

const prim = graph => {
  const parent = [];
  const key = [];
  const visited = [];
  const { length } = graph;

  for (let i = 0; i < length; i++) { // {1}
    key[i] = INF;
    visited[i] = false;
  }

  key[0] = 0; // {2}
  parent[0] = -1;

  for (let i = 0; i < length; i++) { // {3}
    const u = minKey(graph, key, visited); // {4}
    visited[u] = true; // {5}

    for (let v = 0; v < length; v++) {
      if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) { // {6}
        parent[v] = u; // {7}
        key[v] = graph[u][v]; // {8}
      }
    }
  }

  return parent; // {9}
};

export { prim };
