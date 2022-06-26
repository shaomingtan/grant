import chai from 'chai';
import {initialise, templateHouseHold, templateMember} from './helper'
import {calculateDOB, SUPPORTED_PARAMS} from '../../src/handlers/searchHandler'

const config = initialise()
const expect = chai.expect

// Clear emulator firestore before testing
beforeEach(async () => {
  await config.clearDB()
});

describe("search", async () => {
  describe("Student Encouragement Bonus scenario", async () => {
    // - Households with children of less than 16 years old.
    // - Household income of less than $150,000.
    it("returns households that meet requirement", async () => {
      // Create households that meet requirement
      const houseHold = templateHouseHold({})
      const houseHoldID = await config.repo.houseHoldRepo.addDocument(houseHold)

      // Create family and add to household that meets criteria
      const father = templateMember({houseHoldID: houseHoldID})
      const fatherID = await config.repo.memberRepo.addDocument(father)
      await config.handlers.addMemberToHouseHold({houseHoldID, memberID: fatherID})

      const mother = templateMember({houseHoldID: houseHoldID, spouseID: fatherID})
      const motherResult = await config.handlers.addMember(mother)
      await config.handlers.addMemberToHouseHold({houseHoldID, memberID: motherResult.memberID})

      const dateOfBirthOf15YearOld = calculateDOB(15)
      const child15YO = templateMember({houseHoldID: houseHoldID, fatherID, motherID: motherResult.memberID, dateOfBirth: dateOfBirthOf15YearOld})
      const childResult = await config.handlers.addMember(child15YO)
      await config.handlers.addMemberToHouseHold({houseHoldID, memberID: childResult.memberID})

      // Create household that does not meet requirement
      const houseHold2 = templateHouseHold({})
      const houseHoldID2 = await config.repo.houseHoldRepo.addDocument(houseHold2)

      // Create family and add to household that does not meet requirement
      const father2 = templateMember({houseHoldID: houseHoldID2})
      const fatherID2 = await config.repo.memberRepo.addDocument(father2)
      await config.handlers.addMemberToHouseHold({houseHoldID: houseHoldID2, memberID: fatherID2})

      const mother2 = templateMember({houseHoldID: houseHoldID2, spouseID: fatherID2})
      const motherResult2 = await config.handlers.addMember(mother2)
      await config.handlers.addMemberToHouseHold({houseHoldID: houseHoldID2, memberID: motherResult2.memberID})

      const dateOfBirthOf17YearOld = calculateDOB(17)
      const child17YO = templateMember({houseHoldID: houseHoldID2, fatherID2, motherID: motherResult2.memberID, dateOfBirth: dateOfBirthOf17YearOld})
      const childResult2 = await config.handlers.addMember(child17YO)
      await config.handlers.addMemberToHouseHold({houseHoldID: houseHoldID2, memberID: childResult2.memberID})

      // Test
      const result = await config.handlers.search({
        [SUPPORTED_PARAMS.AGE]: 16, 
        [SUPPORTED_PARAMS.AGE_SIGN]: 'less_than', 
        [SUPPORTED_PARAMS.ANNUAL_HOUSEHOLD_INCOME]: 150000,
        [SUPPORTED_PARAMS.ANNUAL_HOUSEHOLD_INCOME_SIGN]: 'less_than', 
      })

      // console.log('result', result)
      // expect(result).to.deep.eq({ status: 200, message: 'household does not exist' })
    })
  })
})