import {HouseHoldType} from "../types/houseHoldType"

const houseHoldRepo = (db) => {
  const refHouseHold = (db) => db.collection('household');
  
  const getDocuments = async () => {
    const snapshot = await refHouseHold(db)
        .get()
        .catch((e: any) => console.log('getHouseHolds Error:', e));
    if (!snapshot || snapshot?.empty) {
      return []
    }
    return snapshot.docs.map((doc:any) => {
      return {...doc?.data(), id: doc.id} as HouseHoldType
    })
  };

  const getDocument = async (id: string) => {
    const doc = await refHouseHold(db)
        .doc(id)
        .get()
        .catch((e: any) => console.log('getHouseHold Error:', e));
    return doc?.data() ?
            ({...doc?.data(), id: id} as HouseHoldType) :
            null;
  };

  const addDocument = async (values: any) => {
    const docRef = await refHouseHold(db)
        .add(values)
        .catch((e: any) => console.log('addHouseHold Error:', e));
    return docRef.id
  };

  const updateDocument = async (id: string, values: any) => {
    return refHouseHold(db)
        .doc(id)
        .update(values)
        .catch((e: any) => console.log('updateHouseHold Error:', e));
  };

  return {
    getDocuments,
    getDocument,
    addDocument,
    updateDocument
  }
}

export default houseHoldRepo