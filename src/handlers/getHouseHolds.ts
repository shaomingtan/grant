const getHouseHolds = (repo) => async () => {
  const {houseHoldRepo} = repo
  const houseHolds = await houseHoldRepo.getDocuments()
  return {houseHolds};
}

export default getHouseHolds