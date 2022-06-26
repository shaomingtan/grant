import getHouseHolds from './getHouseHoldsHandler';
import getHouseHold from './getHouseHoldHandler';
import addHouseHold from './addHouseHoldHandler';
import addMember from './addMemberHandler';

const init = (repo) => {
  return {
    getHouseHolds: getHouseHolds(repo),
    getHouseHold: getHouseHold(repo),
    addHouseHold: addHouseHold(repo),
    addMember: addMember(repo),
  };
};

export default {init}