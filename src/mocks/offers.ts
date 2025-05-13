export interface City {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export interface Host {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
}

export interface Offer {
  id: number;
  title: string;
  type: 'apartment' | 'house' | 'room' | 'hotel';
  price: number;
  city: City;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  images: string[];
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: Host;
}

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.374, longitude: 4.889, zoom: 13 },
    },
    location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: 'img/apartment-01.jpg',
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    description: 'Spacious apartment in the city center with beautiful view.',
    bedrooms: 3,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Kitchen', 'Cable TV', 'Washing machine'],
    host: {
      id: 3,
      name: 'Angelina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
  },
  {
    id: 2,
    title: 'Wood and stone place',
    type: 'house',
    price: 200,
    city: {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
    },
    location: { latitude: 48.8584, longitude: 2.2945, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 4.2,
    previewImage: 'img/room.jpg',
    images: ['img/room.jpg', 'img/apartment-01.jpg'],
    description: 'Cozy house in a quiet neighborhood.',
    bedrooms: 4,
    maxAdults: 6,
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Dishwasher'],
    host: {
      id: 5,
      name: 'Max',
      isPro: false,
      avatarUrl: 'img/avatar-max.jpg',
    },
  },
  {
    id: 3,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    city: {
      name: 'Brussels',
      location: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
    },
    location: { latitude: 50.8503, longitude: 4.3517, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
    previewImage: 'img/apartment-03.jpg',
    images: ['img/apartment-03.jpg', 'img/apartment-02.jpg'],
    description: 'Comfortable apartment near the main square.',
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Coffee machine', 'Baby seat'],
    host: {
      id: 8,
      name: 'Rachel',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
  },
  {
    id: 4,
    title: 'Canal View Prinsengracht',
    type: 'hotel',
    price: 300,
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.374, longitude: 4.889, zoom: 13 },
    },
    location: { latitude: 52.374, longitude: 4.889, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: 'img/apartment-02.jpg',
    images: ['img/apartment-02.jpg', 'img/studio-01.jpg'],
    description: 'Luxurious hotel in the heart of Amsterdam with canal view.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Breakfast', 'Parking'],
    host: {
      id: 10,
      name: 'Payne',
      isPro: false,
      avatarUrl: 'img/avatar-max.jpg',
    },
  },
];
