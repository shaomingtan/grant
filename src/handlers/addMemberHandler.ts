const addMember = (repo) => async (body) => {
  const {memberRepo} = repo

  //TODO add validation to ensure that all fields are present
  return memberRepo.addDocument(body)
}

export default addMember