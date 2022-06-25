import {HouseHoldType} from "../types/houseHold"

const houseHoldRepo = (db) => async () => {
  const refHouseHold = (db) => db.collection('household');
  
  const getDocuments = async () => {
    const snapshot = await refHouseHold(db)
        .get()
        .catch((e: any) => console.log('getHouseHolds Error:', e));
    if (!snapshot || snapshot?.empty) {
      return []
    }
    return snapshot.docs.map((doc:any) => {
      return {...doc?.data(), id: doc.id}
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

  return {
    getDocuments,
    getDocument
  }
}

export default houseHoldRepo