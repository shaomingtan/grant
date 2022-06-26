const addMemberToHouseHold = (repo) => async ({houseHoldID,memberID}) => {
  const {houseHoldRepo,memberRepo} = repo

  console.log("houseHoldID", houseHoldID)
  console.log("memberID", memberID)
  // Get household
  const houseHold = await houseHoldRepo.getDocument(houseHoldID)
  if (!houseHold) {
    return {status:400, message:"household does not exist"}
  } else {
    if (houseHold.members.includes(memberID)){
      return {status:400, message:"member already part of household"}
    }
  }

  // Get member
  const member = await memberRepo.getDocument(memberID)
  if (!member) {
    return {status:400, message:"member does not exist"}
  } else {
    // Check if member already has a household. If so return error
    if (member.houseHoldID){
      return {status:400, message:"member already belngs to another household"}
    }
  }

  // Add member to household
  try {
    // TODO: Make add these 2 db writes as part of a transaction so it can be rolled back if one fails
    await memberRepo.updateDocument(member.id, {houseHoldID: houseHold.id})
    houseHold.members.push(member.id)
    await houseHoldRepo.updateDocument(houseHold.id, {members: houseHold.members})
    return {status:200, message:"Member added to household"}
  } catch (e) {
    console.log("updateHouseHoldID error", e)
    return {status:500, message:"Error adding member to household"}
  }
}

export default addMemberToHouseHold