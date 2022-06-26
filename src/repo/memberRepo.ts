import e from "express";
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

  const updateDocument = async (id: string, values: any) => {
    return refMember(db)
        .doc(id)
        .update(values)
        .catch((e: any) => console.log('updateMember Error:', e));
  };

  const getDocumentsBy = async (searchPlan) => {
    let query 
    for(let i=0; i<searchPlan.length;i++){
      const queryItem = searchPlan[i]
      if (i==0){
        query = refMember(db).where(queryItem[0],queryItem[1],queryItem[2])
      } else {
        query.where(queryItem[0],queryItem[1],queryItem[2])
      }
    }
    const snapshot = await query.get()
        .catch((e: any) => console.log('getMembersByCriteria Error:', e));
    if (!snapshot || snapshot?.empty) {
      return []
    }
    return snapshot.docs.map((doc:any) => {
      return {...doc?.data(), id: doc.id} as MemberType
    })
  }

  return {
    getDocuments,
    getDocument,
    addDocument,
    updateDocument,
    getDocumentsBy
  }
}

export default memberRepo