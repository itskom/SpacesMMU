export interface StudySpace {
  id: string;
  name: string;
  image: string;
  rating: number;
  nearestStation: string;
  distance: number;
  coordinates: [number, number];
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
}

export interface OpeningHours {
  open: string;
  close: string;
}
