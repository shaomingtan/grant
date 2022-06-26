import chai from 'chai';
import {initialise, templateHouseHold} from './helper'

const config = initialise()
const expect = chai.expect

// Clear emulator firestore before testing
beforeEach(async () => {
  await config.clearDB()
});

describe("getHouseHolds", async () => {
  it("returns 0 households if no houseHolds are present in db", async () => {
    const result = await config.handlers.getHouseHolds()
    expect(result.houseHolds).to.have.members([])
  })

  it("returns 2 households if 2 houseHolds are present in db", async () => {
    const houseHold1 = templateHouseHold({})
    const houseHoldID1 = await config.repo.houseHoldRepo.addDocument(houseHold1)

    const houseHold2 = templateHouseHold({annualHouseholdIncome:7000})
    const houseHoldID2 = await config.repo.houseHoldRepo.addDocument(houseHold2)

    const result = await config.handlers.getHouseHolds()
    expect(result.houseHolds).to.have.deep.members([{...houseHold1, id: houseHoldID1},{...houseHold2, id: houseHoldID2}])
  })
})