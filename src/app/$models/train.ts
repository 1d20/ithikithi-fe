export interface TrainType {
  letter: string;
  places: number;
  title: string;
}

export interface TrainStation {
  station: string;
  station_id: number;
  date: number;
  src_date: string;
}

export interface TrainResponse {
  category: number;
  model: number;
  num: string;
  travel_time: string;
  types: TrainType[];
  till: TrainStation;
  from: TrainStation;
}

export type TrainsResponse = TrainResponse[];
