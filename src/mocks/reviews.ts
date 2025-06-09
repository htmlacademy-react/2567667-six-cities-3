import { Review } from '../types/offer';

export const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    rating: 4.8,
    comment: 'A quiet cozy and picturesque place that hides behind a river.',
    date: '2019-04-24',
  },
  {
    id: '2',
    user: {
      name: 'Alex',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 4.0,
    comment: 'Lovely place. Clean and quiet.',
    date: '2020-06-12',
  },
];
