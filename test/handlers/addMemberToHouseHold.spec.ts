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
      const houseHold = templateHouseHold({})
      const houseHoldID = await config.repo.houseHoldRepo.addDocument(houseHold)

      const result = await config.handlers.addMemberToHouseHold({houseHoldID:houseHoldID,memberID:"123"})

      console.log('result', result)
      expect(result).to.deep.eq({ status: 400, message: 'member does not exist' })
    })
  })

  describe("when member already belongs to the household", async () => {
    it("returns an error indicating member already belongs to household", async () => {
      // Create household
      const houseHold = templateHouseHold({})
      const houseHoldID = await config.repo.houseHoldRepo.addDocument(houseHold)

      // Create member
      const member = templateMember({houseHoldID:houseHoldID})
      const memberID = await config.repo.memberRepo.addDocument(member)

      // Manually add member to household
      houseHold.members.push(memberID)
      await config.repo.houseHoldRepo.updateDocument(houseHoldID,{members:houseHold.members})

      const result = await config.handlers.addMemberToHouseHold({houseHoldID:houseHoldID,memberID:memberID})

      console.log('result', result)
      expect(result).to.deep.eq({ status: 400, message: 'member already part of household' })
    })
  })
  
  describe("when member already belongs to another household", async () => {
    it("returns an error indicating member does not belong to that household", async () => {
      const houseHold = templateHouseHold({})
      const houseHoldID = await config.repo.houseHoldRepo.addDocument(houseHold)

      const member = templateMember({houseHoldID:'123'})
      const memberID = await config.repo.memberRepo.addDocument(member)

      const result = await config.handlers.addMemberToHouseHold({houseHoldID:houseHoldID,memberID:memberID})

      console.log('result', result)
      expect(result).to.deep.eq({ status: 400, message: 'member already belngs to another household' })
    })
  })

  describe("when member does not belong to a household", async () => {
    it("returns an error indicating member does not belong to household", async () => {
      // Create household
      const annualHouseHoldIncome = 10000
      const houseHold = templateHouseHold({annualHouseHoldIncome})
      const houseHoldID = await config.repo.houseHoldRepo.addDocument(houseHold)

      // Create member
      const memberAnnualIncome = 8000
      const member = templateMember({annualIncome: memberAnnualIncome})
      const memberID = await config.repo.memberRepo.addDocument(member)

      const result = await config.handlers.addMemberToHouseHold({houseHoldID:houseHoldID,memberID:memberID})
      expect(result).to.deep.eq({ status: 200, message: 'Member added to household' })

      // Test that member was indeed updated in DB
      const updatedMember = await config.repo.memberRepo.getDocument(memberID)
      expect(updatedMember.houseHoldID).to.eq(houseHoldID)
      // Test that member.annualHouseHoldIncome is correct
      expect(updatedMember.annualHouseHoldIncome).to.eq(annualHouseHoldIncome+memberAnnualIncome)


      // Test that household.members was updated with member
      const updatedHouseHold = await config.repo.houseHoldRepo.getDocument(houseHoldID)
      expect(updatedHouseHold.members).to.includes(memberID)
      
      // Test that household.annualHouseHoldIncome is correct
      expect(updatedHouseHold.annualHouseHoldIncome).to.eq(annualHouseHoldIncome+memberAnnualIncome)
    })
  })
})