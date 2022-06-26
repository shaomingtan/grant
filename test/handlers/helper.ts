import {HouseHoldType, HousingTypes} from '../../src/types/houseHoldType'

export const templateHouseHold = (
  options
):HouseHoldType => ({
  housingType: options.housingType || HousingTypes.HDB,
  members: options.members || [],
  annualHouseholdIncome: options.annualHouseholdIncome || 8000,
})