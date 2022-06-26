import chai from 'chai';
import {initialise, templateHouseHold} from './helper'

const config = initialise()
const expect = chai.expect

// Clear emulator firestore before testing
beforeEach(async () => {
  await config.clearDB()
});

describe("addHouseHold", async () => {
  it("adds a new household in db", async () => {
    const houseHoldsBefore = await config.repo.houseHoldRepo.getDocuments()
    console.log('houseHoldsBefore', houseHoldsBefore)
    expect(houseHoldsBefore.length, 0)

    const houseHold1 = templateHouseHold({})
    console.log("houseHold1", houseHold1)
    await config.handlers.addHouseHold(houseHold1)
    const houseHoldsafter = await config.repo.houseHoldRepo.getDocuments()
    console.log('houseHoldsafter', houseHoldsafter)
    expect(houseHoldsafter.length, 1)
  })
})