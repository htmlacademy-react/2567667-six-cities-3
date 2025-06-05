import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { City } from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type Point = {
  latitude: number;
  longitude: number;
  title: string;
};

type MapProps = {
  city: City;
  points: Point[];
  selectedPoint?: Point;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg'
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg'
});

function Map({ city, points, selectedPoint }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint &&
            point.latitude === selectedPoint.latitude &&
            point.longitude === selectedPoint.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div className="cities__right-section" ref={mapRef} style={{height: '100%'}}></div>;
}

export default Map;
