import { DrugstoreData } from './entities.types';
import { Nullable } from './utility.types';

export type GoogleMapState = {
  loading: boolean;
  error: Nullable<string>;
};

export type GoogleMapProps = { data: Array<DrugstoreData> };
