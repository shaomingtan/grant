const addMember = (repo) => async (body) => {
  const {memberRepo} = repo
  
  // TODO add validation to ensure that all fields are present
  // TODO Prevent computed fields like annualHouseHoldIncome from being set by user
  // TODO Prevent houseHoldID from being set since that's handled by another endpoint
  const newMemberID = await memberRepo.addDocument(body)

  // Update spouse member
  if (body.spouseID) {
    const spouse = await memberRepo.getDocument(body.spouseID)
    if (!spouse){
      return {status:400, message:"spouse does not exist"}
    } else {
      if (spouse.spouseID) {
        return {status:400, message:"spouse already has another spouse"}
      } else {
        // TODO: Handle updating of marital status as well
        await memberRepo.updateDocument(body.spouseID, {spouseID: newMemberID})
      }
    }
  }

  // update father's children
  if (body.fatherID) {
    const father = await memberRepo.getDocument(body.fatherID)
    if (!father){
      return {status:400, message:"father does not exist"}
    } else {
      if (!father.children.includes(newMemberID)) {
        father.children.push(newMemberID)
        await memberRepo.updateDocument(body.fatherID, {children: father.children})
      }
    }
  }

  // update mother's children
  if (body.motherID) {
    const mother = await memberRepo.getDocument(body.motherID)
    if (!mother){
      return {status:400, message:"mother does not exist"}
    } else {
      if (!mother.children.includes(newMemberID)) {
        mother.children.push(newMemberID)
        await memberRepo.updateDocument(body.motherID, {children: mother.children})
      }
    }
  }

  return {status:200, message:"Member added", memberID: newMemberID}
}

export default addMember