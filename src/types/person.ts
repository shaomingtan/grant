import firestore from '@firebase/firestore';

export enum GenderTypes {
  MALE = 'male',
  FEMALE = 'female',
}

export enum MaritalStatusTypes {
  MARRIED = 'married',
  SINGLE = 'single',
}

export enum OccupationTypes {
  UNEMPLOYED= 'Unemployed',
  STUDENT= 'Student',
  EMPLOYED= 'Employed',
}

export interface Person {
  ID: string
  Name: string
  Gender: GenderTypes
  MaritalStatus: MaritalStatusTypes
  SpouseID: string
  OccupationType: OccupationTypes
  AnnualIncome: number
  DateOfBirth: firestore.Timestamp
  AnnualHouseHoldIncome: number
  MotherID: string
  FatherID: string
  HouseHoldID: string
  Children: Array<string>
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
  deletedAt: firestore.Timestamp
}
