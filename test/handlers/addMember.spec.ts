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
    console.log('membersBefore', membersBefore)
    expect(membersBefore.length, 0)

    const member1 = templateMember({})
    console.log("member1", member1)
    await config.handlers.addMember(member1)
    const membersafter = await config.repo.memberRepo.getDocuments()
    console.log('membersafter', membersafter)
    expect(membersafter.length, 1)
  })
})