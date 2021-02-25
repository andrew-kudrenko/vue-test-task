import { Schedule, GeoPosition, DrugstoreData } from './entities.types';

export type ScheduleReadDto = Omit<Schedule, 'dayName'> & { day_name: string };

export type GeoPositionReadDto = GeoPosition;

export type LocationReadDto = Location;

export type DrugstoreDataReadDto = Omit<DrugstoreData, 'hasDelivery' | 'drugstoreId'> & {
  drugstore_id: string;
  delivery: boolean;
};
