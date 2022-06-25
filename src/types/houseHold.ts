import firestore from '@firebase/firestore';

export enum HousingTypes {
  LANDED= "Landed",
  CONDOMINIUM= "Condominium",
  HDB= "HDB",

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

export interface HouseHoldType {
  ID: string
  housingType: HousingTypes
  Members: Array<string>
  AnnualHouseholdIncome: number
  createdAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
  deletedAt: firestore.Timestamp
}
