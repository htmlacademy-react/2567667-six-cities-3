import {AppRoute} from '../../const.ts';

export const layoutConfig: Record<AppRoute, {
  rootClass?: string;
  mainClass?: string;
  showUser: boolean;
  showFooter: boolean;
}> = {
  [AppRoute.Root]: {
    rootClass: 'page--gray page--main',
    mainClass: 'page__main page__main--index',
    showUser: true,
    showFooter: false,
  },
  [AppRoute.Login]: {
    rootClass: 'page--gray page--login',
    mainClass: 'page__main page__main--login',
    showUser: false,
    showFooter: false,
  },
  [AppRoute.Favorites]: {
    rootClass: '',
    mainClass: 'page__main page__main--favorites',
    showUser: true,
    showFooter: true,
  },
  [AppRoute.Offer]: {
    rootClass: '',
    mainClass: 'page__main page__main--offer',
    showUser: true,
    showFooter: false,
  },
  [AppRoute.NotFound]: {
    rootClass: 'page--gray page--main',
    mainClass: 'page__main page__main--index',
    showUser: false,
    showFooter: false,
  },
};
