export function updateElo(ratingA: number, ratingB: number, resultA: 0 | 0.5 | 1) {
  const K = 32;
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const newA = ratingA + K * (resultA - expectedA);
  const newB = ratingB + K * ((1 - resultA) - (1 - expectedA));
  return { newA: Math.round(newA), newB: Math.round(newB) };
}
