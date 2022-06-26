import firebase from 'firebase-admin';

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
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
  deletedAt: firebase.firestore.Timestamp
}
