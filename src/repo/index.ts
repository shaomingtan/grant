import houseHoldRepo from './householdRepo';
import memberRepo from './memberRepo';

const init = (db) => {
  return {
    houseHoldRepo: houseHoldRepo(db),
    memberRepo: memberRepo(db)
  };
};

export default {init}