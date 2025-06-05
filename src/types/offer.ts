export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface City {
  name: string;
  location: Location;
}

export interface Host {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Point = {
  latitude: number;
  longitude: number;
  title: string;
};

export type Review = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  rating: number;
  comment: string;
  date: string;
};

export interface Offer {
  id: string;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}
