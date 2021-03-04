import { google } from 'google-maps';
import { DrugstoreData } from './entities.types';
import { Nullable } from './utility.types';

export type GoogleMapState = {
  loading: boolean;
  error: Nullable<string>;
};

export type GoogleMapProps = { data: Array<DrugstoreData> };

export type DrugstoreCatalogState = {
  map: Nullable<google.maps.Map>;
};

export type DrugstoreState = {
  data: Array<DrugstoreData>;
  filtered: Array<DrugstoreData>;
};

export type DrugstoreCatalogHeaderState = {
  query: string;
};
