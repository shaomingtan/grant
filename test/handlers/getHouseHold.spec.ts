import chai from 'chai';
import {initialise, templateHouseHold} from './helper'

const config = initialise()
const expect = chai.expect

// Clear emulator firestore before testing
beforeEach(async () => {
  await config.clearDB()
});

describe("getHouseHold", async () => {
  it("returns household if houseHoldID is present in db", async () => {
    const houseHold1 = templateHouseHold({})
    const houseHoldID1 = await config.repo.houseHoldRepo.addDocument(houseHold1)
    const result = await config.handlers.getHouseHold(houseHoldID1)
    expect(result.houseHold).to.deep.eq({...houseHold1, id: houseHoldID1})
  })

  it("returns null if houseHoldID is not present in db", async () => {
    const result = await config.handlers.getHouseHold('123')
    expect(result.houseHold).to.eq(null)
  })
})