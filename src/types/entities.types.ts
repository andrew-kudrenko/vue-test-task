import { Nullable } from './utility.types';

export interface Schedule {
  day: number;
  dayName: string;
  start: string;
  end: string;
}

export interface GeoPosition {
  address: string;
  city: string;
  district: string;
  region: string;
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Marker {
  position: Location;
  title?: string;
}

export interface DrugstoreData {
  drugstoreId: string;
  geo: GeoPosition;
  phone: string;
  schedule: Array<Schedule>;
  hasDelivery: boolean;
  id: number;
}

export interface GetDrugstoresResponse {
  count: number;
  next: Nullable<unknown>;
  previous: Nullable<unknown>;
  result: Array<DrugstoreData>;
}
