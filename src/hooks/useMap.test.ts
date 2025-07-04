import { renderHook } from '@testing-library/react';
import { createRef, MutableRefObject } from 'react';
import useMap from './use-map.tsx';
import { City } from '../types/offer';
import { Map as LeafletMap } from 'leaflet';
import type { Mock } from 'vitest';

vi.mock('leaflet', () => ({
  Map: vi.fn(() => ({
    setView: vi.fn(),
    addLayer: vi.fn(),
  })),
  TileLayer: vi.fn(),
}));

const mockCity: City = {
  name: 'Paris',
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12,
  },
};

describe('useMap hook', () => {
  let mapRef: MutableRefObject<HTMLElement | null>;

  beforeEach(() => {
    const div = document.createElement('div');
    mapRef = createRef<HTMLElement>();
    mapRef.current = div;
  });

  it('should initialize Leaflet map', () => {
    const { result } = renderHook(() => useMap(mapRef, mockCity));

    expect(result.current).toBeDefined();
    expect(result.current).not.toBeNull();
    expect(LeafletMap).toHaveBeenCalledWith(mapRef.current, expect.any(Object));
  });

  it('should update map view when city changes', () => {
    const mockSetView = vi.fn();

    (LeafletMap as unknown as Mock).mockImplementation(() => ({
      setView: mockSetView,
      addLayer: vi.fn(),
    }));

    const { rerender } = renderHook(
      ({ ref, city }) => useMap(ref, city),
      {
        initialProps: {
          ref: mapRef,
          city: mockCity,
        },
      }
    );

    const newCity: City = {
      name: 'Amsterdam',
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 10,
      },
    };

    rerender({ ref: mapRef, city: newCity });

    expect(mockSetView).toHaveBeenCalledWith(
      [newCity.location.latitude, newCity.location.longitude],
      newCity.location.zoom
    );
  });
});
