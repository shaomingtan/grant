import chai from 'chai';
import {initialise, templateMember} from './helper'

const config = initialise()
const expect = chai.expect

// Clear emulator firestore before testing
beforeEach(async () => {
  await config.clearDB()
});

describe("addMember", async () => {
  it("adds a new member in db", async () => {
    const membersBefore = await config.repo.memberRepo.getDocuments()
    expect(membersBefore.length).to.eq(0)

    const member1 = templateMember({})
    await config.handlers.addMember(member1)
    const membersafter = await config.repo.memberRepo.getDocuments()
    expect(membersafter.length).to.eq(1)
  })
})