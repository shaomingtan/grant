import houseHoldRepo from './householdRepo';

const init = (db) => {
  return {
    houseHoldRepo: houseHoldRepo(db)
  };
};

export default {init}