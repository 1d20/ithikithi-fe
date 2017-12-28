export interface TrainType {
  letter: string;
  places: number;
  title: string;
}

export interface TrainStation {
  station: string;
  stationId: number;
  date: number;
  srcDate: string;
}

export interface TrainResponse {
  category: number;
  model: number;
  num: string;
  travelTime: string;
  types: TrainType[];
  till: TrainStation;
  from: TrainStation;
}

export type TrainsResponse = TrainResponse[];
