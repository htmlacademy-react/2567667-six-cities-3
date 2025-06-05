export function formatReviewDate(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}
