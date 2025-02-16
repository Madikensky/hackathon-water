import axios from 'axios';

export interface MapCoordinate {
  clients: Coordinate[];
  recycling_machines: Coordinate[];
  water_points: Coordinate[];
}

export interface Coordinate {
  address: string;
  coordinates: {
    lng: string;
    lat: string;
  };
}

const getMapPoints = async () => {
  const result = await axios.get('http://195.49.212.234:8089/api/locations');
  return result.data;
};

export const mapApi = {
  getMapPoints,
};
