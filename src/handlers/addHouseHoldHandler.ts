const addHouseHold = (repo) => async (body) => {
  const {houseHoldRepo} = repo

  // TODO add validation to ensure that all fields are present
  // TODO annualHouseHoldIncome should not be configured by user but instead be calculatd.
  return houseHoldRepo.addDocument(body)
}

export default addHouseHold