function minCoinChain(coins, amount) {
  const change = [];
  let total = 0;

  for (let i = coins.length; i >= 0; i--) { // {1}
    const coin = coins[i];

    while (total + coin <= amount) { // {2}
      change.push(coin); // {3}
      total += coin; // {4}
    }
  }

  return change;
}

export { minCoinChain };
