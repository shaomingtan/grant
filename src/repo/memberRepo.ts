import {MemberType} from "../types/memberType"

const  memberRepo = (db) => {
  const refMember = (db) => db.collection('member');
  
  const getDocuments = async () => {
    const snapshot = await refMember(db)
        .get()
        .catch((e: any) => console.log('getMembers Error:', e));
    if (!snapshot || snapshot?.empty) {
      return []
    }
    return snapshot.docs.map((doc:any) => {
      return {...doc?.data(), id: doc.id} as MemberType
    })
  };

  const getDocument = async (id: string) => {
    const doc = await refMember(db)
        .doc(id)
        .get()
        .catch((e: any) => console.log('getMember Error:', e));
    return doc?.data() ?
            ({...doc?.data(), id: id} as MemberType) :
            null;
  };

  const addDocument = async (values: any) => {
    const docRef = await refMember(db)
        .add(values)
        .catch((e: any) => console.log('addMember Error:', e));
    return docRef.id
  };

  return {
    getDocuments,
    getDocument,
    addDocument
  }
}

export default memberRepo