import { mapApi, MapCoordinate } from '@/shared/api/map';
import { MarkersContent } from '@/shared/components/Markers';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Определение иконок для каждого типа объекта
const clientIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const recyclingIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const waterPointIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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
    );

    if (allPoints.length === 0) return [43.25667, 76.92861];

    const avg = (values: number[]) =>
      values.reduce((a, b) => a + b, 0) / values.length;

    return [
      avg(allPoints.map(([lat]) => lat)),
      avg(allPoints.map(([, lng]) => lng)),
    ];
  };

  const center = calculateCenter();

  return (
    <div className="flex flex-col gap-10">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: '500px', width: '100%', borderRadius: '25px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data && (
          <>
            {data.clients.map((client, index) => (
              <Marker
                key={`client-${index}`}
                position={[
                  parseFloat(client.coordinates.lat),
                  parseFloat(client.coordinates.lng),
                ]}
                icon={clientIcon}
              >
                <Popup>
                  <h3>Клиент {index + 1}</h3>
                  <p>{client.address}</p>
                  <div>
                    Координаты: {client.coordinates.lat},{' '}
                    {client.coordinates.lng}
                  </div>
                </Popup>
              </Marker>
            ))}

            {data.recycling_machines.map((machine, index) => (
              <Marker
                key={`recycling-${index}`}
                position={[
                  parseFloat(machine.coordinates.lat),
                  parseFloat(machine.coordinates.lng),
                ]}
                icon={recyclingIcon}
              >
                <Popup>
                  <h3>Рец. автомат {index + 1}</h3>
                  <p>{machine.address}</p>
                  <div>
                    Координаты: {machine.coordinates.lat},{' '}
                    {machine.coordinates.lng}
                  </div>
                </Popup>
              </Marker>
            ))}

            {data.water_points.map((waterPoint, index) => (
              <Marker
                key={`water-${index}`}
                position={[
                  parseFloat(waterPoint.coordinates.lat),
                  parseFloat(waterPoint.coordinates.lng),
                ]}
                icon={waterPointIcon}
              >
                <Popup>
                  <h3>Питьевая вода {index + 1}</h3>
                  <p>{waterPoint.address}</p>
                  <div>
                    Координаты: {waterPoint.coordinates.lat},{' '}
                    {waterPoint.coordinates.lng}
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
      <MarkersContent />
    </div>
  );
};
