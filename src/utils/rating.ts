export function getRatingWidth(rating: number): string {
  return `${Math.round(rating) * 20}%`;
}
