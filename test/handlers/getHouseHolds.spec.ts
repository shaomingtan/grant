import firebase = require("@firebase/testing");
import assert from 'assert';
import getRepo from '../../src/repo'
import getHandlers from '../../src/handlers'
import {templateHouseHold} from './helper'

const projectId = "grant-1cf9a";
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
const firebaseTestApp = firebase.initializeTestApp({ projectId })
const db = firebaseTestApp.firestore()
const repo = getRepo.init(db)
const handlers = getHandlers.init(repo)

// Clear emulator firestore before testing
beforeEach(async () => {
  await firebase.clearFirestoreData({projectId})
});

describe("getHouseHolds", async () => {
  it("returns 0 households if no houseHolds are present in db", async () => {
    const result = await handlers.getHouseHolds()
    assert.deepEqual(result, {houseHolds: []})
  })

  it("returns 2 households if 2 houseHolds are present in db", async () => {
    const houseHold1 = templateHouseHold({})
    const houseHoldID1 = await repo.houseHoldRepo.addDocument(houseHold1)
    console.log("houseHoldID1", houseHoldID1)

    const houseHold2 = templateHouseHold({annualHouseholdIncome:7000})
    const houseHoldID2 = await repo.houseHoldRepo.addDocument(houseHold2)
    console.log("houseHoldID2", houseHoldID2)

    const result = await handlers.getHouseHolds()
    assert.deepEqual(result, {houseHolds: [{...houseHold1, id: houseHoldID1},{...houseHold2, id: houseHoldID2}]})
  })
})