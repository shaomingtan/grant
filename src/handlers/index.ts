import getHouseHolds from './getHouseHoldsHandler';
import getHouseHold from './getHouseHoldHandler';
import addHouseHold from './addHouseHoldHandler';

const init = (repo) => {
  return {
    getHouseHolds: getHouseHolds(repo),
    getHouseHold: getHouseHold(repo),
    addHouseHold: addHouseHold(repo),
  };
};

export default {init}