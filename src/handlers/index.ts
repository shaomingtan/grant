import getHouseHolds from './getHouseHoldsHandler';
import getHouseHold from './getHouseHoldHandler';
import addHouseHold from './addHouseHoldHandler';
import addMember from './addMemberHandler';
import getMember from './getMemberHandler';
import addMemberToHouseHold from './addMemberToHouseHoldHandler';
import search from './searchHandler';

const init = (repo) => {
  return {
    getHouseHolds: getHouseHolds(repo),
    getHouseHold: getHouseHold(repo),
    addHouseHold: addHouseHold(repo),
    getMember: getMember(repo),
    addMember: addMember(repo),
    addMemberToHouseHold: addMemberToHouseHold(repo),
    search: search(repo),
  };
};

export default {init}