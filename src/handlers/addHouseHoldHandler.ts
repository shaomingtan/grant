const addHouseHold = (repo) => async (body) => {
  const {houseHoldRepo} = repo

  //TODO add validation to ensure that all fields are present
  return houseHoldRepo.addDocument(body)
}

export default addHouseHold