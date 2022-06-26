import firebase from 'firebase-admin';

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

export interface MemberType {
  id?: string
  name: string
  gender: GenderTypes
  maritalStatus: MaritalStatusTypes
  spouseID?: string
  occupationType: OccupationTypes
  annualIncome: number
  dateOfBirth: firebase.firestore.Timestamp
  annualHouseHoldIncome: number
  motherID?: string
  fatherID?: string
  houseHoldID: string
  children: Array<string>
  createdAt?: firebase.firestore.Timestamp
  updatedAt?: firebase.firestore.Timestamp
  deletedAt?: firebase.firestore.Timestamp
}
