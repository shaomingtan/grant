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
    expect(houseHoldsBefore.length).to.eq(0)

    const houseHold1 = templateHouseHold({})
    await config.handlers.addHouseHold(houseHold1)
    const houseHoldsafter = await config.repo.houseHoldRepo.getDocuments()
    expect(houseHoldsafter.length).to.eq(1)
  })
})