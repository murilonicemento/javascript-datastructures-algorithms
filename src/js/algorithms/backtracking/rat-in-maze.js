function isSafe(maze, x, y) {
  const n = maze.length;

  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) return true; // {11}

  return false;
}

function findPath(maze, x, y, solution) {
  const n = maze.length;

  if (x === n - 1 && y === n - 1) { // {4}
    solution[x][y] = 1;

    return true;
  }

  if (isSafe(maze, x, y) === true) { // {5}
    solution[x][y] = 1; // {6}

    if (findPath(maze, x + 1, y, solution)) return true; // {7}

    if (findPath(maze, x, y + 1, solution)) return true; // {8}

    solution[x][y] = 0; // {9}

    return false;
  }

  return false; // {40}
}

function ratInAMaze(maze) {
  const solution = [];

  for (let i = 0; i < maze.length; i++) { // {1}
    solution[i] = [];

    for (let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
    }
  }

  if (findPath(maze, 0, 0, solution) === true) return solution; // {2}

  return 'PATH_NOT_FOUND'; // {3}
}

const maze = [
  [1, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 1, 0],
  [0, 1, 1, 1]
];

console.log(ratInAMaze(maze));
