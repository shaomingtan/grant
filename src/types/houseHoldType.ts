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
  id?: string
  housingType: HousingTypes
  members: Array<string>
  annualHouseholdIncome: number
  createdAt?: firebase.firestore.Timestamp
  updatedAt?: firebase.firestore.Timestamp
  deletedAt?: firebase.firestore.Timestamp
}
