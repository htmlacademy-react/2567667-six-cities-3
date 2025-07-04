import { render } from '@testing-library/react';
import Map from './map.tsx';
import * as leaflet from 'leaflet';
import * as useMapHook from '../../hooks/use-map';
import { MemoryRouter } from 'react-router-dom';

vi.mock('leaflet', () => {
  const MarkerMock = vi.fn(() => ({
    setIcon: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
  }));
  return {
    Marker: MarkerMock,
    Icon: vi.fn(),
    layerGroup: vi.fn(() => ({
      addTo: vi.fn().mockReturnThis(),
      clearLayers: vi.fn(),
    })),
  };
});

vi.mock('../../hooks/use-map', () => ({
  default: vi.fn(),
}));

const mockCity = {
  name: 'Test City',
  location: { latitude: 10, longitude: 20, zoom: 5 },
};

const mockPoints = [
  { latitude: 10, longitude: 20, title: 'Point 1' },
  { latitude: 11, longitude: 21, title: 'Point 2' },
];

describe('Component: Map', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates markers for each point and sets icon correctly', () => {
    const removeLayerMock = vi.fn();

    const mockMapInstance = {
      addLayer: vi.fn(),
      removeLayer: removeLayerMock,
    } as unknown as leaflet.Map;

    (useMapHook.default as unknown as jest.Mock).mockReturnValue(mockMapInstance);

    render(
      <MemoryRouter>
        <Map city={mockCity} points={mockPoints} selectedPoint={mockPoints[0]} />
      </MemoryRouter>,
    );

    const MarkerClass = leaflet.Marker as unknown as jest.Mock;

    expect(MarkerClass).toHaveBeenCalledTimes(mockPoints.length);

    const firstMarkerInstance = MarkerClass.mock.results[0].value as {
      setIcon: jest.Mock;
    };

    expect(firstMarkerInstance.setIcon).toHaveBeenCalled();
  });

  it('cleans up markers layer on unmount', () => {
    const removeLayerMock = vi.fn();

    const mockMapInstance = {
      addLayer: vi.fn(),
      removeLayer: removeLayerMock,
    } as unknown as leaflet.Map;

    (useMapHook.default as unknown as jest.Mock).mockReturnValue(mockMapInstance);

    const { unmount } = render(
      <MemoryRouter>
        <Map city={mockCity} points={mockPoints} />
      </MemoryRouter>,
    );

    unmount();

    expect(removeLayerMock).toHaveBeenCalled();
  });
});
