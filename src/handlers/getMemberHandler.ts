const getMember = (repo) => async (memberID) => {
  const {memberRepo} = repo
  const member = await memberRepo.getDocument(memberID)
  return {member};
}

export default getMember