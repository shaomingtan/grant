import firebase = require("@firebase/testing");
import getRepo from '../../src/repo'
import getHandlers from '../../src/handlers'
import {HouseHoldType, HousingTypes} from '../../src/types/houseHoldType'
import {MemberType, GenderTypes, MaritalStatusTypes, OccupationTypes} from '../../src/types/memberType'

const projectId = "grant-1cf9a";
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
const firebaseTestApp = firebase.initializeTestApp({ projectId })
const db = firebaseTestApp.firestore()

// Initialises the test db
export const initialise = () => {
  const repo = getRepo.init(db)
  const handlers = getHandlers.init(repo)
  const clearDB = async () => firebase.clearFirestoreData({projectId})
  return {repo, handlers, clearDB}
}

export const templateHouseHold = (
  options
):HouseHoldType => ({
  housingType: options.housingType || HousingTypes.HDB,
  members: options.members || [],
  annualHouseholdIncome: options.annualHouseholdIncome || 8000,
})

export const templateMember = (
  options
):MemberType => ({
  name: options.name || "Tan Ah Huat",
  gender: options.gender || GenderTypes.FEMALE,
  maritalStatus: options.maritalStatus || MaritalStatusTypes.SINGLE,
  spouseID: options.spouseID || null,
  occupationType: options.occupationType || OccupationTypes.EMPLOYED,
  annualIncome: options.annualIncome || 4000,
  dateOfBirth: options.dateOfBirth || firebase.firestore.Timestamp.fromDate(new Date(1988, 0,1)),
  annualHouseHoldIncome: options.annualHouseHoldIncome || 8000,
  motherID: options.motherID || null,
  fatherID: options.fatherID || null,
  houseHoldID: options.houseHoldID || null,
  children: options.children || [],
})