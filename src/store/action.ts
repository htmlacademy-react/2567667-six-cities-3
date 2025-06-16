import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../const';

export const setCity = createAction<string>('offers/setCity');
export const setSortType = createAction<SortType>('offers/setSortType');
