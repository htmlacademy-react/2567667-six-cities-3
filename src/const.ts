export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
  NotFound: '*',
} as const;

export type AppRoute = typeof AppRoute[keyof typeof AppRoute];

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

export type AuthorizationStatus = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const DEFAULT_CITY = CITIES[0];

export const MapConfig = {
  BASE_URL: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
} as const;

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const RATINGS = [
  { value: 5, label: 'perfect' },
  { value: 4, label: 'good' },
  { value: 3, label: 'not bad' },
  { value: 2, label: 'badly' },
  { value: 1, label: 'terribly' },
];

export const SORT_OPTIONS = Object.values(SortType);

export const MAX_REVIEWS_COUNT = 10;

export const NameSpace = {
  Auth: 'auth',
  Offers: 'offers',
  Favorites: 'favorites',
} as const;

export const REVIEW_LIMIT = {
  MIN: 50,
  MAX: 300,
} as const;
