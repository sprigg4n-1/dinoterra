// dino types

export interface IDino {
  id: number;
  name: string;
  latinName: string;
  diet: string;
  dietDescription: string;
  period: string;
  periodDescription: string;
  locations: IDinoLocation[];
  images: IDinoImages[];
}

export interface IDinoLocation {}
export interface IDinoImages {}
