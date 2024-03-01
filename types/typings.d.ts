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
