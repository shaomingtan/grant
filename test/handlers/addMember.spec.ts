import chai from 'chai';
import {initialise, templateMember} from './helper'

const config = initialise()
const expect = chai.expect

// Clear emulator firestore before testing
beforeEach(async () => {
  await config.clearDB()
});

describe("addMember", async () => {
  describe("no relationship fields present", async () => {
    it("adds a new member in db", async () => {
      // Test members count before
      const membersBefore = await config.repo.memberRepo.getDocuments()
      expect(membersBefore.length).to.eq(0)
  
      // Create member
      const newMember = templateMember({})
      await config.handlers.addMember(newMember)

      // Test members count after
      const membersafter = await config.repo.memberRepo.getDocuments()
      expect(membersafter.length).to.eq(1)
    })
  })

  describe("spouseID field present", async () => {
    it("updates spouse.spouseID", async () => {
      // Create spouse
      const spouseMember = templateMember({})
      const spouseMemberID = await config.repo.memberRepo.addDocument(spouseMember)
  
      // Create newMember with spouseID
      const newMember = templateMember({spouseID: spouseMemberID})
      const newMemberResult = await config.handlers.addMember(newMember)

      // Get spouse
      const updatedSpouse = await config.repo.memberRepo.getDocument(spouseMemberID)
      expect(updatedSpouse.spouseID).to.eq(newMemberResult.memberID)
    })
  })

  describe("fatherID field present", async () => {
    it("updates father.children", async () => {
      // Create father
      const fatherMember = templateMember({})
      const fatherMemberID = await config.repo.memberRepo.addDocument(fatherMember)
  
      // Create newMember with fatherID
      const newMember = templateMember({fatherID: fatherMemberID})
      const newMemberResult = await config.handlers.addMember(newMember)

      // Get father
      const updatedSpouse = await config.repo.memberRepo.getDocument(fatherMemberID)
      expect(updatedSpouse.children).to.have.members([newMemberResult.memberID])
    })
  })

  describe("motherID field present", async () => {
    it("updates mother.children", async () => {
      // Create mother
      const motherMember = templateMember({})
      const motherMemberID = await config.repo.memberRepo.addDocument(motherMember)
  
      // Create newMember with motherID
      const newMember = templateMember({motherID: motherMemberID})
      const newMemberResult = await config.handlers.addMember(newMember)

      // Get mother
      const updatedSpouse = await config.repo.memberRepo.getDocument(motherMemberID)
      expect(updatedSpouse.children).to.have.members([newMemberResult.memberID])
    })
  })
})