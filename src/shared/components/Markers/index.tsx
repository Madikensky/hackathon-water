import React from 'react';

const clientIconUrl =
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
const recyclingIconUrl =
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
const waterPointIconUrl =
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';

const IconWithLabel = ({ iconUrl, label }: { iconUrl: any; label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <img
      src={iconUrl}
      alt={label}
      style={{ width: '25px', height: '41px', marginRight: '8px' }}
    />
    <span>{label}</span>
  </div>
);

// Основной компонент
export const MarkersContent = () => (
  <div
    style={{
      border: '2px solid lightgray',
      display: 'flex',
      marginTop: '20px',
      flexDirection: 'column',
      gap: '10px',
      padding: '15px',
      borderRadius: '20px',
    }}
  >
    <IconWithLabel iconUrl={clientIconUrl} label="Клиент" />
    <IconWithLabel iconUrl={recyclingIconUrl} label="Центр обработки бутылок" />
    <IconWithLabel
      iconUrl={waterPointIconUrl}
      label="Пункт выдачи питьевой воды"
    />
  </div>
);
