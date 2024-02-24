const INF = Number.MAX_SAFE_INTEGER;

const find = (i, parent) => {
  while (parent[i]) {
    i = parent[i];
  }

  return i;
};

const union = (i, j, parent) => {
  if (i !== j) {
    parent[j] = i;
    return true;
  }

  return false;
};

const initializeCost = graph => {
  const cost = [];
  const { length } = graph;

  for (let i = 0; i < length; i++) {
    cost[i] = [];
    for (let j = 0; j < length; j++) {
      if (graph[i][j] === 0) {
        cost[i][j] = INF;
      } else {
        cost[i][j] = graph[i][j];
      }
    }
  }

  return cost;
};

const kruskal = graph => {
  const { length } = graph;
  const parent = [];
  let ne = 0;
  let a; let b; let u; let v;
  const cost = initializeCost(graph); // {1}

  while (ne < length - 1) { // {2}
    for (let i = 0, min = INF; i < length; i++) { // {3}
      for (let j = 0; j < length; j++) {
        if (cost[i][j] < min) {
          min = cost[i][j];
          a = u = i;
          b = v = j;
        }
      }
    }
    u = find(u, parent); // {4}
    v = find(v, parent); // {5}

    if (union(u, v, parent)) ne++; // {6}

    cost[a][b] = cost[b][a] = INF; // {7}
  }

  return parent;
};

export { kruskal };
