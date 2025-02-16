import { mapApi, MapCoordinate } from '@/shared/api/map';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

L.Marker.prototype.options.icon = DefaultIcon;

L.Marker.prototype.options.icon = DefaultIcon;

export const MapWidget = () => {
  const [data, setData] = useState<MapCoordinate | null>(null);

  useEffect(() => {
    mapApi.getMapPoints().then(setData);
  }, []);

  const calculateCenter = (): [number, number] => {
    if (!data) return [43.25667, 76.92861]; // Координаты по умолчанию (Алматы)

    const allPoints = [
      ...data.clients,
      ...data.recycling_machines,
      ...data.water_points,
    ].map(
      (p) =>
        [parseFloat(p.coordinates.lat), parseFloat(p.coordinates.lng)] as [
          number,
          number
        ]
    ); // Явно указываем тип

    if (allPoints.length === 0) return [51.1282, 71.4304];

    const avg = (values: number[]) =>
      values.reduce((a, b) => a + b, 0) / values.length;

    return [
      avg(allPoints.map(([lat]) => lat)),
      avg(allPoints.map(([, lng]) => lng)),
    ];
  };

  const center = calculateCenter();

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data &&
        ['clients', 'recycling_machines', 'water_points'].map((key) =>
          data[key as keyof MapCoordinate]?.map((point, index) => (
            <Marker
              key={`${key}-${index}`}
              position={[
                parseFloat(point.coordinates.lat),
                parseFloat(point.coordinates.lng),
              ]}
            >
              <Popup>
                <h3>
                  {key === 'clients'
                    ? 'Клиент'
                    : key === 'recycling_machines'
                    ? 'Рец. автомат'
                    : 'Питьевая вода'}{' '}
                  {index + 1}
                </h3>
                <p>{point.address}</p>
                <div>
                  Координаты: {point.coordinates.lat}, {point.coordinates.lng}
                </div>
              </Popup>
            </Marker>
          ))
        )}
    </MapContainer>
  );
};
