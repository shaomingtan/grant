const getHouseHold = (repo) => async () => {
  const {houseHoldRepo} = repo
  const houseHolds = houseHoldRepo.getDocuments()
  console.log("getHouseHold", houseHolds)
  return {someResult:[]};
}

export default getHouseHold