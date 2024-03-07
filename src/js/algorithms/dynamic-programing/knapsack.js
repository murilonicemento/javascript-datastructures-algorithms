function findValues(n, capacity, kS, weights, values) {
  let i = n;
  let k = capacity;
  console.log('Items that are part of the solution:');

  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log(`item ${i} can be part of solution w,v: ${weights[i - 1]} , ${values[i - 1]}`);
      i--;
      k -= kS[i][k];
    } else {
      i--;
    }
  }
}

function knapSack(capacity, weights, values, n) {
  const kS = [];

  for (let i = 0; i <= n; i++) kS[i] = []; // {1}

  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) { // {2}
        kS[i][w] = 0;
      } else if (weights[i - 1] <= w) { // {3}
        const a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
        const b = kS[i - 1][w];
        kS[i][w] = a > b ? a : b; // {4} max(a, b);
      } else {
        kS[i][w] = kS[i - 1][w]; // {5}
      }
    }
  }

  findValues(n, capacity, kS, weights, values); // {6} código adicional

  return kS[n][capacity]; // {7}
}

const values = [3, 4, 5];
const weights = [2, 3, 4];
const capacity = 5;
const n = values.length;

console.log(knapSack(capacity, weights, values, n)); // exibe 7
