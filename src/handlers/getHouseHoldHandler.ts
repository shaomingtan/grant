const getHouseHold = (repo) => async (houseHoldID) => {
  const {houseHoldRepo} = repo
  const houseHold = await houseHoldRepo.getDocument(houseHoldID)
  return {houseHold};
}

export default getHouseHold