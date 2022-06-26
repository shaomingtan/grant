import chai from 'chai';
import {initialise, templateHouseHold, templateMember} from './helper'

const config = initialise()
const expect = chai.expect

// Clear emulator firestore before testing
beforeEach(async () => {
  await config.clearDB()
});

describe("addMemberToHouseHold", async () => {
  describe("when household does not exist", async () => {
    it("returns an error indicating household does not exist", async () => {
      const result = await config.handlers.addMemberToHouseHold({houseHoldID:'123',memberID:"123"})

      console.log('result', result)
      expect(result).to.deep.eq({ status: 400, message: 'household does not exist' })
    })
  })

  describe("when member does not exist", async () => {
    it("returns an error indicating member does not exist", async () => {
      const houseHold1 = templateHouseHold({})
      const houseHoldID1 = await config.repo.houseHoldRepo.addDocument(houseHold1)

      const result = await config.handlers.addMemberToHouseHold({houseHoldID:houseHoldID1,memberID:"123"})

      console.log('result', result)
      expect(result).to.deep.eq({ status: 400, message: 'member does not exist' })
    })
  })

  describe("when member already belongs to the household", async () => {
    it("returns an error indicating member already belongs to household", async () => {
      // Create household
      const houseHold1 = templateHouseHold({})
      const houseHoldID1 = await config.repo.houseHoldRepo.addDocument(houseHold1)

      // Create member
      const member1 = templateMember({houseHoldID:houseHoldID1})
      const memberID1 = await config.repo.memberRepo.addDocument(member1)

      // Manually add member to household
      houseHold1.members.push(memberID1)
      await config.repo.houseHoldRepo.updateDocument(houseHoldID1,{members:houseHold1.members})

      const result = await config.handlers.addMemberToHouseHold({houseHoldID:houseHoldID1,memberID:memberID1})

      console.log('result', result)
      expect(result).to.deep.eq({ status: 400, message: 'member already part of household' })
    })
  })
  
  describe("when member already belongs to another household", async () => {
    it("returns an error indicating member does not belong to that household", async () => {
      const houseHold1 = templateHouseHold({})
      const houseHoldID1 = await config.repo.houseHoldRepo.addDocument(houseHold1)

      const member1 = templateMember({houseHoldID:'123'})
      const memberID1 = await config.repo.memberRepo.addDocument(member1)

      const result = await config.handlers.addMemberToHouseHold({houseHoldID:houseHoldID1,memberID:memberID1})

      console.log('result', result)
      expect(result).to.deep.eq({ status: 400, message: 'member already belngs to another household' })
    })
  })

  describe("when member does not belong to a household", async () => {
    it("returns an error indicating member does not belong to household", async () => {
      const houseHold1 = templateHouseHold({})
      const houseHoldID1 = await config.repo.houseHoldRepo.addDocument(houseHold1)

      const member1 = templateMember({})
      const memberID1 = await config.repo.memberRepo.addDocument(member1)

      const result = await config.handlers.addMemberToHouseHold({houseHoldID:houseHoldID1,memberID:memberID1})
      expect(result).to.deep.eq({ status: 200, message: 'Member added to household' })

      // Test that member was indeed updated in DB
      const updatedMember = await config.repo.memberRepo.getDocument(memberID1)
      expect(updatedMember.houseHoldID).to.eq(houseHoldID1)

      // Test that household.members was updated with member
      const updatedHouseHold = await config.repo.houseHoldRepo.getDocument(houseHoldID1)
      expect(updatedHouseHold.members).to.includes(memberID1)
    })
  })
})