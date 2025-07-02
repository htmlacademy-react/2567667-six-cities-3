import { CITIES } from '../const';

export function getRandomCity(): (typeof CITIES)[number] {
  const index = Math.floor(Math.random() * CITIES.length);
  return CITIES[index];
}
