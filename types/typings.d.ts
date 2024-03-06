export interface IDataObject {
  gameResultPatti: number;
  gameNumber: number;
  index: number;
}

export interface TokenVerifyType {
  email: string;
  iat: number;
  exp: number;
}

export interface PersonInDB {
  email: string;
  password: string;
}

export interface TipsInterface {
  index: number;
  tip: string;
}

interface GameData {
  index: number;
  gameResultPatti: number;
  gameNumber: number;
  _id: string;
}

interface GameEntry {
  _id: string;
  date: string;
  data: GameData[];
  createdAt?: string;
  __v: number;
}
