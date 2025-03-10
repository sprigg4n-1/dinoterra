// dino types
export interface IDino {
  id: number;
  name: string;
  latinName: string;
  description: string;
  typeOfDino: string;
  length: number;
  weight: number;
  period: string;
  periodDate: string;
  periodDescription: string;
  diet: string;
  dietDescription: string;
  foundLocations: IDinoFoundLocation[];
  images: IDinoImages[];
}

export interface IDinoFoundLocation {
  id: number;
  latitude: string;
  longitude: string;
  place: string;
  dino_id: number;
}
export interface IDinoImages {
  id: number;
  image: string;
  fileName: string;
  dino_id: number;
}

// enums
export enum EDinoDiet {
  Herbivores = "Herbivores",
  Carnivores = "Carnivores",
  Omnivores = "Omnivores",
  Piscivores = "Piscivores",
  Insectivores = "Insectivores",
  FilterFeeders = "FilterFeeders",
}

export const dinoDietLabels: Record<EDinoDiet, string> = {
  [EDinoDiet.Herbivores]: "Травоїдні",
  [EDinoDiet.Carnivores]: "М'ясоїдні",
  [EDinoDiet.Omnivores]: "Всеїдні",
  [EDinoDiet.Piscivores]: "Рибоїдні",
  [EDinoDiet.Insectivores]: "Комахоїдні",
  [EDinoDiet.FilterFeeders]: "Фільтратори",
};

export enum EDinoPeriod {
  Triassic = "Triassic",
  Jurassic = "Jurassic",
  Cretaceous = "Cretaceous",
}

export const dinoPeriodLabels: Record<EDinoPeriod, string> = {
  [EDinoPeriod.Triassic]: "Тріасовий період",
  [EDinoPeriod.Jurassic]: "Юрський період",
  [EDinoPeriod.Cretaceous]: "Крейдовий період",
};

export enum EDinoType {
  Theropod = "Theropod",
  Sauropod = "Sauropod",
  Ceratopsian = "Ceratopsian",
  Stegosaur = "Stegosaur",
  Ankylosaur = "Ankylosaur",
  Pachycephalosaur = "Pachycephalosaur",
  Ornithopod = "Ornithopod",
  Pterosaur = "Pterosaur",
  Marine = "Marine",
  Prosauropod = "Prosauropod",
  Titanosaur = "Titanosaur",
  Therizinosaur = "Therizinosaur",
  Dromaeosaur = "Dromaeosaur",
  Spinosaur = "Spinosaur",
  Ornithomimosaur = "Ornithomimosaur",
  Oviraptorosaur = "Oviraptorosaur",
  Troodontid = "Troodontid",
  Alvarezsaur = "Alvarezsaur",
  Heterodontosaur = "Heterodontosaur",
  Hadrosaur = "Hadrosaur",
  Carcharodontosaurid = "Carcharodontosaurid",
  Noasaurid = "Noasaurid",
  Megaraptoran = "Megaraptoran",
  Marginocephalian = "Marginocephalian",
  Rugose = "Rugose",
  Sauropodomorph = "Sauropodomorph",
  Unknown = "Unknown",
}

export const dinoTypeLabels: Record<EDinoType, string> = {
  [EDinoType.Theropod]: "Теропод",
  [EDinoType.Sauropod]: "Завропод",
  [EDinoType.Ceratopsian]: "Цератопс",
  [EDinoType.Stegosaur]: "Стегозавр",
  [EDinoType.Ankylosaur]: "Анкілозавр",
  [EDinoType.Pachycephalosaur]: "Пахіцефалозавр",
  [EDinoType.Ornithopod]: "Орнітопод",
  [EDinoType.Pterosaur]: "Птерозавр",
  [EDinoType.Marine]: "Морський ящір",
  [EDinoType.Prosauropod]: "Прозавропод",
  [EDinoType.Marginocephalian]: "Маргіноцефал",
  [EDinoType.Hadrosaur]: "Гадрозавр",
  [EDinoType.Spinosaur]: "Спінозавр",
  [EDinoType.Dromaeosaur]: "Дромеозавр",
  [EDinoType.Titanosaur]: "Титанозавр",
  [EDinoType.Ornithomimosaur]: "Орнітомімозавр",
  [EDinoType.Therizinosaur]: "Теризинозавр",
  [EDinoType.Alvarezsaur]: "Альваресзавр",
  [EDinoType.Heterodontosaur]: "Гетеродонтозавр",
  [EDinoType.Noasaurid]: "Ноазаврид",
  [EDinoType.Carcharodontosaurid]: "Кархародонтозаврид",
  [EDinoType.Megaraptoran]: "Мегараптор",
  [EDinoType.Oviraptorosaur]: "Овірапторозавр",
  [EDinoType.Troodontid]: "Троодонтид",
  [EDinoType.Sauropodomorph]: "Сауроподоморф",
  [EDinoType.Rugose]: "Ругозавр",
  [EDinoType.Unknown]: "Невідомий",
};
