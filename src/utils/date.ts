import { Review } from '../types/offer.ts';

export function formatReviewDate(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export const sortReviewsByDate = (reviews: Review[]) => {
  const reviewsCopy = [...reviews];
  return reviewsCopy.sort((reviewA, reviewB) => new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime());
};
