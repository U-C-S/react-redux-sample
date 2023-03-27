export interface CardData {
  name: string;
  link: string;
  type: CardType;
  id: number;
}

export interface Bucket {
  name: string;
  cards: CardData[];
}

export enum CardType {
  video = "video",
  audio = "audio",
}
