import firebase = require("@firebase/testing");
import getRepo from '../../src/repo'
import getHandlers from '../../src/handlers'
import {HouseHoldType, HousingTypes} from '../../src/types/houseHoldType'

// Initialises the test db
export const initialise = () => {
  const projectId = "grant-1cf9a";
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  const firebaseTestApp = firebase.initializeTestApp({ projectId })
  const db = firebaseTestApp.firestore()
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