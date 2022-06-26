import getHouseHolds from './getHouseHoldsHandler';
import addHouseHold from './addHouseHoldHandler';

const init = (repo) => {
  return {
    getHouseHolds: getHouseHolds(repo),
    addHouseHold: addHouseHold(repo),
  };
};

export default {init}